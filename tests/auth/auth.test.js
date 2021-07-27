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
            if (err) {
                done(err)
            }
            else {
                done()
            }
        })
    })
    
})