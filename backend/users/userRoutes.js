import express from 'express';
import {registerUser, loginUser, getUserById} from './userController.js'
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getUserById)



export default router
