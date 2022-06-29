<template>
    <div class="book-recommend">
      <div ref="bookBox" class="book-box">
            <img class="bookImage" :src="image" alt="The-Bone-Witch">
        </div>

        <div ref="bookContent" class="book-content" style=" visibility: hidden;">
          <div class="text-content">
            <h2>{{title}}</h2><!-- Book Title -->
            <h3>{{series}}</h3><!-- Book Series Name -->
            <h4>By: {{author}}}}</h4><!-- Author's Name -->
            <a ref="amazon" class="Amazon" :href="link" target="_blank" rel="noopener noreferrer">Amazon Link</a><!-- Product Link -->
            <p>
            <b>A story of scorned witches, sinister curses, and resurrection, The Bone Witch is the start of a dark fantasy trilogy, perfect for fans of Serpent & Dove and The Cruel Prince.</b><br><br>

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

            The Shadowglass (Book 3)
            </p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    
    return {
      isBookContentOpen: false,
      book: null,
      image: null,
      link: null,
      title: null,
      series:null,
      author: null,
      description: null
    };
  },
  methods: {
    openBookContent() {
      this.$emit('openBookContent');
      this.isBookContentOpen = true;
      if (window.innerWidth <= 684) {
        this.$refs.bookContent.style.height = '390px';
      } else {
        this.$refs.bookContent.style.width = '256px';
      }
      this.$refs.bookContent.style.visibility = "visible";
      this.$refs.amazon.style.visibility = "visible";
      //this.$refs.bookContent.style.paddingLeft = '10px';
    },
    closeBookContent() {
      this.isBookContentOpen = false;
      this.$emit('closeBookContent');
      if (window.innerWidth <= 684) {
        this.$refs.bookContent.style.width = '256px';
        this.$refs.bookContent.style.height = '0px';
      } else {
      this.$refs.bookContent.style.width = '0px';
      }
      //this.$refs.bookContent.style.paddingLeft = '0px';
      this.$refs.amazon.style.visibility = "hidden";
      this.$refs.bookContent.style.visibility = "hidden";
    },
    documentClick(e) {
      let book = this.$refs.bookBox;
      let bookCont = this.$refs.bookContent;
      let target = null;
      if (e && e.target) {
        target = e.target;
      }
      if (
        !book.contains(target) &&
        !bookCont.contains(target)
      ) {
        this.closeBookContent();
      } else if (
        book.contains(target)
      ) {
        if (this.isBookContentOpen === false) {
          this.openBookContent();
        } else if (this.isBookContentOpen === true) {
          this.closeBookContent();
        }
      }
    },
  },
  created: function() {
    document.addEventListener('click', this.documentClick);
  },
  unmounted: function() {
    document.removeEventListener('click', this.documentClick);
  },
  mounted: async function() {
    try{
      let response = await fetch(`http://192.168.1.144:3000/books`);
      let book = await response.json()
      console.log(book)
      this.book = book
      this.image = book.image
      this.link = book.link
      this.title = book.title
      this.series = book.series
      this.author = book.author
      this.description = book.description
    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }
};
</script>

<style scoped>
* {
  border-radius: 10px;
}

b {
    margin: 0px;
}

p {
  padding: 0px;
  font-size: medium;
}

img {
  -webkit-user-drag: none;
  width: 236px;
  height: 370px;
}

.text-content {
  padding-left: 10px;
}

.book-content::-webkit-scrollbar {
  width: 15px;
  height: 18px;
}

.book-content::-webkit-scrollbar-thumb {
  height: 6px;
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  background-image: linear-gradient(to bottom right, 
    rgb(14, 14, 27), rgb(39, 37, 58));
  border-radius: 10px;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.18),
    inset 1px 1px 0px rgba(0, 0, 0, 0.18);
}

.book-content::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}

.book-content::-webkit-scrollbar-corner {
  background-color: transparent;
}

.book-recommend> div {
    margin: 0;
}

.book-recommend {
    display: flex;
}

.book-box {
    width: auto;
    padding: 10px 10px;
    max-height: 370px;
    box-shadow: 10px 15px 15px rgb(0, 0, 0);
    background-color: rgb(66, 66, 66);
    transition: .4s ease-in-out;
}

.book-content {
    overflow: auto;
    overflow-x: hidden;
    transition: 1.2s ease-in-out;
    box-shadow: 10px 15px 15px black;
    background-image: linear-gradient(to bottom right, 
    rgb(201, 201, 201), rgb(187, 187, 187));
    box-shadow: 10px 15px 15px black;
    color: black;
    height: 390px;
    width: 0px;
}

.book-content a {
    text-decoration: none;
    color: rgb(240, 240, 240);
    background-color: rgb(17, 17, 26);
    padding: 5px 5px;
    transition: .3s;
}

.book-content a:hover {
    background-color: rgb(10, 126, 210);
}

.book-box:hover {
    background-color: rgb(171, 171, 171);
    cursor: pointer;
}

@media only screen and (max-width: 684px) {
  .book-recommend {
    flex-direction: column;
  }

  .book-content {
    height: 0px;
    width: 256px;
  }
}
</style>