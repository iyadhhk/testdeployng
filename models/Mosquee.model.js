const mongoose = require("mongoose");
const mosqueeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nomMosquee: String,
    adresse: String,
    //new
    street: String,
    area: String,
    plus_code: String,
    business_categories: String,
    claimed_google_my_business: String,
    telephone1: String,
    telephone: String,
    email: { type: String, unique: true },
    facebook: String,
    google_search_url: String,
    linkedin_url: String,
    twitter_url: String,
    instagram_url: String,
    youtube_url: String,
    pinterest_url: String,
    facebook_pixel: String,
    google_manager: String,
    google_analytics: String,
    domain: String,
    average_rating: String,
    count_reviews: String,
    imageUrl: String,
    ouvertureMosquee: String,
    commentaire: String,
    imamMosquee: String,
    nomGestionnaire: String,
    sallePriereFemmes: String,
    mosqueeSallePriere: String,
    fermetureExeptionnelle: String,

    evenements: [{ evenementDescription: String, date: String }],
    siteWeb: String,
    associationMosquee: String,
    lat: String,
    lng: String,
    openingHours: String,
    municipality: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mosquee", mosqueeSchema);
