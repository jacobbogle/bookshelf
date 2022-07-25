<template>
  <div id="wrapper">
    <h1>Public : {{ state.bookshelf.public }}</h1>
    <button @click="patchBookShelfPublic()">Make Public</button>
    <div id="bookCollection">
      <div
        class="book-recommend"
        v-for="(book, index) in state.books"
        :key="index"
      >
        <div
          :value="`${index}`"
          ref="bookBox"
          class="book-box"
          @click="bookClickHandler(index)"
        >
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
            <h3>Rating: {{ book.rating }}</h3>
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
            <a @click="deleteBook(book._id)"> DELETE BOOK</a>
            <p v-html="book.description" :value="`${index}`"></p>
          </div>
        </div>
      </div>
    </div>

    <h1>Comments</h1>
    <div>
      <div id="comments" v-for="(post, i) in state.bookshelf.posts" :key="i">
        <!-- <i>{{ bookshelf.posts[i].user.username }}:&nbsp; </i> -->
        <p>{{ state.bookshelf.posts[i].comment }}</p>
        <!-- TODO DELETE POSTS ON FRONT END ALSO CHECK TO IF ABLE TO DELETE FIRST -->
        <!-- v-if="checkIfDeleteable(post)" -->
        <button
          @click="deletePost(state.bookshelf.posts[i]._id, state.bookshelf._id)"
        >
          Delete
        </button>
      </div>
      <h1>Add A Comment</h1>
      <input type="text" placeholder="Leave A Comment" v-model="postInput" />
      <button @click="postPosts()">Add Comment</button>
    </div>
  </div>
</template>

<script>
import BookShelf from "../models/books";
export default {
  setup() {
    const { state, getBooks, deleteBook, getBookshelf } = BookShelf();
    return { state, getBooks, deleteBook, getBookshelf };
  },
  data() {
    return {
      isBookOpen: false,
      IndexOfOpenedBook: null,
      postInput: "",
    };
  },
  methods: {
    async postPosts() {
      let newPost = {
        comment: this.postInput,
        bookshelf_id: this.bookshelf._id,
      };
      let response = await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      console.log(data);
      this.getBookshelf();
    },
    bookClickHandler(index) {
      this.$emit("openBookContent");
      if (this.IndexOfOpenedBook != index && this.isBookOpen === false) {
        this.openBookContent(index);
        this.IndexOfOpenedBook = index;
        this.isBookOpen = true;
        this.IndexOfOpenedBook = index;
      } else if (this.IndexOfOpenedBook === index && this.isBookOpen === true) {
        this.closeBookContent(index);
        this.isBookOpen = false;
      } else if (
        this.IndexOfOpenedBook === index &&
        this.isBookOpen === false
      ) {
        this.openBookContent(index);
        this.isBookOpen = true;
      } else {
        try {
          this.closeBookContent(this.IndexOfOpenedBook);
          this.openBookContent(index);
          this.IndexOfOpenedBook = index;
        } catch (error) {
          null;
        }
      }
    },
    openBookContent(index) {
      this.$emit("openBookContent");
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.height = "390px";
      } else {
        this.$refs.bookContent[index].style.width = "256px";
      }
      this.$refs.bookContent[index].style.visibility = "visible";
      this.$refs.amazon[index].style.visibility = "visible";
    },
    closeBookContent(index) {
      this.$emit("closeBookContent");
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.width = "256px";
        this.$refs.bookContent[index].style.height = "0px";
      } else {
        this.$refs.bookContent[index].style.width = "0px";
      }
      this.$refs.amazon[index].style.visibility = "hidden";
      this.$refs.bookContent[index].style.visibility = "hidden";
    },
    closeAllBooks() {
      if (this.isBookOpen === true) {
        this.closeBookContent(this.IndexOfOpenedBook);
        this.isBookOpen = false;
      }
    },

    async patchBookShelfPublic() {
      let requestBody = {};
      if (this.state.bookshelf.public == true) {
        requestBody["public"] = false;
      } else {
        requestBody["public"] = true;
      }
      let response = await fetch("http://localhost:3000/bookshelves", {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      console.log(data);
      this.getBookshelf();
    },
    async deletePost(postID, bookshelfID) {
      let response = await fetch(
        `http://localhost:3000/posts/${postID}/bookshelf/${bookshelfID}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      let data = await response.json();
      console.log(data);
      this.getBookshelf();
    },
  },
  created: function () {
    this.getBooks();
    this.getBookshelf();
  },
};
</script>

<style scoped>
@import "../book-data/style.css";

p {
  color: white;
}
i {
  color: #c9c9c9;
}

#comments {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
#getBooks {
  align-self: center;
}

#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin: 0.5rem;
}
</style>
