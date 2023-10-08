var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async function(req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法


  try {
    // Generate a hash for the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the hashing cost

    // Set the username (keeping the example's approach)
    models.Annotator.count()
        .then(count => {
          req.body.username = "annotator" + count.toString();
        })
        .catch(error => {
          console.error("Error", error);
        });

    // Create a new Annotator record with the hashed password stored in the database
    const annotator = await models.Annotator.create({
      username: req.body.username,
      password: hashedPassword, // Store the hashed password
      email: req.body.email,
      account: req.body.account
    });

    res.json({ annotator: annotator });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/login', async function(req, res, next) {
  // 在响应中设置CORS头
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的HTTP方法


  try {
    const { account, password } = req.body;

    // Find a matching user in the database
    const annotator = await models.Annotator.findOne({
      where: { account: account }
    });

    // If a matching user is found
    if (annotator) {
      // Verify if the password matches
      const isPasswordValid = await bcrypt.compare(password, annotator.password);

      if (isPasswordValid) {
        // Successful login, you can return some user information
        res.json({ success: true, message: 'Login successful', annotator: annotator });
      } else {
        // Password doesn't match
        res.status(401).json({ success: false, message: 'Invalid password' });
      }
    } else {
      // User doesn't exist
      res.status(401).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

module.exports = router;