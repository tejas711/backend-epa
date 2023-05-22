require("dotenv").config();
const router = require("express").Router();
const deleteUpdate = require("../middleware/deleteUpdate");
const { AllProposals, VendorProposals, NewProposal, deleteProposal, renderImage, editProposal, SingleProposal, SelectedProposals } = require("../controller/proposalController");
const upload = require("../middleware/proposalImageStorage");
const vendorAuth = require("../middleware/vendorAuthentication");

router.get("/", AllProposals);
router.get("/:id",SingleProposal);
router.get("/selected/:id", SelectedProposals);
router.get("/vendor/:id", vendorAuth, VendorProposals);
router.post("/",vendorAuth, upload.array("images"), NewProposal);
router.put("/:id",vendorAuth, upload.array("images"), deleteUpdate, editProposal);
router.delete("/:id",vendorAuth, deleteProposal);
router.get("/images/:name", renderImage);

module.exports = router;