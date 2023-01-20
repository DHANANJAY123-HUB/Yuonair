const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');

router.get('/index',(req,res)=>{
  res.render('index')
});

router.get('/user_list',(req,res)=>{
  adminModel.fetchDetails(req.body).then((result)=>{
      res.render('user_list',{'list':result});   
       /*res.json({
        result
       }) */
    }).catch((err)=>{
       res.render({message:err.message});
      /* res.json({
        message:err.message
       })*/
    })
});




module.exports = router;