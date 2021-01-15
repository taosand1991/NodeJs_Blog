const route = require('express').Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const privateKey = 'secret';

 const getUserDetail = async (profile, done, stat=null) => {
    const email = Math.floor(Math.random() * 10).toString(36) + '@legacy.co';
    const password = '123456';
    if(profile){
        const user = await User.findOne({username : profile.username});
        if(user){
            const payload = {
                userId:user._id,
                username: user.username
            }
            const token = jwt.sign(payload, privateKey, {expiresIn:'1h'});
            done(null, token)
        }else{
            const hash = await bcrypt.hash(password, 10)
            if(stat === 'google'){
                const user = await User.create({
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    password:hash,
                });
                const payload = {
                    userId:user._id,
                    username:user.username,
                }
                const token = jwt.sign(payload, privateKey, {expiresIn:'1h'});
                done(null, token);
            }else{
                const user = await User.create({
                    email: email,
                    username: profile.username,
                    password:hash,
                });
                const payload = {
                    userId:user._id,
                    username:user.username,
                }
                const token = jwt.sign(payload, privateKey, {expiresIn:'1h'});
                done(null, token);
            }
            
        }
    }
}

passport.use(new TwitterStrategy({
    consumerKey:process.env.TWITTER_CLIENT_KEY,
    consumerSecret:process.env.TWITTER_CLIENT_SECRET,
    callbackURL:'http://localhost:5000/social/auth/twitter/get-user',
},
 function (token, tokenSecret, profile, done){
    return getUserDetail(profile, done, stat='twitter');
}
// async function(token, tokenSecret, profile, done){
//     const email = Math.floor(Math.random() * 10).toString(36) + '@legacy.co';
//     const password = '123456';
//     if(profile){
//         const user = await User.findOne({username : profile.username});
//         if(user){
//             const payload = {
//                 userId:user._id,
//                 username: user.username
//             }
//             const token = jwt.sign(payload, privateKey, {expiresIn:'1h'});
//             done(null, token)
//         }else{
//             const hash = await bcrypt.hash(password, 10)
//             const user = await User.create({
//                 email: email,
//                 username: profile.username,
//                 password:hash,
//             });
//             const payload = {
//                 userId:user._id,
//                 username:user.username,
//             }
//             const token = jwt.sign(payload, privateKey, {expiresIn:'1h'});
//             done(null, token);
//         }
//     }
// }

));


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_KEY,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:5000/social/auth/google/get-user'
},
 function(token, tokenSecret, profile, done){
     return getUserDetail(profile, done, stat='google')
 }
))


passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:'http://localhost:5000/social/auth/github/get-user',
},
 function(token, tokenSecret, profile, done){
    return getUserDetail(profile, done, stat='github')
 }

))

route.get('/auth/twitter', passport.authenticate('twitter', {session:false}));

route.get('/auth/twitter/get-user', passport.authenticate('twitter', {
    session:false,
    // successRedirect: 'http://localhost:5000/auth/social/callback',
    failureRedirect:'/login'
}), (req, res)=>{
    res.redirect(`http://localhost:3000/auth/social/callback/${req.user}`)
})


route.get('/auth/google', passport.authenticate('google', {session:false, scope:['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}));
route.get('/auth/google/get-user', passport.authenticate('google', {
    session:false,
    failureRedirect:'http://localhost:3000/login',}),
    (req, res) => {
        res.redirect(`http://localhost:3000/auth/social/callback/${req.user}`)
    })

    route.get('/auth/github', passport.authenticate('github', {session:false}));

    route.get('/auth/github/get-user', passport.authenticate('github', {
        session:false,
        failureRedirect:'/login'
    }), (req, res)=>{
        res.redirect(`http://localhost:3000/auth/social/callback/${req.user}`)
    })    


module.exports = route;