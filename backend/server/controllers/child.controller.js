const Child = require('../models/child.model');

// FIND ALL PERSON
module.exports.allChildern = (req,res) => {
    Child.find({ id: req.body.id })
    .then(foundChildren => res.json({ children: foundChildren}))
    .catch(err => res.status(400).json({ message: 'Something went finding children', error: err }));
}

// CREATE
module.exports.createChild = (req,res) => {
    Child.create(req.body)
    .then(newChild => res.json({ child: newChild }))
    .catch(err => res.status(400).json({ message: 'Something went wrong creating new child', error: err }));
}

// DELETE
module.exports.deleteChild = (req,res) => {
    Child.deleteMany({_id: req.params.id})
    .then(result => res.json({ result: result}))
    .catch(err => res.status(400).json({ message: 'Something went wrong when deleting children', error: err }));
}
