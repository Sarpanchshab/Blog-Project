const ContactModel = require('../models/Contact')

class ContactController{

    static contactInsert = async(req,res)=>{
        try {
           // console.log(req.body)
           const query = req.body
           const result = new ContactModel({
            name:query.name,
            email:query.email,
            phone:query.phone,
            message:query.message
           })
           await result.save()
           res.redirect('/contact')
        } catch (error) {
            console.log(error)
        }
    }

    static contactDisplay = async(req,res)=>{
        try {
            const data = await ContactModel.find()
            res.render('admin/contact',{d:data})
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = ContactController