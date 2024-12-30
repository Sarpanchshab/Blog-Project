const AboutModel = require('../../models/About')

class AboutController{

    static aboutinsert = async(req,res)=>{
        try {
            console.log(req.body.about)
            const data = new AboutModel({
                about: req.body.about
            })
            await data.save()
            res.render('admin/about/display')
        } catch (error) {
            console.log(error)
        }
    }

    static aboutDisplay = async(req,res)=>{
        try {
            const result = await AboutModel.findOne()
                res.render('admin/about/display',{a:result})
        } catch (error) {
            console.log(error)
        }
    }

    static aboutEdit = async(req,res)=>{
        try {
           // console.log(req.params.id)
            const data = await AboutModel.findById(req.params.id)
            //console.log(data)
            res.render('admin/about/edit',{d:data})
        } catch (error) {
            console.log(error)
        }
    }

    static aboutUpdate = async(req,res) =>{
        try {
            const update = await AboutModel.findByIdAndUpdate(req.params.id ,{
                about: req.body.about
            })
            await update.save()
            res.redirect('/admin/blogdisplay')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AboutController