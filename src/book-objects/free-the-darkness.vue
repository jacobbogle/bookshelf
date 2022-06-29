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

<style src="./style.css" scoped>
</style>