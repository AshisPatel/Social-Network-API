const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const ReactionSchema = new Schema({

});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        maxLength: 280,
        minLength: 1
    },
    createdAt: {
        type: Date,
        default: dayjs(),
        get: createdAtVal =>  dayjs(createdAtVal).format('hh:mmA - MM/DD/YYYY')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 