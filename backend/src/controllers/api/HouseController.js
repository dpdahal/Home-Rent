import House from "../../models/House.js";
import HouseGallery from "../../models/HouseGallery.js";
import Auth from "../../middleware/auth.js";
import User from "../../models/User.js";
import fs from "fs";
import HouseRating from "../../models/HouseRatings.js";
import BookHouse from "../../models/BookHouse.js";
import Mail from "../../config/mail.js";

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

    async searchHouse(req, res) {
        let search = req.params.criteria;
        let houseData = await House.find({title: {$regex: search, $options: "i"}});
        res.status(200).json({house: houseData});
    }

    async bookHouse(req, res) {
        let houseId = req.body.houseId;
        let userId = req.body.userId;
        let totalHouse = await BookHouse.find({houseId: houseId, userId: userId}).countDocuments();
        if (totalHouse > 0) {
            res.status(200).json({success: "House already booked"});
        } else {
            BookHouse.create({...req.body}).then((data) => {
                res.status(200).json({bookingInfo: data});
            }).catch((err) => {
                res.status(400).json({error: "Something went wrong"});
            });
        }
    }

    async getBooking(req, res) {
        let id = req.params.id;
        console.log(id)
        BookHouse.findById(id).populate("houseId").populate("userId").then((book) => {
            return res.status(200).json({bookingData: book});
        });
    }

    async bookingConfirm(req, res) {

        let type = req.body.type;
        let bId = req.body.bookingId;
        if (type === 'confirm') {
            BookHouse.findByIdAndUpdate(bId, {paymentStatus: 'paid'}).then((book) => {
                return res.status(200).json({success: "Booking confirmed successfully"});
            }).catch((err) => {
                return res.json(err);
            });

        } else if (type === 'approved') {
            let approvedData = await BookHouse.findByIdAndUpdate(bId, {status: 'approved'});
            let id = approvedData._id;
            BookHouse.findById(id).populate("houseId").populate("userId").then((book) => {
                let roomType = book.houseId.title;
                let email = book.userId.email;
                let body = `Room Type: ${roomType} <br>  
                            Total Price: ${book.houseId.price} <br> 
                            Payment Status: ${book.paymentStatus}`;
                let mailObj = new Mail();
                mailObj.sendMail(process.env.EMAIL, email, "Booking Approved", body);
                return res.status(200).json({success: "Booking approved successfully"});

            });


        } else if (type === 'reject') {
            BookHouse.findByIdAndUpdate(bId, {status: 'reject'}).then((book) => {
                return res.status(200).json({success: "Booking reject successfully"});
            }).catch((err) => {
                return res.json(err);
            });

        } else {
            BookHouse.findByIdAndDelete(bId).then((book) => {
                return res.status(200).json({success: "Booking canceled successfully"});
            });
        }
    }

    async showOrderByLogin(req, res) {
        let token = req.headers.authorization;
        let ojb = Auth.verifyToken(token);
        let loginUser = await User.findById(ojb.id);
        if (loginUser.role === 'admin') {
            let bookingData = await BookHouse.find({}).populate("houseId").populate("userId");
            return res.status(200).json({bookingData: bookingData});
        } else if (loginUser.role === 'owner') {
            let bookingData = await BookHouse.find({ownerId: loginUser._id}).populate("houseId").populate("userId");
            return res.status(200).json({bookingData: bookingData});
        } else {
            let bookingData = await BookHouse.find({userId: loginUser._id})
                .populate("houseId")
                .populate("userId");
            return res.status(200).json({bookingData: bookingData});
        }

    }

}

export default HouseController;

