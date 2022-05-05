const { Schema, model } = require("mongoose");
const { default: mongoose } = require("mongoose");

const vinylSchema = new Schema(
  {
    album: String,
    artist: String,
    year: Number,
    genre: {
      type: String,
      enum: ["Pop", "Rock", "Indie", "Jazz", "Metal", "Country"]
    },
    condition: {
      type: String,
      enum: ["New", "Used"]
    },
    description: String,
    price: Number,
    image: {
      type: String,
      default: "https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Vinyl = model("Vinyl", vinylSchema);

module.exports = Vinyl;
