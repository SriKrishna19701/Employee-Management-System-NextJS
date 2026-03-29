const express = require('express');
const router = express.Router();
const Employee = require('../schema/employeeSchema');

// Create a new employee
router.post('/add', async (req, res) => {
    try {
        const { name, position, department } = req.body;
        const employee = new Employee({ name, position, department });
        await employee.save();
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all employees
router.get('/all', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get employees with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const totalEmployees = await Employee.countDocuments();
        const employees = await Employee.find().skip(skip).limit(limit);
        const totalPages = Math.max(1, Math.ceil(totalEmployees / limit));

        res.status(200).json({ data: employees, totalPages });
    } catch (err) {
        console.error('Error fetching paginated employees:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        console.error('Error fetching employee:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update employee by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, position, department } = req.body;
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, position, department },
            { new: true }
        );
        if (employee) {
            res.status(200).json({ message: 'Employee updated successfully', employee });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete employee by ID
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (employee) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;    
