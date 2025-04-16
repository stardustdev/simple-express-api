import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { UserModel } from '../models/user.model';

export class UserController {
  public static async createUser(req: Request, res: Response) {
    try {
      const { name, email, age } = req.body;

      // Validate required fields
      if (!name || !email || !age) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Validate age
      if (age <= 21) {
        return res.status(400).json({ error: 'User must be over 21 years old' });
      }

      const user = new UserModel({ name, email, age });
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static async getUserById(req: Request, res: Response) {
    try {
      // Validate ObjectId
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }

      // Find user by ID and age > 21
      const user = await UserModel.findOne({
        _id: req.params.id,
        age: { $gt: 21 },
      });

      if (!user) {
        return res
          .status(404)
          .json({ error: 'User not found or age requirement not met' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static async updateUser(req: Request, res: Response) {
    try {
      // Validate ObjectId
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }

      const { name, email, age } = req.body;

      // Validate age if provided
      if (age !== undefined && age <= 21) {
        return res.status(400).json({ error: 'User must be over 21 years old' });
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        { name, email, age },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    try {
      // Validate ObjectId
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }

      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
