const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup'
    },

    userQues: {
        type: String, 
    }
});


module.exports = mongoose.model('ques', QuesSchema);
