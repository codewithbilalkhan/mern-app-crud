const express = require('express');
const connectDB = require('./database');
const bookRouter = require('./routes/book.routes');

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World');

})

app.use('/book', bookRouter)

app.listen(8000, ()=>{
    console.log('Server is running on port 8000');

   
})