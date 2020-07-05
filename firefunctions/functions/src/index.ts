/** firefunctions/functions/index.ts **/

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express'

admin.initializeApp(functions.config().firebase)
// var contactsRef: admin.database.Reference = admin.database().ref('/contacts')

exports.helloWorld = functions.https.onRequest((request: express.Request, response: express.Response
    ) => {
        response.send("Hello from Firebase!");
    });

/* 
exports.addContact = functions.https.onRequest(...)
exports.deleteContact = functions.https.onRequest(...)
exports.updateContact = functions.https.onRequest(...)
exports.getContact = functions.https.onRequest(...)
exports.getContactList = functions.https.onRequest(...)
*/