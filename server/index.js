const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const cors = require('cors')

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tutorialgraphql.zci0l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}

connectDB();

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));