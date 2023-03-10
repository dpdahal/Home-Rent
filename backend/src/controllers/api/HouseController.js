import House from "../../models/House.js";
import HouseGallery from "../../models/HouseGallery.js";

class HouseController {
    async index(req, res) {
        let houseData = await House.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "ownerId",
                    foreignField: "_id",
                    as: "user"
                },
            },

            {
                $lookup: {
                    from: "housegalleries",
                    foreignField: "houseId",
                    localField: "_id",
                    as: "gallery"
                }
            },


        ]);

        houseData.forEach((book) => {
            book.gallery.forEach((image) => {
                image.image = process.env.BASE_URL + "/uploads/houses/" + image.image;
            });
        });
        houseData = houseData.map((book) => {
            book.postedBy = book.user[0].name;
            return book;
        });
        houseData = houseData.map((book) => {
            book.ownerId = book.user[0]._id;
            return book;
        });


        houseData = houseData.map((book) => {
            delete book.user;
            return book;
        });


        houseData = houseData.map((book) => {
            if (book.gallery.length > 0) {
                book.image = book.gallery[0].image;
            } else {
                book.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            return book;
        });
        houseData = houseData.map((book) => {
            if (book.gallery.length > 0) {
                delete book.gallery;
            }
            return book;
        });
        console.log(houseData)
        res.json({house: houseData});
    }

    async store(req, res) {
        let house = await House.create({...req.body});
        if (req.files) {
            req.files.map(async (file) => {
                await HouseGallery.create({houseId: house._id, image: file.filename});
            });
        }
        res.status(200).json({success: "House created successfully"});
    }

    async show(req, res) {
        let houseData = await House.findById(req.params.id)
            .populate("ownerId", "name");
        res.json({house: houseData});
    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }

    async houseGalleryIndex(req, res) {
        let houseId = req.params.id;
        let houseGalleryData = await HouseGallery.find({houseId: houseId});
        houseGalleryData.forEach((image) => {
            if (image.image) {
                image.image = process.env.BASE_URL + "/uploads/houses/" + image.image;
            } else {
                image.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
        });
        res.json({houseImages: houseGalleryData});

    }

    async addBookImage(req, res) {
        let houseImages;
        if (req.files) {
            req.files.map(async (file) => {
                let houseId = req.body.houseId;
                houseImages = await HouseGallery.create({houseId: houseId, image: file.filename});
            });
        }
        res.status(200).json({houseImages: houseImages, success: "Image is inserted"});
    }
}

export default HouseController;