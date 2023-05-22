const express = require("express");
const router = express.Router();
const dpUpload = require("../middleware/profilePicStorage");
const { userLogin, userRegister, vendorLogin, vendorRegister, SingleVendor, vendorSecretCheck, userSecretCheck, vendorresetpassword, userresetPassword } = require("../controller/userController");
const { updateDpVendor, deleteDpVendor, deleteDpUser, updateDpUser, renderDp } = require("../controller/profilePicController");

router.post("/vendor/register", vendorRegister);
router.post("/vendor/login", vendorLogin);
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);

router.post("/vendor/secret-check", vendorSecretCheck);
router.post("/user/secret-check", userSecretCheck);

router.put("/vendor/password-reset", vendorresetpassword);
router.put("/user/password-reset", userresetPassword);

router.get("/vendor/:id", SingleVendor);

router.put("/vendor/:id",deleteDpVendor, dpUpload.single("profilePic"), updateDpVendor);
router.put("/user/:id",deleteDpUser, dpUpload.single("profilePic"), updateDpUser);
router.get("/profile-images/:name", renderDp);

module.exports = router;