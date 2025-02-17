import express from 'express';
import { addToCart, getCart,removeProduct } from '../controllers/CartController.js';
import authMiddleware from '../middleware/auth.js';
const cartRouter = express.Router();

cartRouter.post('/AddtoCart',authMiddleware ,addToCart)
cartRouter.post('/RemoveProduct',authMiddleware  , removeProduct)
cartRouter.post('/GetCart',authMiddleware ,getCart)

export default cartRouter;
