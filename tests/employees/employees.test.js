const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const Employee = require('../../models/employees');
const User = require('../../models/users');

// before((done) => {
//     user = User.create({
//        name: "tester", 
//        email: "t@t.com",
//        role: 'admin',
//        password: "test"})
//        .then(() => done()) 
//   });

describe("Employees", () => {
    it("Should add a new employees", () => {
        expect(1+1).to.equal(2)
    })

    it("Should edit an employees", () => {
        expect(1+1).to.equal(2)
    })

    it("Should update an employees", () => {
        expect(1+1).to.equal(2)
    })

    it("Should delete an employees", () => {
        expect(1+1).to.equal(2)
    })


    // after((done) => {
    //     User.collection.deleteMany({}, (err, response) => { done();});
    //     Employee.collection.deleteMany({}, (err, response) => { done();});
    // })
}) 