<template>
    <div class="book-recommend">
      <div ref="bookBox" class="book-box">
            <img  class="bookImage" src="../assets/images/Ready-Player-One.jpg" >
        </div>

        <div ref="bookContent" class="book-content" style=" visibility: hidden;">
          <div class="text-content">
            <h2>Ready Player One</h2><!-- Book Title -->
            <h3 style="display: none;"></h3><!-- Book Series Name -->
            <h4>By: Ernest Cline</h4><!-- Author's Name -->
            <a ref="amazon" href="https://www.amazon.com/Ready-Player-One-Ernest-Cline/dp/030788743X?_encoding=UTF8&qid=1653157833&sr=1-1&linkCode=ll1&tag=ggfiction-20&linkId=fa67fa9c05d2ee6a829121f97314d737&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer">Amazon Link</a><!-- Product Link Change href -->
            <p><!-- Book Description -->
                <b>#1 NEW YORK TIMES BESTSELLER • Now a major motion picture directed by Steven Spielberg.</b><br><br>

                <b>“Enchanting . . . Willy Wonka meets The Matrix.”<br>—USA Today<br><br>
                “As one adventure leads expertly to the next, time simply evaporates.”<br>—Entertainment Weekly</b><br><br>
                
                A world at stake. A quest for the ultimate prize. Are you ready?<br><br>
                
                In the year 2045, reality is an ugly place. The only time Wade Watts really feels alive is when he’s jacked into the OASIS, a vast virtual world where most of humanity spends their days.<br><br>
                
                When the eccentric creator of the OASIS dies, he leaves behind a series of fiendish puzzles, based on his obsession with the pop culture of decades past. Whoever is first to solve them will inherit his vast fortune—and control of the OASIS itself.<br><br> 
                
                Then Wade cracks the first clue. Suddenly he’s beset by rivals who’ll kill to take this prize. The race is on—and the only way to survive is to win.<br><br>
                
                <b>NAMED ONE OF THE BEST BOOKS OF THE YEAR BY:<br> • Entertainment Weekly<br> • San Francisco Chronicle<br> • Village Voice<br> • Chicago Sun-Times<br> • iO9<br> • The AV Club</b><br><br>
                
                “Delightful . . . the grown-up’s Harry Potter.”—HuffPost<br><br>
                
                “An addictive read . . . part intergalactic scavenger hunt, part romance, and all heart.”—<b>CNN</b><br><br>
                
                “A most excellent ride . . . Cline stuffs his novel with a cornucopia of pop culture, as if to wink to the reader.”—<b>Boston Globe</b><br><br>
                
                “Ridiculously fun and large-hearted . . . Cline is that rare writer who can translate his own dorky enthusiasms into prose that’s both hilarious and compassionate.”—<b>NPR</b><br><br>
                
                “[A] fantastic page-turner . . . starts out like a simple bit of fun and winds up feeling like a rich and plausible picture of future friendships in a world not too distant from our own.”—<b>iO9</b>
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