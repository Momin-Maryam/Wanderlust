const User = require("../models/user");


module.exports.renderSignUpForm =  (req, res) =>{
    res.render("users/signup.ejs");
}


module.exports.signup = async(req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username})
        const regsiterdUser = await User.register(newUser, password);
        console.log(regsiterdUser);
        req.login(regsiterdUser, (err) =>{
            if(err) {
                return next(err);
            }
            req.flash("success", "Awesome! Thanks for joining Wanderlust. Your account is ready to roll!!");
            res.redirect("/listings");
        });

    }catch(e) {
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
  
}

module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) =>{
    req.flash("success", " Hooray! You're in! Welcome to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) =>{
    req.logout((err)=>{
        if(err){
            return next();
        }
        req.flash("success", "Logout successful. Don't worry, we'll keep your pixels safe.");
        res.redirect("/listings");
    })
}