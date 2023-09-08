const admin = require("firebase-admin");
const config = require("../config/config");
const db = async () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(config),
            databaseURL: `https://${process.env.FIREBASE_DATABASE_URL}.firebaseio.com/`
        });
        console.log("database connected");
    } catch (err) {
        console.error(err);
    }
}

module.exports = db




