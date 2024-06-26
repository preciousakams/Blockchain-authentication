const cors = require('cors');
const express = require('express');
const Session  = require(('express-session'));
const authController = require('./controllers/authController');
const requireAuth = require('./middleware/requireAuth');

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }

));

const port = 3001;

app.use(Session({
  name: 'siwe-quickstart',
  secret: "siwe-quickstart-secret",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, sameSite: true }
}));


app.get('/api/nonce', authController.Nonce); 
app.post('/api/verify', authController.Verify);
app.get('/api/validate',requireAuth, authController.Validate);
app.get('/api/logout', authController.Logout);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});