import express from 'express';
import {registerUser} from './userController.js'
const router = express.Router()


router.route('/').post(registerUser)


export default router
