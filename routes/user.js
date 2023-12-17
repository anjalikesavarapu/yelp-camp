const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const passport = require('passport');
const {storeReturnTo} = require('../middleware');

router.get('/register', (req, res) =>{
  res.render('users/register');
})

router.post('/register', catchAsync(async(req, res, next) =>{
  try{
    const {username, email, password} = req.body;
    const user = new User({username, email});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err =>{
      if(err) {
        return next(err);
      }
      req.flash('success', "Welcome to the yelpCamp");
      res.redirect('/campgrounds');
    })
  }catch(e){
    req.flash('error', e.message);
    res.redirect('register');
  }  
}));

router.get('/login', (req, res) =>{
  res.render('users/login');
})

router.post('/login',storeReturnTo,passport.authenticate('local', {failureFlash:true, failureRedirect:'/login',keepSessionInfo: true,}) ,(req, res) =>{
  req.flash('success', 'Welccome back!');
  const redirectTo = res.locals.returnTo || '/campgrounds'
  res.redirect(redirectTo);
})

router.get('/logout', (req, res, next) =>{
  // req.logout(function(err) {
  //   if(err) {
  //     return next(err);
  //   }
  //   req.flash('success', 'GoodBye');
  //   res.redirect('/campgrounds');
  // });
  req.logout();
  req.flash('success', 'GoodBye');
  res.redirect('/campgrounds');
})

module.exports = router;
