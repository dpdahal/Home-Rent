import express from "express";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const ckEditorRoute = express.Router();

/*
========================Update user profile========================
 */
let imageName;
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/uploads/editors/');
//     },
//
//     filename: function (req, file, cb) {
//         let fileName = file.originalname.trim();
//         console.log(file)
//         imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
//         cb(null, imageName)
//     }
// })
//
// const upload = multer({storage: storage})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/uploads/editors/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
/*
========================Een Update user profile========================
 */

ckEditorRoute.get("/:id", (req, res) => {
    let filePath = process.env.BASE_URL + "/uploads/editors/" + imageName;
    res.json({filename: imageName, filePath: filePath});
});

ckEditorRoute.post("/", upload.single('image'), (req, res) => {
    console.log(req.file.filename)
    let filePath = process.env.BASE_URL + "/uploads/editors/" + imageName;
    res.json({filename: imageName, filePath: filePath});
});



export default ckEditorRoute;

