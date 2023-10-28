const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateLising} =  require("../middleware.js");
const listingController = require("../controller/listings.js");

const multer  = require('multer')
const {storage }= require("../cloudConfig.js")
const upload = multer({ storage})

router.route("/")
.get( wrapAsync (listingController.index))
.post(
     isLoggedIn,
    //  validateLising,
     upload.single('listing[image]'),
     wrapAsync
    ( listingController.createListing));


    //new route
router.get("/new", isLoggedIn, listingController.renderNewFrom);

router.route("/:id")
.get( wrapAsync( listingController.showListing ))
.put(
     isLoggedIn,
     isOwner,
     upload.single('listing[image]'),
     validateLising,
    wrapAsync (listingController.updateListings))
    .delete( isLoggedIn, isOwner,
wrapAsync (listingController.destroyListings));

//edit route 
router.get("/:id/edit" ,  isLoggedIn, isOwner, wrapAsync (listingController.editListing));


module.exports = router;