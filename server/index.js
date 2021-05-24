const express = require('express');
const cors = require('cors');

const app = express();
const posts = require('./routes/api/posts.js');
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.use('/api/posts', posts)
app.listen(port, () => {
    console.log(`Servidor inciado! Porta: ${port}`)
})