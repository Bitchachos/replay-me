const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Vinyl = require("../models/Vinyl.model");

const router = require("express").Router();

// CREATE vinyl ad - GET
router.get("/vinyl/create", (req, res, next) => {
    //res.send("dani is a smart boi")
    res.render("vinyl/vinyl-create")
})

// CREATE - process vinyl form
router.post("/vinyl/create", isLoggedIn, (req, res, next) => {
    console.log(req.body.image);
    const newVinyl = {
        album: req.body.album,
        artist: req.body.artist,
        year: req.body.year,
        genre: req.body.genre,
        condition: req.body.condition,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image, // req.file.path
        owner: req.session.user
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
    //.populate("owner")
    .then( (vinylArr) => {
        res.render("vinyl/vinyl-list", { vinyl : vinylArr});
    })
    .catch(err => {
        console.log("error adding vinyl", err);
        next(err);
    })
})


module.exports = router;