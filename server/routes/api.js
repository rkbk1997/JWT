const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose =require('mongoose')
const User = require('../model/userRegister')

mongoose.connect('mongodb://localhost:27017/jwtdb', {useNewUrlParser: true,useUnifiedTopology: true},(error)=>{
    if(!error){
        console.log("Connection Success");
    }
    else{
        console.log("connection Not success");
    }
});

router.get('/',(req,res) => {
    res.send('Sever Say Hii')
})

router.post('/register',(req, res)=>{
    console.log('regData=', req.body)
    let userData = req.body
    let user = new User(userData)
    user.save((error,reguser)=>{
        if(error){
            console.log(error)
        }else{
            let payload = {subject: reguser._id}
            let token = jwt.sign(payload, 'secret')
            res.status(200).send({token})
        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email: userData.email},(error, user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid Email')
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secret')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.post('/event',verifyToken,(req,res)=>{
    let events= ["user","Ravi"]
    res.json(events)

})

router.post('/special',verifyToken,(req,res)=>{
    let events= ["user"]
    res.json(events)
})

function verifyToken(req,res,next){
    if(!req.headers.authoriaztion){
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('unauthorized user')
    }
    let payload = jwt.verify(token,'secret')
    if(!payload){
        return res.status(401).send('unauthorized user')
    }
    req.userId = payload.subject
    next()
}

module.exports = router;