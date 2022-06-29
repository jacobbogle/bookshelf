export default {
    data() {
      return {
        URL: null,
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
    mounted:
     async function() {
      try{
        let response = await fetch("http://localhost:3000/books");
        let book = await response.json()
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