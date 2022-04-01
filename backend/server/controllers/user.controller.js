const User = require('../models/User.model');



// FIND
module.exports.allUsers = (req, res) => {
    User.find()
        .then(allDaUsers => res.json({ users: allDaUsers }))
        .catch(err => res.status(400).json({ message: 'Something went wrong finding all products', error: err }));
}

module.exports.singleUser = (req,res) => {
    User.findOne({_id: req.params.id})
    .then(singleUserInfo => res.json({ user: singleUserInfo}))
    .catch(err => res.status(400).json({ message: 'Something went wrong when getting single product', error: err }));
}

module.exports.editUser = (req,res) => {
    User.findOneAndUpdate({_id: req.params.id},
        req.body,
        { new: true, runValidators: true })
    .then(updateUser=> res.json({ user: updateUser}))
    .catch(err => res.status(400).json({ message: 'Something went wrong when getting single product', error: err }));
}

//Validates username and password
module.exports.loginUser = (req,res) => {
    User.find({ email: req.body.email, password: req.body.password})
    .then(foundUser => res.json({ user: foundUser}))
    .catch(err => res.status(400).json({ message: 'Something went wrong logging in', error: err }));
}

// Checks email for uniqueness
module.exports.EmailUser = (req,res) => {
    User.find({ email: req.body.email })
    .then(foundUser => res.json({ user: foundUser}))
    .catch(err => res.status(400).json({ message: 'Something went wrong logging in', error: err }));
}

// ADDs Kids to parents
// module.exports.AddChildUser = (req,res) => {
//     User.findOneAndUpdate({ _id: req.params.id},
//         { $addToSet: { kids: req.body.kids[0]  } })
//     .then(foundUser => res.json({ user: foundUser}))
//     .catch(err => res.status(400).json({ message: 'Something went wrong logging in', error: err }));
// }
module.exports.AddChildUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $push: { kids: {name: req.body.name, birthday: req.body.birthday, image: req.body.image}  } })
    .then(foundUser => res.json({ user: foundUser}))
    .catch(err => res.status(400).json({ message: 'Something went wrong logging in', error: err }));
}

module.exports.DeleteChildUser = (req,res) => {
    User.updateOne({  _id: req.params.id},
        { $pull: { kids: {name: req.body.name, birthday: req.body.birthday, image: req.body.image}  } })
    .then(foundUser => res.json({ user: foundUser}))
    .catch(err => res.status(400).json({ message: 'Something went wrong logging in', error: err }));
}




module.exports.EditChildUser = (req,res) => {
    User.where({  _id: req.params.id}.updateOne(updateObj))
    .then(foundUser => res.json({ user: foundUser}))
    .catch(err => res.status(400).json({ message: 'Something went wrong logging in', error: err }));
}
// module.exports.EditChildUser = (req,res) => {
//     User.where({  _id: req.params.id},updateObj,{ overwrite: true },
//         { $set: {'kids.$.name': req.body.name, 'kids.$.birthday': req.body.birthday, 'kids.$.image': req.body.image } })
//     .then(foundUser => res.json({ user: foundUser}))
//     .catch(err => res.status(400).json({ message: 'Something went wrong logging in', error: err }));
// }



//FAMILY LINK
module.exports.SpouseLinkUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $addToSet: { spouse: req.body.spouse[0]  } })
    .then(spouseUser => res.json({ user: spouseUser}))
    .catch(err => res.status(400).json({ message: 'Person is already a spouse', error: err }));
}

module.exports.SiblingLinkUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $addToSet: { siblings: req.body.siblings[0]  } })
    .then(spouseUser => res.json({ user: spouseUser}))
    .catch(err => res.status(400).json({ message: 'Person is already a sibling', error: err }));
}
module.exports.ParentsLinkUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $addToSet: { parents: req.body.parents[0]  } })
    .then(spouseUser => res.json({ user: spouseUser}))
    .catch(err => res.status(400).json({ message: 'Person is already a parent', error: err }));
}
module.exports.StepParentsLinkUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $addToSet: { stepParents: req.body.stepParents[0]  } })
    .then(spouseUser => res.json({ user: spouseUser}))
    .catch(err => res.status(400).json({ message: 'Person is already a step parent', error: err }));
}
module.exports.KidsLinkUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $addToSet: { children: req.body.children[0]  } })
    .then(spouseUser => res.json({ user: spouseUser}))
    .catch(err => res.status(400).json({ message: 'Person is already a children', error: err }));
}
module.exports.StepKidsLinkUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $addToSet: { stepKids: req.body.stepKids[0]  } })
    .then(spouseUser => res.json({ user: spouseUser}))
    .catch(err => res.status(400).json({ message: 'Person is already a stepKids', error: err }));
}
module.exports.StepSiblingLinkUser = (req,res) => {
    User.findOneAndUpdate({ _id: req.params.id},
        { $addToSet: { stepSibling: req.body.stepSibling[0]  } })
    .then(spouseUser => res.json({ user: spouseUser}))
    .catch(err => res.status(400).json({ message: 'Person is already a stepSibling', error: err }));
}

// CREATE
module.exports.createUser = (req,res) => {
    User.create(req.body)
    .then(newUser => res.json({ user: newUser }))
    .catch(err => res.status(400).json({ message: 'Something went wrong creating new product', error: err }));
}

// DELETE
module.exports.deleteUser = (req,res) => {
    User.deleteMany({_id: req.params.id})
    .then(result => res.json({ result: result}))
    .catch(err => res.status(400).json({ message: 'Something went wrong when deleting product', error: err }));
}

