const BlogModel = require('../models/Blog')
const CategoryController = require('../models/Category')

class FrontController {

    static home = async(req,res) =>{
        try {
            const blogs = await BlogModel.find().sort({_id:-1}).limit(6)
            //console.log(blogs)
            res.render('home',{b:blogs})
        } catch (error) {
            console.log(error)
        }
        
    }

    static about = async (req,res) =>{
        try {
            res.render('about')
        } catch (error) {
            console.log(error)
        }
        
    }

    static blog = async(req,res) =>{
        try {
            const data = await BlogModel.find()
            res.render('blog',{b:data})
        } catch (error) {
            console.log(error)
        }
        
    }

    static contact = async(req,res) =>{
        try {
            res.render('contact')
        } catch (error) {
            console.log(error)
        }
        
    }

    static team = async(req,res) =>{
        try {
            res.render('team')
        } catch (error) {
            console.log(error)
        }
        
    }

    static detail = async(req,res) =>{
        try {
            //console.log(req.params.id)
            const detail = await BlogModel.findById(req.params.id)
            const recentblogs = await BlogModel.find().limit(6)
            const category = await CategoryController.find().limit(10)
            res.render('detail',{r:recentblogs,d:detail, c:category})
        } catch (error) {
            console.log(error)
        }
        
    }

    

}

module.exports = FrontController