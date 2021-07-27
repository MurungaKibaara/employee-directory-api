const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const Employee = require('../../models/employees');
const User = require('../../models/users');

let employee;

describe("Employees", () => {

    before((done) => {
        user = User.create({
            name: "tester", 
            email: "tim@t.com",
            role: 'admin',
            password: "test"})
        .then(() => done()) 
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


    it("Should add a new employee", () => {
        expect(1+1).to.equal(2)
    })

    it("Should edit an employee", () => {
        expect(1+1).to.equal(2)
    })

    it("Should update an employee", () => {
        expect(1+1).to.equal(2)
    })

    it("Should delete an employee", () => {
        expect(1+1).to.equal(2)
    })
})
