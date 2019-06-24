const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/profile');
const checkAuth = require('../middleware/check_auth');

router.get('/', (req, res, next)=>{
  Profile.find()
  .exec()
  .then(result => {
      if(result.length >= 0){
        res.status(200).json(result);
      }
      else{
        res.status(404).json({message: "No data found"});
      }
  })
  .catch(err => {
      res.status(500).json({error: err});
  });
});

router.post('/', (req, res, next)=>{
    const profile = new Profile({
       _id: new mongoose.Types.ObjectId(),
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       emailId: req.body.emailId,
       phoneNumber: req.body.phoneNumber,
       designation: req.body.designation,
       summary: req.body.summary,
       DOB: req.body.DOB,
    });
     profile
     .save()
     .then(result => {
         console.log("saved");
         console.log(result);
     })
     .catch(err => console.log(err));
    res.status(201).json({
        message: 'handling POST request to /profile',
        createdProfile: profile,
    })
});

router.get('/:profileId', (req, res, next)=>{
    const id = req.params.profileId;
    Profile.findById(id).exec().then(result => {
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(400).json({message: 'No valid entry found for provided ID'})
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.patch('/:profileId', (req, res, next)=>{
    const id = req.params.profileId;
    const updateOps = {};
    for(const ops of req.body){
       updateOps[ops.propName] = ops.value;
    }
    Profile.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        res.status(500).json({error: err});
    })
});

router.delete('/:profileId', (req, res, next)=>{
    const id = req.params.profileId;
    Profile.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
    })
    .catch(err=>{
        res.status(500).json({error: err});
    });
});

module.exports = router;