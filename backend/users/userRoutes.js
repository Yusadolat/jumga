import express from 'express';
import {registerUser, loginUser, getUserById, updateUser} from './userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getUserById).put(protect, updateUser)



export default router;