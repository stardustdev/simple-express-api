import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.routes';
import { connectDB } from './config/database';
import { specs } from './config/swagger';

const app = express();
const port = parseInt(process.env.PORT || '3000');

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger Documentation
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(specs));

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
