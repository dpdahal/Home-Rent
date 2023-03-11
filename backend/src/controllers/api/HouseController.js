import House from "../../models/House.js";
import HouseGallery from "../../models/HouseGallery.js";
import Auth from "../../middleware/auth.js";
import User from "../../models/User.js";
import fs from "fs";
import HouseRating from "../../models/HouseRatings.js";

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

        houseData.forEach((house) => {
            house.gallery.forEach((image) => {
                image.image = process.env.BASE_URL + "/uploads/houses/" + image.image;
            });
        });
        houseData = houseData.map((house) => {
            house.ownerId = house.user[0].name;
            return house;
        });
        houseData = houseData.map((house) => {
            house.ownerId = house.user[0]._id;
            return house;
        });


        houseData = houseData.map((house) => {
            delete house.user;
            return house;
        });


        houseData = houseData.map((house) => {
            if (house.gallery.length > 0) {
                house.image = house.gallery[0].image;
            } else {
                house.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            return house;
        });
        houseData = houseData.map((house) => {
            if (house.gallery.length > 0) {
                delete house.gallery;
            }
            return house;
        });
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
        let houseId = req.params.id;
        houseData = houseData.filter((house) => {
            house.compareId = house._id.toString();
            return house.compareId === houseId;
        });

        houseData.forEach((house) => {
            house.gallery.forEach((image) => {
                image.image = process.env.BASE_URL + "/uploads/houses/" + image.image;
            });
        });
        houseData = houseData.map((house) => {
            house.ownerName = house.user[0].name;
            return house;
        });
        houseData = houseData.map((house) => {
            house.ownerId = house.user[0]._id;
            return house;
        });

        houseData = houseData.map((house) => {
            delete house.user;
            return house;
        });

        houseData = houseData.map((house) => {
            if (house.gallery.length > 0) {
                house.image = house.gallery[0].image;
            } else {
                house.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            return house;
        });

        houseData = houseData.shift();

        let houseRating = await HouseRating.aggregate(
            [
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
                },


            ]);
        houseRating = houseRating.filter((rating) => {
            rating.houseId = rating.houseId.toString()
            return rating.houseId === houseId;
        });
        houseRating = houseRating.map((rating) => {
            rating.userName = rating.user[0].name;
            if (rating.user[0].image) {
                rating.userImage = process.env.BASE_URL + "/uploads/users/" + rating.user[0].image;
            } else {
                rating.userImage = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            return rating;
        });

        houseRating = houseRating.map((rating) => {
            // delete rating.user;
            return rating;
        });
        houseData.houseRatingsData = houseRating;
        console.log(houseData)

        res.json({house: houseData});

    }

    async update(req, res) {
        let houseId = req.params.id;
        await House.findOneAndUpdate({_id: houseId}, {$set: {...req.body}});
        res.status(200).json({success: "House updated"});
    }

    async destroy(req, res) {
        let houseId = req.params.id;
        let totalFindData = await HouseGallery.find({houseId: houseId}).countDocuments();
        if (totalFindData) {
            let findImage = await HouseGallery.find({houseId: houseId});
            let totalImageDelete = 0;
            findImage.map(async (image) => {
                let filePath = process.cwd() + "\\public\\uploads\\houses\\" + image.image;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    await HouseGallery.deleteOne({houseId: houseId});
                    totalImageDelete++;
                } else {
                    await HouseGallery.deleteOne({houseId: houseId});
                    totalImageDelete++;
                }
            });
            if (totalImageDelete === totalFindData) {
                await House.findByIdAndDelete(houseId);
                res.status(200).json({success: "House deleted successfully"});
            } else {
                await House.findByIdAndDelete(houseId);
                res.status(200).json({success: "House deleted successfully"});
            }
        } else {
            await House.findByIdAndDelete(houseId);
            res.status(200).json({success: "House deleted successfully"});
        }
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

        if (req.files) {
            req.files.map(async (file) => {
                let houseId = req.body.houseId;
                await HouseGallery.create({houseId: houseId, image: file.filename});
            });
        }
        let houseImages = await HouseGallery.find({houseId: req.body.houseId});
        res.status(200).json({houseImages: houseImages, success: "Image is inserted"});
    }

    async loginHouse(req, res) {

        let token = req.headers.authorization;
        let ojb = Auth.verifyToken(token);
        let loginUser = await User.findById(ojb.id);


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
            book.ownerId = book.user[0].name;
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
        if (loginUser.role !== "admin") {
            houseData = houseData.filter((book) => {
                return book.ownerId.toString() === loginUser._id.toString();
            });

        }

        res.json({house: houseData});
    }

    async addHouseRating(req, res) {
        let houseId = req.body.houseId;
        let userId = req.body.userId;
        let rating = req.body.rating;
        let checkBookRating = await HouseRating.find({houseId: houseId, userId: userId}).countDocuments();
        if (checkBookRating > 0) {
            await HouseRating.findOneAndUpdate({houseId: houseId, userId: userId}, {$set: {rating: rating}});
            res.status(200).json({success: "house rating success"});
        } else {
            await HouseRating.create({...req.body});
            res.status(200).json({success: "house rating success"});
        }
    }

    async addHouseReview(req, res) {
        let houseId = req.body.houseId;
        let userId = req.body.userId;
        let review = req.body.review;
        let checkBookReview = await HouseRating.find({houseId: houseId, userId: userId}).countDocuments();
        if (checkBookReview > 0) {
            await HouseRating.findOneAndUpdate({houseId: houseId, userId: userId}, {$set: {review: review}});
            res.status(200).json({success: "house review success"});
        } else {
            await HouseRating.create({...req.body});
            res.status(200).json({success: "house review success"});
        }
    }
}

export default HouseController;

