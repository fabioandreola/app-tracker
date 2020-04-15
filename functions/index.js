const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

function getDates(startDate, endDate, template){
    let dayStep = 1;
    switch(template){
        case 'Daily': 
            dayStep = 1;
            break;
        case 'Every other day':
            dayStep = 2;
            break;
        case 'Once a week':
            dayStep = 7;
            break;
        case 'Once a month':
            dayStep = 30;
            break;
        default:
            dayStep = 1;
    }

    const dates = [];
    let lastProcessedDate = new Date(startDate);
    dates.push(startDate);

    while(lastProcessedDate < endDate){
        lastProcessedDate.setDate(lastProcessedDate.getDate() + dayStep);

        if(lastProcessedDate <= endDate){
            dates.push(new Date(lastProcessedDate));
        }
    }

    return dates;
}

function authenticatedUsersOnly(context){
    if (!context.auth) {
        throw new functions.https.HttpsError(
          'unauthenticated', 
          'only authenticated users can add requests'
        );
    }
}

exports.deleteTask = functions.https.onCall(async (data, context) => {
    authenticatedUsersOnly(context);

    const task =  admin.firestore().collection('users').doc(context.auth.uid).collection('tasks').doc(data.task_id);
    const taskDetail =  admin.firestore().collection('users').doc(context.auth.uid).collection('taskDetails').where("task_id", "==", data.task_id);

    const deleted = await taskDetail.get().then(snapshot => {
        return snapshot.forEach(doc => {
            doc.ref.delete();
        });
    });

    return task.delete();
});

exports.completeTask = functions.https.onCall(async (data, context) => {
    authenticatedUsersOnly(context);

    const task =  admin.firestore().collection('users').doc(context.auth.uid).collection('tasks').doc(data.task_id);
    const taskDetail =  admin.firestore().collection('users').doc(context.auth.uid).collection('taskDetails').doc(data.taskDetail_id);

    await taskDetail.update({
        doneDayQty: admin.firestore.FieldValue.increment(1)
    });

    return task.update({
        tasksCompleted: admin.firestore.FieldValue.increment(1)
    });
});


exports.addTask = functions.https.onCall(async (data, context) => {
    authenticatedUsersOnly(context);
    if (data.name.length > 30) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'name must be no more than 30 characters long'
      );
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate < startDate) {
        throw new functions.https.HttpsError(
          'invalid-argument', 
          'end date must be equal or greater than start date'
        );
    }

    let dates = getDates(startDate, endDate, data.template);
    let totalTasks = dates.length;
    if(data.template === "Daily"){
        totalTasks = data.timesPerDay * dates.length
    }

    const docRef = await admin.firestore().collection('users').doc(context.auth.uid).collection('tasks').add({
        name: data.name,
        icon: {
            color: data.icon.color,
            name: data.icon.name
        },
        startDate: data.startDate,
        endDate: data.endDate,
        tasksCompleted: 0,
        template: data.template,
        timesPerDay: data.timesPerDay,
        totalTasks: totalTasks
    });
    let promise = null;
    dates.forEach((date) => {
        promise = admin.firestore().collection('users').doc(context.auth.uid).collection('taskDetails').add({
            day: date.toISOString().slice(0, 10),
            doneDayQty: 0,
            task_id: docRef.id
        });
    });
});
