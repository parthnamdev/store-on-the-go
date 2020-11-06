

const authenticate = (req, res, next) => {
    try {
        // if(req.isAuthenticated()) {
        //     console.log("hello");
            
        //     next();
        // } else {
        //     console.log(req.user);
        //     res.send("no");
        // }
        if(req.signedCookies.user != undefined) {
            req.user = req.signedCookies.user;
            next();
        } else {
            res.redirect('../login');
        }
        
        

    } catch(err) {
        res.render('err', {error: "error authenticating user"});
        console.log(err);
    }
}

module.exports = authenticate;