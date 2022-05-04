const Vinyl = require("../models/Vinyl.model");

module.exports = (req, res, next) => {
    const id = req.params.vinylId;

    Vinyl.findById(id)
    .populate("owner")
    .then( (vinyl) => {
       if (req.session.user._id === vinyl.owner._id.toString()) next(); 
      else res.redirect("/");
    })
    }
  