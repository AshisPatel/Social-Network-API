const { Thought, User } = require('../models');

const thoughtController = {

    getThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .select('-__v')
            .then(dbThoughtData => res.status(200).json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Destructure req, and grab params object to get thoughtId
    getThoughtById({ params }, res) {
        Thought.findById(params.thoughtId)
            .select('-__v')
            .then(dbThoughtData => {
                dbThoughtData ?
                    res.status(200).json(dbThoughtData) :
                    res.status(404).json({ message: "No thought found with that id!" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add thought
    createThought({ params, body }, res) {
        // Create thought first, then update User 
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findByIdAndUpdate(
                    params.userId,
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true })
            })
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

    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            body,
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbThoughtData => {
                dbThoughtData ?
                    res.status(200).json(dbThoughtData) :
                    res.status(404).json({ message: "No thought found with that id!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.thoughtId)
            .then(dbThoughtData => {
                dbThoughtData ?
                    res.status(200).json(dbThoughtData) :
                    res.status(404).json({ message: "No thought find with that id!" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

};

module.exports = thoughtController;