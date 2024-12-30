const CategoryModel = require('../../models/Category')
const cloudinary = require('cloudinary').v2

 // Configuration
 cloudinary.config({ 
  cloud_name: 'dfpkxjf3y', 
  api_key: '882943454568449', 
  api_secret: 'QaWojDLtTyJ4L8eA8OCQ9EPsV8o' // Click 'View API Keys' above to copy your API secret
});

class CategoryController{

    static categoryDisplay = async(req,res)=>{
        try {
            const data = await CategoryModel.find()
            res.render('admin/category/display',{d:data})
        } catch (error) {
            console.log(error)
        }
    }

    static categoryInsert = async(req,res)=>{
        try {
        //    console.log(req.body)
        //    console.log(req.files.image)
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
             folder: 'blogimage'
            })
            const result = new CategoryModel({
             title: req.body.title,
             description: req.body.description,
             category: req.body.category,
             image:{
               public_id: myimage.public_id,
               url: myimage.secure_url
             }
            })
            await result.save()
           //  console.log(myimage)
        
            res.redirect('/admin/category')
        } catch (error) {
            console.log(error)
        }
    }

    static categoryEdit = async(req,res)=>{
        try {
            // console.log(req.params.id)
            const data = await CategoryModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/category/edit',{d:data})
        } catch (error) {
            console.log(error)
        }
    }

    static categoryUpdate = async(req,res) =>{
        try {
            //delete image code
      const blog = await CategoryModel.findById(req.params.id)
      const imageid = blog.image.public_id
      
      await cloudinary.uploader.destroy(imageid)

      // second update image
      const file = req.files.image
      const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
       folder: 'blogimage'
      })

      const update = await CategoryModel.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        category:req.body.category,
        image:{
          public_id: myimage.public_id,
          url: myimage.secure_url
        }
      })
      await update.save()
      res.redirect('/admin/category')
        } catch (error) {
            console.log(error)
        }
    }

    static categoryDelete = async(req,res)=>{
        try {
            const data = await CategoryModel.findByIdAndDelete((req.params.id))
            //console.log(data)
            res.redirect('/admin/category')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = CategoryController
