const express=require('express');
const fetchDetails=require('../controllers/user.controller')
const router=express.Router();
router.get('/users-list',fetchDetails)
module.exports=router