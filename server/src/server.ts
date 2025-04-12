import express from 'express';
import http from 'http';
import { Server} from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import userRoutes from './api/routes/userRoutes';

//loading env vars
dotenv.config();

//connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? 'https://poker-game-client.vercel.app'
      : 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
  }
});

//middlewares
app.use(cors());
app.use(express.json());


//routes
app.use('/api/users', userRoutes);

//default route 
app.get('/', (req, res) => {
  res.send('Server is running...');
});

//socket.io connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
})

//start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
