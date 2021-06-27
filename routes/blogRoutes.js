const express=require('express');
const router=express.Router();
const Blog = require('../models/blogs') //Model Çekildi.
const blogController=require('../controllers/blogController')
router.get('/',blogController.blog_list )
router.get('/:id',blogController.blog_detail_list );

module.exports=router;