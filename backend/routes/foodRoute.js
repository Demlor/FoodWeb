import express from "express"
import { addFood, listfood, removefood, editFood} from "../controllers/FoodController.js"
import multer from "multer"

const foodRouter = express.Router();

//kho lưu ảnh
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


//config các đường dẫn

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.post("/edit",upload.single("image"),editFood)
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removefood);



export default foodRouter;