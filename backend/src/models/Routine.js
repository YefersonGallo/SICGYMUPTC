const { Schema, model } = require('mongoose');
const cors = require('cors');

const RoutineSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    urlImage: {type: String}
}, {
    timestamps: true
});

RoutineSchema.methods.setImgUrl = function setImgUrl(fileName) {
    this.urlImage = 'http://localhost:' + process.env.PORT + '/pubilc' + fileName
    
}

module.exports = model('Routine', RoutineSchema);