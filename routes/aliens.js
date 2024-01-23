const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')
const Doctor = require('../models/alien'); // Replace './path-to-doctor-model' with the actual path to your Doctor model file

// Rest of the code



router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.post('/', async (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        specialization: req.body.specialization,
        experience: req.body.experience,
        location: req.body.location,
        date: req.body.date,
        slots: req.body.slots,
        fee: req.body.fee
    });

    try {
        const savedDoctor = await doctor.save();
        res.json(savedDoctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Update only the specified fields
        if (req.body.sub) {
            doctor.sub = req.body.sub;
        }
        if (req.body.name) {
            doctor.name = req.body.name;
        }
        if (req.body.imageUrl) {
            doctor.imageUrl = req.body.imageUrl;
        }
        if (req.body.specialization) {
            doctor.specialization = req.body.specialization;
        }
        if (req.body.experience) {
            doctor.experience = req.body.experience;
        }
        if (req.body.location) {
            doctor.location = req.body.location;
        }
        if (req.body.date) {
            doctor.date = req.body.date;
        }
        if (req.body.slots) {
            doctor.slots = req.body.slots;
        }
        if (req.body.fee) {
            doctor.fee = req.body.fee;
        }

        const updatedDoctor = await doctor.save();
        res.json(updatedDoctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = {router}