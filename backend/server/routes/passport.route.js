const PassportConfig = ('../controllers/passport.controller')
const express =require('express');
const userRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken')
const NewUser = require('../models/user.model')

userRouter.post('/register', (req,res)=>{
    const{}
})