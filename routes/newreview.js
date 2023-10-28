const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview , isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController =require("../controller/review.js");
const review = require("../models/review.js");


//post reviews
router.post("/",
    isLoggedIn,
    validateReview, 
    wrapAsync
    (reviewController.createReview )
)


//delete route

router.delete(
    "/:reviewId",
    isLoggedIn, 
    isAuthor, 
    wrapAsync
     (reviewController.deleteReviews)
);


module.exports = router;