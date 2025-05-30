require("dotenv").config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// connect DB
const connectDB = require('./db/connect')

// authenticate all routes in jobs.js c.
const authenticateUser = require('./middleware/authentication')

// routers -import auth.js and jobs.js from routes
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// routes - domains
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
}
start()