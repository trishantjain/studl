const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
// const { body, validationResult } = require('express-validator')
const Contact = require('../models/Contact')

router.post('/addquery', async (req, res) => {
    try {
        let success = false

        queryMsg = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })

        success = true
        res.json({ success})

    } catch (error) {
        res.status(500).send("Add query catch block");
    }
})

module.exports = router