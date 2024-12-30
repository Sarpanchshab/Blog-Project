const AdminModel = require('../../models/Admin')

//password secure hashpassword
const bcrypt = require('bcrypt')

//json web token generate
const jwt= require('jsonwebtoken')

class AdminController {


    static dashboard = (req, res) => {
        try {
            const {name,email,} = req.admin
            res.render('admin/dashboard',{n:name, e:email})
        } catch (error) {
            console.log(error)
        }
    }

    //login
    static login = async (req, res) => {
        try {

            res.render('login',{message: req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }

    //register
    static register = async (req, res) => {
        try {
            res.render('register', { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    //Insertregister
    static insertRegister = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, password, confirmpassword } = req.body
            const admin = await AdminModel.findOne({ email: email })
            
            if (admin) {
                req.flash('error', 'Email already exists')
                res.redirect('/register')
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        
                        const hashpassword = await bcrypt.hash(password,10)

                        const result = await new AdminModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            confirmpassword: hashpassword
                        })
                        await result.save()
                        res.redirect('/')
                    } else {
                        req.flash('error', 'Password & Confirm password doesnot match ')
                        res.redirect('/register')
                    }

                } else {
                    req.flash('error', 'All Fields are required')
                    res.redirect('/register')
                }

            }

        } catch (error) {
            console.log(error)

        }
    }

    //Verifylogin
    static verifyLogin = async(req,res)=>{
        try {
            //console.log(req.body)
            const {email,password} = req.body
            if(email && password){
            
                const admin = await AdminModel.findOne({email:email})
                
                if(admin!=null){
                    //password compare ho rha h secured bcrypt wala
                    const ismatched = await bcrypt.compare(password,admin.password)

                    if(ismatched){
                        
                        //generate jwt token
                        //token id se aur secrete key sarpanchshab se banaye
                        const token = jwt.sign({id:admin._id},'sarpanchshab')
                        // console.log(token)
                        res.cookie('token',token)
                        res.redirect('/home')
                    }else{
                        req.flash('error','Email oR Passord is incorrect')
                        res.redirect('/')
                    }

                }else{
                    req.flash('error','Your are not register user')
                    req.redirect('/')
                }
            }else{
                req.flash('error','All Field Are Required')
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //logout
    static logout = async(req,res) =>{
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = AdminController