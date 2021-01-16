import express from 'express'
const router = express.Router()

import {createOrder, getOrders} from '../orders/orderController.js'

router.route("/").get(getOrders).post(createOrder)




export default router
