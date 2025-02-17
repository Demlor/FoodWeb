import userModel from "../models/userModel.js"

//thêm vào giỏ hàng
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId );
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
            {
                cartData[req.body.itemId] = 1;
            }
            else{
                cartData[req.body.itemId] += 1;
            }
            await userModel.findByIdAndUpdate(req.body.userId, { cartData});   
            res.json({success:true, message:"Added to cart successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Failed to add to cart"});
    }
}

//xóa sản phẩm khỏi giỏ hàng
const removeProduct = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Product removed from cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to remove product from cart" });
    }
}

//lấy giỏ hàng
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById (req.body.userId);
        let cartData = userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Failed to retrieve cart"});
    }
}

export{ addToCart, removeProduct, getCart }