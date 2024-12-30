const express = require('express')
const router = express.Router()
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const ContactController = require('../controllers/ContactController')
const auth = require('../middleware/auth')

//Front Controller
router.get('/home',FrontController.home)
router.get('/about',auth,FrontController.about)
router.get('/contact',auth,FrontController.contact)
router.get('/blog',auth,FrontController.blog)
router.get('/detail/:id',auth,FrontController.detail)
router.post('/contactquery',auth,ContactController.contactInsert)

//Admin Controller
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.get('/admin/contact',auth,ContactController.contactDisplay)
router.get('/',AdminController.login)
router.get('/register',AdminController.register)
router.post('/insertregister',AdminController.insertRegister)
router.post('/verifylogin',AdminController.verifyLogin)
router.get('/logout',AdminController.logout)

//Blog Controller
router.get('/admin/blogdisplay',BlogController.displayBlog)
router.post('/insertblog',BlogController.insertblog)
router.get('/admin/blogview/:id',BlogController.blogview)
router.get('/admin/blogedit/:id',BlogController.blogedit)
router.post('/admin/blogupdate/:id',BlogController.blogUpdate)
router.get('/admin/blogdelete/:id',BlogController.blogDelete)

//About Controller
router.get('/admin/aboutdisplay', AboutController.aboutDisplay)
router.post('/admin/insertabout',AboutController.aboutinsert)
router.get('/admin/aboutEdit/:id',AboutController.aboutEdit)
router.post('/admin/aboutUpdate/:id',AboutController.aboutUpdate)

//CategoryController
router.get('/admin/category',CategoryController.categoryDisplay)
router.post('/admin/categoryinsert',CategoryController.categoryInsert)
router.get('/admin/categoryedit/:id',CategoryController.categoryEdit)
router.post('/admin/categoryupdate/:id',CategoryController.categoryUpdate)
router.get('/admin/categorydelete/:id',CategoryController.categoryDelete)

//import point remember it
module.exports = router