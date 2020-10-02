const Post = require('../models/Post')

module.exports = {
    create,
    index,
    delete: deleteOne,
    update
  }
  
  function create(req, res) {
    req.body.createdBy = req.user._id
    Post.create(req.body)
    .then(movie => {res.json(post)})
    .catch(err => {res.json(err)})
  }

  function index(req, res) {
      Post.find({})
      .populated('createdBy')
      .then(posts => {res.json(posts)})
      .catch(err => {res.json(err)})
  }

  function deleteOne(req, res) {
      Post.findByIdAndDelete(id)
      .then(post => {res.json(post)})
      .catch(err => {res.json(err)})
  }

  function update(req,res) {
      Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('createdBy')
      .then(post => {res.json(post)})
      .catch(err => {res.json(err)})
  }
