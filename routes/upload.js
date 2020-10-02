const express = require('express');
const router = express.Router();
const UsersCtrl = require('../controllers/users');
const upload = require('../Services/upload');

const singleUpload = upload.single('image');

router.post('/image-upload', function(req, res) {
    console.log(upload)
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }
        console.log(req.body);
    return res.json({'imageUrl': req.file.location});
  });
});

module.exports = router;