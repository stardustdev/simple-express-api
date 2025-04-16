import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/user.routes';
import { connectDB } from './config/database';

const app = express();
const port = parseInt(process.env.PORT || '3000');

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
