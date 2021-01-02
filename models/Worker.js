const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkerSchema = new Schema({
    lastname: {type: String, required: true},
    firstname: {type: String, required: true},
    major: {type: String, required: true},
    department: {type: String, required: true},
    authentication: {type: Number, required: true},
    username : {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = Worker = mongoose.model('workers', WorkerSchema);