const User = require('../models/user');
module.exports.renderRegister = (req, res) =>{
  res.render('users/register');
}

module.exports.register = async(req, res, next) =>{
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
}

module.exports.renderLogin = (req, res) =>{
  res.render('users/login');
}

module.exports.login = (req, res) =>{
  req.flash('success', 'Welccome back!');
  const redirectTo = res.locals.returnTo || '/campgrounds'
  res.redirect(redirectTo);
}

module.exports.logout = (req, res, next) =>{
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
}