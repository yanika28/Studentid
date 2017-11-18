const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let students = [
    { id: 1, name: 'Yanika', u: 'buu', year: 2001,faculty: 'Informatics',email: '58160381@go.buu.ac.th'},
    {id: 2, name: 'Gus', u: 'tu', year: 1999,faculty: 'Huso',email: '58160000@go.buu.ac.th'}
]


app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

app.get('/greeting', (req, res) => {
    let lang = {
        en: 'hello',
        th: 'สวัสดี'
    }

    let l = req.query.lang
    if (!l) {
        res.json({ message: 'Hello' })
    } else {
        res.json({ message: lang[l] })
    }

})

app.get('/students', (req, res) => {
    res.status(200).json(students)
})

app.get('/students/:id', (req, res) => {
    let id = req.params.id

    if (!id|| isNaN(id)) {
        res.status(400).json({ errorMessage: 'This api required id parameter' })
        return
    }
    res.json(students[req.params.id - 1])
})

//app.get('/students/:id', (req, res) => {
    //res.json(students[req.params.id - 1])
//})

app.post('/students', (req, res)=> {
    let student = req.body
    student.id = students.length + 1
    students.push(student)
    res.status(201).json(student)
})



module.exports = app