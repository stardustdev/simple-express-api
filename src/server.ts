import express, { Request, Response, NextFunction } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as mongoose.ConnectOptions);

// User Interface
interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

// User Schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);

// GET endpoint for retrieving user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    // Validate ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Find user by ID and age > 21
    const user = await User.findOne({
      _id: req.params.id,
      age: { $gt: 21 }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found or age requirement not met' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
