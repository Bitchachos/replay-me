const { Schema, model } = require("mongoose");

const vinylSchema = new Schema(
  {
    album: String,
    artist: String,
    year: Number,
    genre: String,
      // enum: ["pop", "rock", "indie", "jazz", "metal", "country"]
    condition: {
      type: String,
      enum: ["new", "used"]
    },
    description: String,
    price: Number,
    image: {
      type: String,
      default: "../images/default-vinyl.jpeg"
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
