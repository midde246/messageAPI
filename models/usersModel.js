var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

//Create Schema and model for user.....

var useSchema = new Schema({
        name: {
            type:String,
            required: true
        },
        email: {
            type:String,
            required: true  
        },
        contact: {
            type:Number,
            required: true
        },
        password: {
            type:String,
            required: true
        }
});

var usersModel = mongoose.model('Employees', userSchema)
module.exports = usersModel;