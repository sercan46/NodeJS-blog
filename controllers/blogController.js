const Blog = require('../models/blogs') //Model Çekildi.
const blog_list=(req, res) => {
    //EJS Dosyası verme
    Blog.find().sort({ createdAt: -1 }).then(resp => {
        res.render('index', { title: 'Anasayfa', blogs: resp });
    }).catch(err => {
        console.error(err)
    })
}
const blog_detail_list=(req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {
        res.render('blog', { blog: result, title: 'Detay' })
    })
}
module.exports={
    blog_list,
    blog_detail_list
}