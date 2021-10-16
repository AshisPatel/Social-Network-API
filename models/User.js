const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    // We are looking for an ObjectId data type, since we are only going to compile the _id of the Thought document in the thoughts array.
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    // References itself, or the UserSchema 
    friends: [this]
},
    {

        toJSON: {
            virtuals: true
        },
        id: false

    }
)

UserSchema.virtual('friendCount').get(function() {
    if (this.friends.length) {
        return this.friends.length;
    } else {
        return 0; 
    }
});

const User = model('User', UserSchema);

module.exports = User; 