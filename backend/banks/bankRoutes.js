import express from 'express';
import {getBankList} from '../banks/bankControllers.js'
const router = express.Router()


router.route('/:country').get(getBankList)




export default router
