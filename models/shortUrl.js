import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
);

// If you find any alternative to this then please change this fatty code.
let Url;

try {
  Url = mongoose.model('Url');
  console.log("hello sweety")
} catch (error) {
  if (error.name === 'MissingSchemaError') {
    console.log("hello darling")
    Url = mongoose.model('Url', shortUrlSchema);
  } else {
    throw error;
  }
}

// Url = mongoose.models.Url || mongoose.model('Url', shortUrlSchema);


export default Url;
