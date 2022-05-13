const notAdmin=(req,res,next)=>
{
        if( req.user.role==="Admin")
        {
            req.flash("error","No Access for Admin")
            console.log("\n\n\n\n\ This is not-Admin URL \n\n\n\n")
            console.log(req.session.previousUrl)
            res.redirect(req.session.previousUrl)
        }
        else
        {
            next();
        }
}
module.exports=notAdmin;