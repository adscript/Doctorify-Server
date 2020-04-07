const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: String,
    symptoms: String,
    doctorId: String,
})

module.exports = mongoose.model('Patient',patientSchema);