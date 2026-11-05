const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Ques = require('../models/Ques');



//* Route 1 ==> Add a new question using POST '/ques/fetchallques'
router.get('/fetchallques', fetchuser, async (req, res) => {

    try {
        // Finding notes of user from is User Id
        const quess = await Ques.find({ user: req.user.id });
        res.json(quess);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
});

//* Route 1 ==> Add a new question using POST '/ques/addques'
router.post('/addques', fetchuser, [
    body('question', 'Enter a valid Title').isEmpty(),
], async (req, res) => {

    try {
        // Destructuring the getting array from the api
        const { userQues } = req.body;

        // If there are errors return bad requests and error messages
        const errors = validationResult(req);

        // Error if there is empty Question gave by the user 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Creating Question for particular user ID
        const ques = new Ques({
            userQues, user: req.user.id
        });

        // Saving Question in Database
        const saveQues = await ques.save();
        res.json(saveQues);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router
