const Room = require('../models/Room')

module.exports = {
    create,
    index,
    delete: deleteOne,
    update
}

function create(req,res) {
    req.body.createdBy = req.user._id
    Room.create(req.body)
    .then(room => {res.json(room)})
    .catch(err => {res.json(err)})
}

function index(req, res) {
    Room.find({})
    .populated('createdBy')
    .then(rooms => {res.json(rooms)})
    .catch(err => {res.json(err)})
}

function deleteOne(req, res){
    Room.findByIdAndDelete(id)
    .then(room => {res.json(room)} )
    .catch(err => {res.json(err)})
}

function update(req,res) {
    Room.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('createdBy')
    .then(room => {res.json(room)})
    .catch(err => {res.json(err)})
}