const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));

// Set views and template engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://root:1004@cluster0.rrdgqel.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => console.log('Error in Connecting to Database'));
db.once('open', () => console.log('Connected to Database'));

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phno: String,
    password: String
});

const users = mongoose.model('User', userSchema);

// Homepage route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});

// Sign-in and Sign-up page routes
app.get('/signinup', (req, res) => {
    
    res.render('signinup', { successMessage: null, errorMessage: null });
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

app.get('/cataloghome', (req, res) => {
    res.render('cataloghome');
});
app.get('/Daggers', (req, res) => {
    res.render('Daggers');
});
app.get('/asian', (req, res) => {
    res.render('Asian');
});
app.get('/euro', (req, res) => {
    res.render('European');
});








app.post('/sign_up', async (req, res) => {
    try {
        const { name, email, phno, password } = req.body;

        const newUser = new users({
            name: name,
            email: email,
            phno: phno,
            password: password
        });

        await newUser.save();

        console.log('Record Inserted Successfully');
        res.render('signinup', { successMessage: 'Sign up successful!', errorMessage: null });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/sign_in', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists with the provided email
      const user = await users.findOne({ email });
      if (!users) {
        res.render('siginup', { successMessage: 'User not founf', errorMessage: null });
        return;
      }
  
      // Verify the provided password matches the stored password
      if (password !== user.password) {
        res.render('signinup', { successMessage: 'Incorrect Password', errorMessage: null });
        return;
      }
      // Sign-in successful
      res.render('index', { successMessage: 'Login Successful', errorMessage: null });

    } catch (error) {
      console.error('Error handling sign-in:', error);
      res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(port, () => console.info(`Listening on PORT ${port}`));
