const isSeller=(req,res,next)=>{
    if( req.user.role!=="Seller"){
        req.flash("error","You need to be a Seller to continue..")
        console.log("\n\n\n\n\ This is the Seller url \n\n\n\n")
        console.log(req.session.previousUrl)
        res.redirect(req.session.previousUrl)
    }
    else{
        next();
    }
    }
    module.exports=isSeller;