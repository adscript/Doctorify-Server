const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: String,
    age: Number,
})

module.exports = mongoose.model('Doctor',doctorSchema);