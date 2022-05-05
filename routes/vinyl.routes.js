const isLoggedIn = require("../middleware/isLoggedIn");
const isOwner = require("../middleware/isOwner");
const User = require("../models/User.model");
const Vinyl = require("../models/Vinyl.model");
const mongoose = require("mongoose");
const fileUploader = require('../config/cloudinary.config');

const router = require("express").Router();

// CREATE vinyl ad - GET
//router.get("/vinyl/create", (req, res, next) => {
router.get("/vinyl/create", isLoggedIn, (req, res, next) => {
    res.render("vinyl/vinyl-create")
})

// CREATE - process vinyl form
//router.post("/vinyl/create", (req, res, next) => {
router.post("/vinyl/create", isLoggedIn, fileUploader.single('vinyl-cover-image'), (req, res, next) => {

    const newVinyl = {
        album: req.body.album,
        artist: req.body.artist,
        year: req.body.year,
        genre: req.body.genre,
        condition: req.body.condition,
        description: req.body.description,
        price: req.body.price,
        image: req.file.path,
        owner: req.session.user

        // owner: req.session.user OR req.user
        //image: req.body.image, // req.file.path
        
    }

    Vinyl.create(newVinyl)
    .then( () => {
        res.redirect("/vinyl");
    })
    .catch(err => {
        console.log("error adding vinyl", err);
        next(err);
    })
});

// READ - show vinyl list
router.get("/vinyl", (req, res, next) => {
    Vinyl.find()
    .populate("owner")
    .then( (vinylArr) => {
        res.render("vinyl/vinyl-list", { vinyl : vinylArr});
    })
    .catch(err => {
        console.log("error adding vinyl", err);
        next(err);
    })
})


// READ - vinyl details
router.get("/vinyl/:vinylId", (req, res, next) => {
    const id = req.params.vinylId;
    let ownerUser = false

    Vinyl.findById(id)
    .populate("owner")
    .then( (vinylDetails) => {
        if(req.session.user._id === vinylDetails.owner._id.toString()) {ownerUser = true}
        res.render("vinyl/vinyl-details", {vinylDetails, ownerUser})
    })
    .catch(err => {
        console.log("error displaying details", err);
        next(err);
    })
})


// UPDATE vinyl - display form
router.get("/vinyl/:vinylId/edit", isLoggedIn, isOwner, (req, res, next) => {
    const id = req.params.vinylId;
    // req.session.user._id === vinyl.owner._id.toString()
    let ownerUser = false
    Vinyl.findById(id)
    .then( (vinylDetails) => {
        if(req.session.user._id === vinylDetails.owner._id.toString()) {ownerUser = true}
        console.log({vinylDetails, ownerUser});
        res.render("vinyl/vinyl-edit", {vinylDetails, ownerUser})
    })
    .catch(err => {
        console.log("error editing details", err);
        next(err);
    })
})

// UPDATE vinyl - process form
router.post("/vinyl/:vinylId/edit", isLoggedIn, isOwner, (req, res, next) => {
    const id = req.params.vinylId;

    const newVinyl = {
        album: req.body.album,
        artist: req.body.artist,
        year: req.body.year,
        genre: req.body.genre,
        condition: req.body.condition,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
    }

    Vinyl.findByIdAndUpdate(id, newVinyl)
    .then( () => {
        res.redirect(`/vinyl/${id}`)
    })
    .catch(err => {
        console.log("error showing updated details", err);
        next(err);
    })
})


// DELETE - delete vinyl
router.post("/vinyl/:vinylId/delete", isLoggedIn, isOwner, (req, res, next) => {
    const id = req.params.vinylId;

    Vinyl.findByIdAndDelete(id)
    .then( () => {
        res.redirect("/vinyl");
    })
    .catch(err => {
        console.log("error deleting vinyl", err);
        next(err);
    })
})

module.exports = router;