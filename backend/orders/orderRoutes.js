import express from 'express'
const router = express.Router()

import {createOrder} from '../orders/orderController.js'

router.route("/").get(getOrders).post(createOrder)




export default router
