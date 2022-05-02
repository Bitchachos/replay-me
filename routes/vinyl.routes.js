const User = require("../models/User.model");
const Vinyl = require("../models/Vinyl.model");

const router = require("express").Router();

// CREATE vinyl ad - GET
router.get("/vinyl/create", (req, res, next) => {
    //res.send("dani is a smart boi")
    res.render("vinyl/vinyl-create")
})

// CREATE - process vinyl form
router.post("/vinyl/create", (req, res, next) => {

    const newVinyl = {
        album: req.body.album,
        artist: req.body.artist,
        year: req.body.year,
        genre: req.body.genre,
        condition: req.body.condition,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        // owner: req.body.owner // we have to reference it // tell browser owner = ad creator
    }

    Vinyl.create(newVinyl)
    .then( () => {
        res.redirect("/vinyl"); //redirect to vinyl list
    })
    .catch(err => {
        console.log("error adding vinyl", err);
        next(err);
    })
})

module.exports = router;