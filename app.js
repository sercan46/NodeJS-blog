const express = require('express'); //Express kuruldu.
const morgan = require('morgan'); //Morgan kuruldu.
const mongoose = require('mongoose'); //Mongo DB kuruldu.
const Blog = require('./models/blogs'); //Model Çekildi.
const cookieParser=require('cookie-parser'); //JWT işlemi yapmak için kullanılıyor.
const app = express(); //Express kullanıldı.
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes=require('./routes/blogRoutes');
const authRoutes=require('./routes/authRoutes');
const {requireAuth,chechkUser}=require('./middlewares/authMiddleware');

const dbUrl = "mongodb+srv://sercan-ozbek:producer1@cluster0.sdg0v.mongodb.net/node-blog?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true }).then(() => {
    app.listen('3000'); //Server başlatıldı.
}).catch((err) => {
    console.log(err)
})

app.set('view engine', 'ejs'); //EJS kurulduktan sonra ejs set edildi.

app.use(morgan('tiny')); //Morgan kuruldu loglama(Hangi istek atıldı, kaç saniye sürdü vb.) için.
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(cookieParser());

app.use('/',authRoutes);
app.use('/admin',requireAuth,adminRoutes);
app.use('/blog',blogRoutes);
app.get('*',chechkUser);

//Get isteği atma
app.get('/', (req, res) => {
    //Direkt dosya verme 
    //res.sendFile('./views/index.html',{root:__dirname});
    res.redirect('/blog');
});

//Mongo DB veri ekleme
app.get('/add', (req, res) => {
    const blog = new Blog({
        title: 'Yazi bir',
        short: 'Short yazi',
        long: 'Long yazi'
    })
    blog.save().then(resp => {
        res.send(resp);
    }).catch(err => {
        console.error(err)
    })
});
//Mongo DB tüm verileri çekme
app.get('/all', (req, res) => {
    Blog.find().then(result => {
        res.send(result);
    })
        .catch(err => {
            console.error(err)
        })
})
//Mongo DB veri filtreleme
app.get('/single', (req, res) => {
    Blog.findById("60cf81d472921b468409ba00").then(resp => {
        res.send(resp)
    }).catch(err => {
        console.error(err)
    })
})
app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html',{root:__dirname});
    res.render('about', { title: 'Hakkımızda' });
});

app.get('/about-us', (req, res) => {
    //Yönlendirme yapma
    res.redirect('/about')
});

//Middleware en son çalışan komut.
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404', { title: 'Sayfa Bulunamadı' });
})