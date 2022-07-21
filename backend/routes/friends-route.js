const express = require("express");
const User = require("../schema/user-schema");

let router = express.Router();

router.get("", async (req, res) => {
  let friends;
  try {
    friends = await User.findOne({ _id: req.user.id });

    res.status(200).json(friends.friends);
  } catch (err) {
    res.status(500).json({
      message: "failure getting friends",
      error: err,
    });
  }
});

// this is for sending a friend request
// :id would be the user you are sending the friend request to
router.patch("/send/:id", async (req, res) => {
  let possibleFriendID = req.params.id;
  if (!req.user) {
    res.status(401).json({
      message: "you gotta log in first kid",
    });
    return;
  }

  //trying to find the possible friend in the database
  let possibleFriend = {};
  let requestingUser = {};
  try {
    possibleFriend = await User.findOne({
      _id: possibleFriendID,
    });
  } catch (err) {
    res.status(500).json({
      message: "could not find possible friend",
      error: err,
    });
    return;
  }

  //trying to find yourself in the database
  try {
    requestingUser = await User.findOne({
      _id: req.user.id,
    });
  } catch (err) {
    res.status(500).json({
      message: "could not find you O_O",
      error: err,
    });
    return;
  }

  // updating possible friends friend status to 1 (a request was made to you)
  try {
    let object = await User.findByIdAndUpdate(
      possibleFriendID,
      {
        $push: {
          friends: {
            name: requestingUser.username,
            value: 1,
          },
        },
      },
      { new: true }
    );
    console.log(object);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "couldn't update possibleFriends status",
      error: err,
    });
    return;
  }

  try {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          friends: {
            name: possibleFriend.username,
            value: 2,
          },
        },
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "could not update your status",
      error: err,
    });
    return;
  }

  res.status(201).json(requestingUser);
});

module.exports = router;
