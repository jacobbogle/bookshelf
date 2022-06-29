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
      description: `"A high-fantasy Memoirs of a Geisha, Chupeco's latest excels in originality" ―Kirkus Reviews\n

      A story of\n scorned witches, sinister curses, and resurrection, The Bone Witch is the start of a dark fantasy trilogy, perfect for fans of Serpent & Dove and The Cruel Prince.
      
      Tea can raise the dead, but resurrection comes at a price...
      
      When Tea accidentally resurrects her brother, Fox, from the dead, she learns she is different from the other witches in her family. Her gift for necromancy means that she's a bone witch, a title that makes her feared and ostracized by her community. But Tea finds solace and guidance with an older, wiser bone witch, who takes Tea and her brother to another land for training.
      
      In her new home, Tea puts all her energy into becoming an asha―one who can wield elemental magic. But dark forces are approaching quickly, and in the face of danger, Tea will have to overcome her obstacles...and make a powerful choice.
      
      Riveting and atmospheric, The Bone Witch is perfect for readers looking for
      
      witch novels for adults and teens
      stories with diverse representation and multicultural influences
      dark fantasy YA books and series
      original worldbuilding and captivating writing
      Praise for The Bone Witch:
      
      "A fantasy lover's fantasy" ―Foreword Reviews
      
      "Mesmerizing. Chupeco (The Suffering) does a magnificent job of balancing an intimate narrative perspective with sweeping worldbuilding, crafting her tale within a multicultural melting pot of influences as she presses toward a powerful cliffhanger."―Publishers Weekly, STARRED Review
      
      "Chupeco delights us with a fascinating world and a rich atmosphere for a story that is exceptionally written from beginning to end."―Buzzfeed
      
      "Readers who enjoy immersing themselves in detail will revel in Chupeco's finely wrought tale. Game of Thrones fans may see shades of Daenerys Targaryen in Tea, as she gathers a daeva army to unleash upon the world. Whether she is in the right remains a question unanswered, but the ending makes it clear her story is only beginning." ―Booklist
      
      The Bone Witch Trilogy:
      
      The Bone Witch (Book 1)
      
      The Heart Forger (Book 2)
      
      The Shadowglass (Book 3)`
    });
  
    try {
      response.send(bookObject);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = router