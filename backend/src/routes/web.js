import express from "express";

import apiRoute from "./api/index.js";

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.use('/api', apiRoute);

export default router;