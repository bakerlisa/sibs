const passport = require('passport');
const LoaclStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require('./User.model');

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"]
    }
    return token;
}

// authorization : protecting resources, endpoints
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "noobcoder"

}, (payload,done) => {
    User.findById({ _id : payload.sub},(err,user) =>{{
        if(err)
            return done(err,false)
        if(user)
            return done(null,user);
        else
            return done(null,false);
    }})
}));

// authrnetication local stragety using email and password (login)
passport.use(new LoaclStrategy((email,password,done) => {
    User.findOne({email},(err,user)=>{
        if(err)
            return done(err);
        if(!user)
            return done(null,false);
        user.comparePassword(password,done);
    })
}));