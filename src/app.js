const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array()); 

const admin=require('firebase-admin');
var serviceAccount = require('./getlocation-4e371-firebase-adminsdk-ejf0i-653742a6d2.json');
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://getlocation-4e371-default-rtdb.firebaseio.com/",
authDomain: "getlocation-4e371.firebaseapp.com",
});

var db=admin.database();
var ref = db.ref("restricted_access/secret_document");
var usersRef = ref.child("users");

app.post('', async(req, res) =>{
    usersRef.push().set({...req.body});
    res.render('index');
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Khidmat',
        name: 'App Builder'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})