const BlogModel = require("../../models/Blog");
const cloudinary = require('cloudinary').v2

 // Configuration
 cloudinary.config({ 
  cloud_name: 'dfpkxjf3y', 
  api_key: '882943454568449', 
  api_secret: 'QaWojDLtTyJ4L8eA8OCQ9EPsV8o' // Click 'View API Keys' above to copy your API secret
});

class BlogController {

  static displayBlog = async(req, res) => {  
    try {
        const data = await BlogModel.find()
        //console.log(data)
        res.render('admin/blog/display',{d:data});
    } catch (error) {
        console.log(error)
    }
  };

  static insertblog = async (req, res) => {
    try {
      //console.log("hello");
      //console.log(req.body) //req.body me data uth ke aata hai jo input se send karte hai
      // console.log(req.files.image)
      // there are two way first is modelname.create & second is object way
        // const result = await BlogModel.create(req.body)
        // const result = new BlogModel({
        //     title: req.body.title,
        //     description: req.body.description
        // })
       // await result.save()
       // console.log(result)

       const file = req.files.image
       const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'blogimage'
       })
       const result = new BlogModel({
        title: req.body.title,
        description: req.body.description,
        image:{
          public_id: myimage.public_id,
          url: myimage.secure_url
        }
       })
       await result.save()
      //  console.log(myimage)
      res.redirect('/admin/blogdisplay') 
       // /admin/blogdisplay redirect ke andar hamesa route ka url lete hai
    } catch (error) {
      console.log(error);
    }
  };

  static blogview = async (req,res) =>{
    try {
        //req.params.id me id uth ke aati :id jo web par aati hai store hoti hai
        //console.log(req.params.id)
        const result = await BlogModel.findById(req.params.id)
        //console.log(result)
        res.render('admin/blog/view',{view:result})
    } catch (error) {
        console.log(error)
    }
  }

  static blogedit = async(req,res) =>{
    try {
        const result = await BlogModel.findById(req.params.id)
        //console.log(result)
        res.render('admin/blog/edit',{edit:result})
    } catch (error) {
        console.log(error)
    }
  }

  static blogUpdate = async(req,res)=>{
    try {
      // console.log(req.body)
      // console.log(req.params.id)

      //delete image code
      const blog = await BlogModel.findById(req.params.id)
      const imageid = blog.image.public_id
      // console.log(imageid)
      await cloudinary.uploader.destroy(imageid)

      // second update image
      const file = req.files.image
      const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
       folder: 'blogimage'
      })

      const update = await BlogModel.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        image:{
          public_id: myimage.public_id,
          url: myimage.secure_url
        }
      })
      await update.save()
      res.redirect('/admin/blogdisplay')
    } catch (error) {
      console.log(error)
    }
  }

  static blogDelete = async(req,res)=>{
    try {
      // console.log(req.body)
      // console.log(req.params.id)

      //delete image code
      const blog = await BlogModel.findById(req.params.id)
      const imageid = blog.image.public_id
      // console.log(imageid)
      await cloudinary.uploader.destroy(imageid)

      await BlogModel.findByIdAndDelete(req.params.id)
      res.redirect('/admin/blogdisplay')
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = BlogController;
