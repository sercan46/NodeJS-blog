const Blog = require('../models/blogs') //Model Çekildi.

const admin_list = (req, res) => {
    //EJS Dosyası verme
    Blog.find().sort({ createdAt: -1 }).then(resp => {
        res.render('admin', { title: 'Admin', blogs: resp });
    }).catch(err => {
        console.error(err)
    })
}
const admin_add = (req, res) => {
    res.render('add', { title: 'Yeni Yazı' })
}
const admin_add_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then(resp => {
        res.redirect('/admin')
    }).catch((err) => {
        console.error(err)
    })
}
const admin_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then((result) => {
        res.json({ link: '/admin' })
    }).catch(err => {
        console.log(err)
    })
}
module.exports = {
    admin_list,
    admin_add,
    admin_add_post,
    admin_delete
}