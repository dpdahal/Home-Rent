import express from "express";

const houseRoute = express.Router();

import HouseController from "../../controllers/api/HouseController.js";
import Uploads from "../../middleware/uploads.js";

let houseInstance = new HouseController();

let fp = new Uploads();
let upload = fp.fileUpload('uploads/houses/');

houseRoute.get("/", houseInstance.index);
houseRoute.post("/", upload.array('images', 100), houseInstance.store);
houseRoute.get("/:id", houseInstance.show);
houseRoute.put("/:id", houseInstance.update);
houseRoute.delete("/:id", houseInstance.destroy);
houseRoute.get("/house-gallery/:id", houseInstance.houseGalleryIndex);
houseRoute.post("/house-gallery", upload.array('images', 100), houseInstance.addBookImage);



export default houseRoute;