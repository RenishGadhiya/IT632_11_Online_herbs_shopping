const isBuyer=(req,res,next)=>{
    if( req.user.role!=="Customer"){
        req.flash("error","You need to be a Customer to continue..")
        console.log("\n\n\n\n\ This is the Customer url \n\n\n\n")
        console.log(req.session.previousUrl)
        res.redirect(req.session.previousUrl)
    }
    else{
        next();
    }
    }
    module.exports=isBuyer;