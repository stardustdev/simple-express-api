import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Create a new user
router.post('/', UserController.createUser);

// Get user by ID
router.get('/:id', UserController.getUserById);

// Update user
router.put('/:id', UserController.updateUser);

// Delete user
router.delete('/:id', UserController.deleteUser);

export default router;
