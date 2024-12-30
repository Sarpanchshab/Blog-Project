const jwt = require('jsonwebtoken')

const AdminModel = require('../models/Admin')


const checkAdminAuth = async(req,res,next)=>{
    //console.log('hello middleware')

    const {token} = req.cookies //cookie parser ki help se get hua h token
    // console.log(token)
    if(!token){
        req.flash('error','Unauthorized admin')
        res.redirect('/login')  
    }else{
        //agar token aata hai to match karege secret key se
        const data = jwt.verify(token,'sarpanchshab')
        
        //console.log(data)//isme id uth ke aayegi kyuki token id se hi bana hai
        const admin = await AdminModel.findOne({_id:data.id})//data find kar liya id se jisse token banaya h
       // console.log(admin)
        req.admin = admin //pura secure data aajayega id ka content
        next()//isse direct dusre method par jayega
    }

}

module.exports = checkAdminAuth