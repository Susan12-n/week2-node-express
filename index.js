const express = require('express');
const app = express();

const PORT = 3000;

// adding json parsing middleware
app.use(express.json());

// custom middleware for log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('MY WEEK TWO API!');

});


app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  res.json({ message: "User created", name, email });
});

// error handler for missing data
app.use((req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).send('Missing name or email');
  }
  next();
});

app.get('/User/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User Details for ID: ${userId}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

