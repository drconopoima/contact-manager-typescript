/** firefunctions/functions/index.ts **/

import * as cors from 'cors'
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp(functions.config().firebase)
const contactsRef: admin.database.Reference = admin.database().ref('/contacts')

const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const isValidEmail = (email: any): boolean => {
    return ((typeof email === 'string') ? regexpEmail.test(email) : false)
}

/**
 * @function {addContact}
 * @return {Object}
 * @parameter {express.Request{ body { firstname, lastname, email, phone } }}, {express.Response}
 **/
exports.addContact = functions.https.onRequest((request: any, response: any) => {

    cors()(request, response, () => {
        contactsRef.push({
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone: request.body.phone,
            email: isValidEmail(request.body.email) ? request.body.email : undefined
        })
    })
    response.send({
        'msg': 'Done',
        'data': {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone: request.body.phone,
            email: isValidEmail(request.body.email) ? request.body.email : undefined
        }
    })
})

/**
 * @function {getContactList}
 * @return {Object}
 * @parameter {express.Request}, {express.Response}
 **/
exports.getContactList = functions.https.onRequest((_request: any, response: any) => {
    void contactsRef.once('value', (data) => {
        response.send({
            'res': data.val()
        })
    })
})

const app: express.Application = express();
app.use(cors({
    origin: true
}))

app.put('/:id', (request: any, response: any, next: any) => {
    void admin.database().ref('/contacts/' + request.params.id).update({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        phone: request.body.phone,
        email: isValidEmail(request.body.email) ? request.body.email : undefined
    })
    response.send(request.body)
    next()
})

app.delete('/:id', (request: any, response: any, next: any) => {
    void admin.database().ref('/contacts/' + request.params.id).remove()
    response.send(request.params.id)
    next()
})

app.get('/:id', (request: any, response: any, next: any) => {
    void admin.database().ref('/contacts/' + request.params.id).once('value',
        (data) => {
            const sn = data.val()
            response.send({
                'res': sn
            })
            next()
        }, (err: unknown) => response.send({
            res: err
        })
    )
})

/**
 * @function {getContact}
 * @return {Object}
 * @parameter {express.Request}, {express.Response}
 **/
exports.getContact = functions.https.onRequest((request: any, response: any) => {
    return app(request, response)
})

/**
 * @function {updateContact}
 * @return {Object}
 * @parameter {express.Request}, {express.Response}
 **/
exports.updateContact = functions.https.onRequest((request: any, response: any) => {
    return app(request, response)
})

/**
 * @function {deleteContact}
 * @return {Object}
 * @parameter {express.Request}, {express.Response}
 **/
exports.deleteContact = functions.https.onRequest((request, response) => {
    return app(request, response)
})