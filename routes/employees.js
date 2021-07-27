const router = require('express').Router();
const Employee = require('../models/employees');

router.get('/employees', async (req, res, next) => {
    const per_page = parseInt(req.query.per_page) || 10
    const page_no = parseInt(req.query.page_no) || 1
    const pagination = {
        limit: per_page ,
        skip:per_page * (page_no - 1)
    }
    
    try {
        const employees = await Employee.find({userId: req.userId}).limit(pagination.limit).skip(pagination.skip).exec()
        res.send(employees);

    } catch(error) {
        console.log({ error })
    }
});

router.get('/employees/:id', (req, res, next) => {
    Employee.find({_id: req.params.id}).then(function(employees){
        res.send(employees);
    }).catch(next);
});

router.post('/employees', async (req, res, next) => {

    const isEmailExist = await Employee.findOne({ email: req.body.email });
    if (isEmailExist) return res.status(400).json({ error: "Employee already exists." });

    const employee = new Employee({
        userId: req.userId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        department: req.body.department,
        title: req.body.title,
        salary: req.body.salary,
        status: req.body.status,
      });
    
      try {
        const savedEmployee = await employee.save();
        res.status(201).json({ error: null, data: savedEmployee  });
      } catch (error) {
        console.log({ error })
        res.status(400).json({ error });
      }
});

router.put('/employees/:id', (req, res, next) => {

    var filter = {_id: req.params.id}
    let update = req.body

    Employee.findOneAndUpdate(filter, update, { new: true, upsert: true })
        .then(function(Employee){Employee.findOne({_id: req.params.id})
        .then(function(employee){res.status(200).send(employee);})
        .catch((err) => console.log({ err }))
    });
});

router.delete('/employees/:id', (req, res) => {
    if (req.role === 'user') {
        res.status(400).send({ error: "You don't have the required privileges." })
        return false
    }
    Employee.findOneAndDelete({_id: req.params.id}).then(function(employee){
        res.send(employee);
    });
});

module.exports = router;