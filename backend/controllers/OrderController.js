import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//đặt order của user cho frontend

const placeOrder= async (req, res) => {

const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}})
        
        const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data:
                    {
                        name: item.name
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }))

            line_items.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Being delivered"  
                    },
                    unit_amount: 2*100*8
                },
                quantity:1 
            })

            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode : 'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            })

            res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Order failed"});
    }
}


const verifyOrder = async (req, res) => {
    const {orderId,success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success:true, message:"Payment successful"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false, message:"Payment failed"})  
    }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"An error occurred"});
    }

}

//Đặt món cho user frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"An error occurred"});
    }
}

//gọi danh sách cho admin
const listorders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"An error occurred"});
    }
}

//api cập nhật trạng thai đơn hàng
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success:true, message:"Update successful"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"An error occurred"});
    }
}

export {placeOrder, verifyOrder, userOrders, listorders,updateStatus};