<template>
    <div class="book-recommend">
      <div ref="bookBox" class="book-box">
            <img  class="bookImage" src="../assets/images/free-the-darkness-kings-dark-tidings-book-1.jpg" >
        </div>

        <div ref="bookContent" class="book-content" style=" visibility: hidden;">
          <div class="text-content">
            <h2>Free the Darkness</h2><!-- Book Title -->
            <h3>King's Dark Tidings Book 1</h3><!-- Book Series Name -->
            <h4>By: Kel Kade</h4><!-- Author's Name -->
            <a ref="amazon" href="https://www.amazon.com/Free-Darkness-Kel-Kade-audiobook/dp/B01KIOOUGW?_encoding=UTF8&qid=&sr=&linkCode=ll1&tag=ggfiction-20&linkId=5ef676be0071abf9554ace5a881d4a7c&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer">Amazon Link</a><!-- Product Link -->
            <p><!-- Book Description -->
                A #1 Best Seller in Amazon's Epic Fantasy!<br><br>

                Raised and trained in seclusion at a secret fortress on the edge of the northern wilds of the Kingdom of Ashai, a young warrior called Rezkin is unexpectedly thrust into the outworld when a terrible battle destroys all that he knows. With no understanding of his life’s purpose and armed with masterful weapons mysteriously bestowed upon him by a dead king, Rezkin must travel across Ashai to find the one man who may hold the clues to his very existence.<br><br>

                Determined to adhere to his last orders, Rezkin extends his protection to an unlikely assortment of individuals he meets along the way, often leading to humorous and poignant incidents.<br><br>

                As if pursuing an elite warrior across a kingdom, figuring out who he is and why everyone he knows is dead, and attempting to find these so-called friends and protect them is not enough, strange things are happening in the kingdom. New dangers begin to arise that threaten not only Rezkin and his friends, but possibly everyone in Ashai.<br><br>

                This is the first installment of an ongoing series. This book is intended for adult readers. It contains graphic violence, creative language, and sexual innuendo. This book does not contain explicit sexual content.<br><br>

                KDT Series:<br>
                Book 1: Free the Darkness<br>
                Book 2: Reign of Madness<br>
                Book 3: Legends of Ahn<br>
                Book 4: Kingdoms and Chaos
            </p>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
      data() {
        
        return {
          isBookContentOpen: false
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