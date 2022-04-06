const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.updateLeaderboard = functions.firestore
  .document('userData/{userId}')
  .onUpdate((change, context) => {
    const db = admin.firestore();
    const uid = context.params.userId;
    const dateString = new Date()
      .toLocaleString('en-US', { timeZone: 'America/New_York' })
      .split(',')[0]
      .replace(/\//g, '-');
    const data = change.after.data();
    const newWaterCount = data.waterDrunkToday;

    admin
      .auth()
      .getUser(uid)
      .then((userRecord) => {
        const docRef = db.collection('leaderboard').doc(dateString);
        docRef
          .get()
          .then((docSnap) => {
            if (docSnap.exists) {
              let { users } = docSnap.data();
              let user = users.find((user) => user.id === uid);
              const userIndex = users.indexOf(user);
              if (user == null) {
                user = {
                  id: uid,
                  name: userRecord.displayName,
                  waterDrunk: newWaterCount,
                  imgURL: userRecord.photoURL
                };
                users[users.length] = user;
              } else {
                user.waterDrunk = newWaterCount;
                users[userIndex] = user;
              }
              users = users.sort((a, b) => b.waterDrunk - a.waterDrunk);
              docRef.set({ users });
            } else {
              docRef.set({
                users: [
                  {
                    id: uid,
                    name: userRecord.displayName,
                    waterDrunk: newWaterCount,
                    imgURL: userRecord.photoURL
                  }
                ]
              });
            }
          })
          .catch((error) => {
            functions.logger.error('Error fetching user data:', error);
          });
      });
    return null;
  });
