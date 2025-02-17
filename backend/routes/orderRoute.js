import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder ,userOrders,listorders,updateStatus} from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrders);
orderRouter.get("/list",listorders);
orderRouter.post("/status",updateStatus);

export default orderRouter;