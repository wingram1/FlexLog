const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    createdWorkouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ],
    savedWorkouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ]
});
// pre-save middleware for password creation
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare passwords
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.passwors);
};

const User = model('User', userSchema);

module.exports = User;