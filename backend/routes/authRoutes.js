import express from 'express';
const router = express.Router();
import { login, register } from '../controllers/authController.js';
// Add register only if you need to register from UI
router.post('/register', register);
router.post('/login', login);

export default router;