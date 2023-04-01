import express from "express";

const houseRoute = express.Router();

import HouseController from "../../controllers/api/HouseController.js";
import Uploads from "../../middleware/uploads.js";
import house from "../../models/House.js";

let houseInstance = new HouseController();

let fp = new Uploads();
let upload = fp.fileUpload('uploads/houses/');

houseRoute.get("/", houseInstance.index);
houseRoute.post("/", upload.array('images', 100), houseInstance.store);
houseRoute.get("/show/:id", houseInstance.show);
houseRoute.put("/update/:id", houseInstance.update);
houseRoute.delete("/delete/:id", houseInstance.destroy);
houseRoute.get('/login-house/', houseInstance.loginHouse)
houseRoute.get("/house-gallery/:id", houseInstance.houseGalleryIndex);
houseRoute.post("/house-gallery", upload.array('images', 100), houseInstance.addBookImage);
houseRoute.post("/house-rating", houseInstance.addHouseRating);
houseRoute.post("/house-review", houseInstance.addHouseReview);
houseRoute.get("/house-search/:criteria", houseInstance.searchHouse);
houseRoute.post("/book-house", houseInstance.bookHouse);
houseRoute.get("/booked-houses-list/:id", houseInstance.getBookOrderList);


export default houseRoute;