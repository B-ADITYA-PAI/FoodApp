const express = require('express');
const cors = require('cors'); // Add this line
const app = express();
const port = 5000;

app.use(cors({
  origin: 'https://vercel.com/b-aditya-pais-projects/frontend-mern'
}));

app.use(express.json());

const mongoDB = require("./db");
mongoDB();

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
