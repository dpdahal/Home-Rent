import express from "express";
import UserController from "../../controllers/api/UserController.js";
import Uploads from "../../middleware/uploads.js";

const userRoute = express.Router();

const userInstance = new UserController();

let upload = new Uploads();
let filesUploads = upload.fileUpload('uploads/users');


userRoute.get("/", userInstance.index);
userRoute.post("/", filesUploads.single('image'), userInstance.store);
userRoute.put("/", filesUploads.single('image'), userInstance.update);
userRoute.get("/:id", userInstance.show);
userRoute.delete("/:id", userInstance.delete);
userRoute.post('/change-password', userInstance.changePassword);
userRoute.get('/user-search/:id', userInstance.searchUser);

export default userRoute;

