<template>
<div id="wrapper">
  <button id="getBooks" @click="getBooks()">getBooks</button>
  <div id="bookCollection">
    <div
      class="book-recommend"
      v-for="(book, index) in state.books"
      :key="index"
    >
      <div :value="`${index}`" ref="bookBox" class="book-box">
        <img
          ref="bookImage"
          :value="`${index}`"
          class="book-image"
          :src="`${book.image}`"
        />
      </div>
      <div
        :value="`${index}`"
        style="visibility: hidden"
        ref="bookContent"
        class="book-content"
      >
        <div :value="`${index}`" class="text-content">
          <h2>{{ book.title }}</h2>
          <!-- Book Title -->
          <h3>Rating: {{ numGive(book.rating) }}</h3>
          <!-- Book Series Name -->
          <h4>By: {{ book.authors }}</h4>
          <!-- Author's Name -->
          <a
            :value="`${index}`"
            ref="amazon"
            class="Amazon"
            :href="`${book.link}`"
            target="_blank"
            rel="noopener noreferrer"
            >Google Link</a
          ><!-- Product Link -->
          <p v-html="book.description" :value="`${index}`"></p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BookShelf from "../models/books";
export default {
  setup() {
    const { state, getBooks } = BookShelf();
    return { state, getBooks };
  },
  data() {
    return {
      isBookContentOpen: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      },
    };
  },
  methods: {
    textGive(text) {
      try {
        let goodText = text.join(" ");
        return goodText;
      } catch (error) {
        return "N/A";
      }
    },
    numGive(num) {
      try {
        if (num > 0) {
          return num + " // 5";
        } else {
          return "N/A";
        }
      } catch (error) {
        return "N/A";
      }
    },
    openBookContent(index) {
      this.$emit("openBookContent");
      this.isBookContentOpen[index] = true;
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.height = "390px";
      } else {
        this.$refs.bookContent[index].style.width = "256px";
      }
      this.$refs.bookContent[index].style.visibility = "visible";
      this.$refs.amazon[index].style.visibility = "visible";
      //this.$refs.bookContent.style.paddingLeft = '10px';
    },
    closeBookContent(index) {
      this.isBookContentOpen[index] = false;
      this.$emit("closeBookContent");
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.width = "256px";
        this.$refs.bookContent[index].style.height = "0px";
      } else {
        this.$refs.bookContent[index].style.width = "0px";
      }
      //this.$refs.bookContent.style.paddingLeft = '0px';
      this.$refs.amazon[index].style.visibility = "hidden";
      this.$refs.bookContent[index].style.visibility = "hidden";
    },
    documentClick(click) {
      try {
        let IndexOfClicked = click.target.__vnode.props.value;
        let book = this.$refs.bookBox[IndexOfClicked];
        let bookCont = this.$refs.bookContent[IndexOfClicked];
        let target = click.path[0];
        if (!book.contains(target) && !bookCont.contains(target)) {
          this.closeBookContent(IndexOfClicked);
        } else if (book.contains(target)) {
          if (this.isBookContentOpen[IndexOfClicked] === false) {
            this.openBookContent(IndexOfClicked);
          } else if (this.isBookContentOpen[IndexOfClicked] === true) {
            this.closeBookContent(IndexOfClicked);
          }
        }
      } catch (err) {
        console.log(err);
        for (let i = 0; i < 10; i++) {
          this.closeBookContent(i);
        }
      }
    },
  },
  created: function () {
    document.addEventListener("click", this.documentClick);
  },
  unmounted: function () {
    document.removeEventListener("click", this.documentClick);
  },
}
</script>

<style scoped>
@import "../book-objects/style.css";

#getBooks {

  align-self: center;
}


#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

#bookCollection {
    grid-column: 1/-1;
    grid-row: 2/3;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
}

#bookCollection > * {
  margin: .5rem;
}
</style>

