/** questions.ts **/
export let questions: Array < Object > = [{
        type: 'input',
        name: 'firstname',
        message: 'First name:'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Last name:'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Phone number:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email Address:'
    }
]
export let getIdQuestions: Array < Object > = [{
    type: 'input',
    name: 'id',
    message: 'Enter the contact id'
}]
export let updateContactQuestions: Array < Object > = [{
        type: 'input',
        name: 'id',
        message: 'Enter the contact id'
    },
    ...questions
]
