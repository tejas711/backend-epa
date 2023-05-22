const express = require("express");
const { updatelist,singleuser, dellist } = require("../controller/singleUser");
const router = express.Router();

router.put("/update/:id",updatelist)
router.get("/singleuser/:id",singleuser)
router.put("/delete-list/:id",dellist)
module.exports = router;