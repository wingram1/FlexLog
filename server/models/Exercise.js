const { Schema } = require('mongoose');
const settingsSchema = require('./Settings');
const exerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String
        },
        settings: [settingsSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);


module.exports = exerciseSchema;