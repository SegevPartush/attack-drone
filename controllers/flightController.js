const { Flight } = require("../models/Flight");
const { Order } = require("../models/Order");
const { TwitterApi } = require('twitter-api-v2');

const flightView = async (req, res) => {
  const purchases = await Order.find({ user: req.user._id })
    .populate({
      path: "product",
      select: {
        _id: 1,
        name: 1,
        detail: 1,
        stock: 1,
        price: 1,
        productImg: 1,
      },
    })
    .select("-__v");

  res.render("lastFlight", {
    items: purchases,
    status: "",
  });
};

const flightAdd = async (req, res) => {
  const flightData = {
    date: req.body.date,
    item: req.body.item,
    duration: req.body.duration,
    location: req.body.format_address,
    comment: req.body.comment,
    user: req.user._id,
  };

  // Constructing the tweet message
  const tweetMessage = `New Flight Details: Date - ${flightData.date}, Item used - ${flightData.item}, Duration - ${flightData.duration}, Location - ${flightData.location}, Pilot Comment - ${flightData.comment}.`;

  try {
    // Create flight record in the database
    const flight = await Flight.create(flightData);

    // Initialize Twitter API client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_KEY_SECRET,
      accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
    });

    // Post tweet
    const tweet = await client.v2.tweet(tweetMessage);

    return res.send({
      status: "success",
      message: "The Flight data created and tweeted successfully!",
      tweet, // Optionally include tweet details
    });
  } catch (error) {
    console.error('Error posting tweet:', error); // Log the error for debugging
    return res.send({ status: "error", message: error.message });
  }
};

module.exports = {
  flightView,
  flightAdd,
};
