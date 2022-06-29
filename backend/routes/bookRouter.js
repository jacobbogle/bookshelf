//create router
const express = require('express');
let router = express.Router();

const bookClass = require("../modules/bookModel")


router.get("", async (request, response) => {
    const bookObject = await new bookClass({
      image: "https://images-na.ssl-images-amazon.com/images/I/51AeBkt5xaL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
      link: "https://www.amazon.com/Bone-Witch-Rin-Chupeco/dp/1492635820?_encoding=UTF8&qid=1655411368&sr=8-1&linkCode=ll1&tag=ggfiction-20&linkId=5241d5365750a87f831b6def8e31bb0d&language=en_US&ref_=as_li_ss_tl",
      title: "The Bone Witch",
      series: "The Bone Witch Trilogy (Book 1)",
      author: "Rin Chupeco",
      description: `<b>A story of scorned witches, sinister curses, and resurrection, The Bone Witch is the start of a dark fantasy trilogy, perfect for fans of Serpent & Dove and The Cruel Prince.</b><br><br>

      Tea can raise the dead, but resurrection comes at a price...<br><br>

      When Tea accidentally resurrects her brother, Fox, from the dead, she learns she is different from the other witches in her family. Her gift for necromancy means that she's a bone witch, a title that makes her feared and ostracized by her community. But Tea finds solace and guidance with an older, wiser bone witch, who takes Tea and her brother to another land for training.<br><br>

      In her new home, Tea puts all her energy into becoming an asha―one who can wield elemental magic. But dark forces are approaching quickly, and in the face of danger, Tea will have to overcome her obstacles...and make a powerful choice.<br><br>

      <b>Riveting and atmospheric, The Bone Witch is perfect for readers looking for:</b><br><br>

      <b>* Witch novels for adults and teens</b><br>
      <b>* Stories with diverse representation and multicultural influences</b><br>
      <b>* Dark fantasy YA books and series</b><br>
      <b>* Original worldbuilding and captivating writing</b><br><br>

      The Bone Witch Trilogy:<br><br>

      The Bone Witch (Book 1)<br>

      The Heart Forger (Book 2)<br>

      The Shadowglass (Book 3)`
    });
  
    try {
      response.send(bookObject);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = router