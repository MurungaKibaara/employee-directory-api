const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const User = require('../../models/users');
const app = require('../../index');

const port = parseInt(process.env.PORT)
let user;

describe("Server", () => {
    it("Server is running on expected port", () => {
        expect(app.port).to.equal(port)
    })
})

describe("User", ()=> {
    after((done) => {
        User.collection.deleteMany({}, (err, response) => {
            if (err) {
                done(err)
            } else {
                done();
            }
        });
    })


    it("should register a new user", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            name: "tester", 
            role: "user",
            email: "t@t.com",  
            password: "test"
        })
        .end((err, res) => {
            expect(res.status).to.eq(201);
            expect(res.body.data).to.have.property("accessToken")

            if (err) {
                done(err)
            }
            else {
                done()
            }
          })
    })

    it("should not register an existing user", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            name: "tester", 
            role: "user",
            email: "t@t.com",  
            password: "test"
        })
        .end((err, res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("error")
            if (err) { done(err) }
            else { done()}
          })
    })

    it("should not register a user without a password", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            name: "tester", 
            role: "user",
            email: "t@t.com",  
            password: ""
        })
        .end((err, res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("error")
            if (err) { done(err) }
            else { done()}
          })
    })


    it("should signin an existing user", (done)=> {
        request('http://localhost:4000')
        .post('/api/auth/signin')
        .send({
            email: "t@t.com",  
            password: "test"
        })
        .end((err, res) => {
            expect(res.status).to.eq(200);
            expect(res.body.data).to.have.property("accessToken")
            if (err) {
                done(err)
            }
            else {
                done()
            }
        })
    })

    it("should not sign in with an email that does not exist", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signin')
        .send({
            email: "t@trr.com",  
            password: "wrong password"
        })
        .end((err, res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("error")
            if (err) {
                done(err)
            }
            else {
                done()
            }
        })
    })

    it("should not sign in with the wrong password", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signin')
        .send({
            email: "t@t.com",  
            password: "wrong password"
        })
        .end((err, res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("error")
            if (err) {
                done(err)
            }
            else {
                done()
            }
        })
    })
})