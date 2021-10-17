const { User, Thought } = require('../models');
const { getThoughts } = require('./thought-controller');

const userController = {
    getAllUsers(req, res) {
        // find all
        User.find({})
            // Fill out all the information in the returned thoughts array instead of just the _id: ObjectId, sorted by the newest thought first 
            // Exclude the __v key
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .populate({
                path: 'thoughts',
                select: '-__v',
                sort: { _id: -1 }
            })
            // exclude user __v key
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // destructure the req object into the params object
    getUserById({ params }, res) {
        User.findById(params.userId)
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v',
                sort: { _id: -1 }
            },
                {
                    path: 'friends',
                    select: ('-__v')
                })
            .select('-__v')
            .then(dbUserData => {
                dbUserData ?
                    res.status(200).json(dbUserData) :
                    res.status(404).json({ message: 'No user found by that id!' })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // destructure the req object into the body object
    createUser({ body }, res) {
        User.create({
            username: body.username,
            email: body.email
        })
            .then(dbUserData => res.status(200).json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // destructure the req to get body => new user information and params => id to find the appropriate User document
    updateUser({ body, params }, res) {
        // include new: true to return User model post update
        // include runValidators: to run any validation requirements on a PUT request
        User.findByIdAndUpdate(params.userId, body,
            {
                new: true,
                runValidators: true
            })
            .then(dbUserData => {
                dbUserData ?
                    res.status(200).json(dbUserData) :
                    res.status(404).json({ message: "No user found with that id!" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // destructure params object for the userid
    // deleteUser({ params }, res) {
    //     User.findByIdAndDelete(params.userId)
    //         .then(dbUserData => {
    //             dbUserData ?
    //                 res.status(200).json(dbUserData) :
    //                 res.status(404).json({ message: "No user found with that id!" })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         })
    // },

    async deleteUser({ params }, res) {
        let username = "";
        await User.findById(params.userId)
        .then(dbUserData => { 
            dbUserData ? 
            username = dbUserData.username :
            res.status(404).json({message: "No user with that id exists!" });
        });

        if(!username) {
            return; 
        }
      
        User.findByIdAndDelete(params.userId)
            .then((dbUserData) => {
                if (dbUserData) {
                    // delete thoughts and reactions of the associated user
                    return Thought.deleteMany({ username: username });

                } else {
                    res.status(404).json({ message: "No user found with that id!" });
                }
            })
            .then(dbUserData => {
                if (dbUserData) {
                    return Thought.updateMany(
                        { reactionCount: { $gt: 0 } },
                        { $pull: { reactions: { username: username } } }
                    )
                } else {
                    return; 
                }
            })
            .then(dbUserData => {
                dbUserData ? 
                res.status(200).json({ message: `${username} has been deleted, along with their thoughts and reactions.`}) :
                res.status(404).json({ message: "No user with that id exists!"}); 
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Friend Functions

    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            params.userId,
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                dbUserData ?
                    res.status(200).json(dbUserData) :
                    res.status(404).json({ message: "No user found with that id!" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            params.userId,
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                dbUserData ?
                    res.status(200).json(dbUserData) :
                    res.status(404).json({ message: "No user found with that id!" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}

module.exports = userController;