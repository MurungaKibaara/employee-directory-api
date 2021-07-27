const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const Employee = require('../../models/employees');
const User = require('../../models/users');

let employee;
let id;
let token;

describe("Employees", () => {

    before((done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            name: "tester", 
            role: "admin",
            email: "t@t.com",  
            password: "test"
        })
        .end((err, res) => {
            token = res.body.data.accessToken

            if (err) {
                done(err)
            }
            else {
                done()
            }
          })
    });


    after((done) => {
        User.collection.deleteMany({}, (err, response) => {
            if (err) {
                done(err)
            } else {
                done();
            }
        });
    })

    after((done) => {
        Employee.collection.deleteMany({}, (err, response) => {
            if (err) {
                done(err)
            } else {
                done();
            }
        });
    })


    it("Should not add a new employee without access token", (done) => {
        request('http://localhost:4000')
        .post('/api/employees')
        .send({
            "firstname": "Murunga",
            "lastname": "Kibaara",
            "email": "murungakibaara@gmail.com",
            "department": "engineering",
            "title": "VP",
            "salary": 50000,
            "status": "active"
        })
        .end((err, res) => {
            expect(res.status).to.eq(400);
            if (err) { done(err) }
            else { done() }
          })
    })

    it("Should add a new employee with access token", (done) => {
        request('http://localhost:4000')
        .post('/api/employees')
        .set({ Authorization: `Bearer ${token}` })
        .send({
            "firstname": "Murunga",
            "lastname": "Kibaara",
            "email": "murungakibaara@gmail.com",
            "department": "engineering",
            "title": "VP",
            "salary": 50000,
            "status": "active"
        })
        .end((err, res) => {
            expect(res.status).to.eq(201);
            if (err) { done(err) }
            else { done() }
          })
    })


    it("Should get all employees with access token", (done) => {
        request('http://localhost:4000')
        .get('/api/employees')
        .set({ Authorization: `Bearer ${token}` })
        .send({})
        .end((err, res) => {

            for (var i = 0; i < res.body.length; i++) {
                id = res.body[i]._id;
            }

            expect(res.status).to.eq(200);
            if (err) { done(err) }
            else { done() }
          })
    })

    it("Should not get employees without access token", (done) => {
        request('http://localhost:4000')
        .get('/api/employees')
        .send({})
        .end((err, res) => {
            expect(res.status).to.eq(400);
            if (err) { done(err) }
            else { done() }
          })
    })


    it("Should not edit an employee without a token", (done) => {
        request('http://localhost:4000')
        .put(`/api/employees/${id}`)
        .send({
            "firstname": "Murunga",
            "lastname": "Kibaara",
            "email": "murungakibaara@gmail.com",
            "department": "engineering",
            "title": "VP",
            "salary": 70000,
            "status": "active"
        })
        .end((err, res) => {
            expect(res.status).to.eq(400);
            if (err) { done(err) }
            else { done() }
          })
    })

    it("Should edit an employee with a token", (done) => {
        request('http://localhost:4000')
        .put(`/api/employees/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
            "firstname": "Murunga",
            "lastname": "Kibaara",
            "email": "murungakibaara@gmail.com",
            "department": "engineering",
            "title": "VP",
            "salary": 70000,
            "status": "active"
        })
        .end((err, res) => {
            expect(res.status).to.eq(200);
            if (err) { done(err) }
            else { done() }
          })
    })

    it("Should not delete an employee with a token", (done) => {
        request('http://localhost:4000')
        .delete(`/api/employees/${id}`)
        .send({
            "firstname": "Murunga",
            "lastname": "Kibaara",
            "email": "murungakibaara@gmail.com",
            "department": "engineering",
            "title": "VP",
            "salary": 70000,
            "status": "active"
        })
        .end((err, res) => {
            expect(res.status).to.eq(400);
            if (err) { done(err) }
            else { done() }
          })
    })

    it("Should delete an employee with a token", (done) => {
        request('http://localhost:4000')
        .delete(`/api/employees/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
            "firstname": "Murunga",
            "lastname": "Kibaara",
            "email": "murungakibaara@gmail.com",
            "department": "engineering",
            "title": "VP",
            "salary": 70000,
            "status": "active"
        })
        .end((err, res) => {
            expect(res.status).to.eq(200);
            if (err) { done(err) }
            else { done() }
          })
    })
})
