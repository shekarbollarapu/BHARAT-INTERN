const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', () => console.log('Error connecting to the database'));
db.once('open', () => console.log('Connected to the database'));

// Define schema and model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/sign_up', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            phno: req.body.phno,
            gender: req.body.gender,
            password: req.body.password
        });

        await user.save();
        res.redirect('signup_successful.html');
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).send('Error inserting record');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
