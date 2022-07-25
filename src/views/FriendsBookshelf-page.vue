<template>
  <div id="wrapper">
    <h1>
      <span>{{ username }}</span
      >'s Bookshelf
    </h1>

    <div id="bookCollection">
      <div class="book-recommend" v-for="(book, index) in books" :key="index">
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
            <w-rating :model-value="book.rating" ref="rating"></w-rating>
            <!-- Book Series Name -->
            <h4>By: {{ book.authors }}</h4>
            <!-- Author's Name -->
            <w-flex justify-start>
              <w-button
                :value="`${index}`"
                ref="amazon"
                class="Amazon mr3"
                @click="openLink(book.link)"
                target="_blank"
                rel="noopener noreferrer"

              >
                Google <w-icon>mdi mdi-link</w-icon></w-button
              ><!-- Product Link -->
              <w-button @click="postBook(book)">
                Save Book<w-icon>mdi mdi-plus</w-icon>
              </w-button>
            </w-flex>
            <p v-html="book.description" :value="`${index}`"></p>
          </div>
        </div>
      </div>
    </div>

    <h1>Comments</h1>
    <div>
      <div id="comments" v-for="(post, i) in bookshelf.posts" :key="i">
        <w-flex>
          <i class="mr4">{{ bookshelf.posts[i].username }}:&nbsp; </i>
          <w-flex wrap>
            <p>{{ bookshelf.posts[i].comment }}</p>
          </w-flex>
        </w-flex>
        <w-flex justify-end>
          <w-button
            v-if="checkIfDeleteable(post)"
            @click="deletePost(bookshelf.posts[i]._id, bookshelf._id)"
          >
            Delete
            <w-icon>mdi mdi-delete</w-icon>
          </w-button>
        </w-flex>
      </div>
      <h1>Add a Comment</h1>
      <w-input
        bg-color="secondary"
        type="text"
        label="Leave A Comment"
        v-model="postInput"

      />
      <w-button @click="postPosts()">Add Comment</w-button>
    </div>
  </div>
</template>

<script>
import Search from "../models/search";
export default {
  name: "FriendsBookshelf",
  setup() {
    const { postBook, shuffle } = Search();
    return { postBook, shuffle };
  },

  data() {
    return {
      id: "",
      username: "",
      books: [],
      bookshelf: {},
      isBookOpen: false,
      IndexOfOpenedBook: null,
      postInput: "",
      currentUser: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.username = this.$route.params.name;
    this.getFriendsBooks();
    this.getFriendsBookshelf();
    this.getSession();
  },
  methods: {
    openLink(link) {
      window.open(link)
    },
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
      this.getFriendsBookshelf();
      this.postInput = "";
    },

    async getFriendsBookshelf() {
      let response = await fetch(
        `http://localhost:3000/bookshelves/${this.id}`,
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      this.bookshelf = data;
      console.log("friend's bookshelf data", data);
    },
    async getFriendsBooks() {
      let response = await fetch(
        `http://localhost:3000/bookshelves/books/${this.id}`,
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      this.books = data.listOfBooks;
      console.log("friends books: ", data);
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
      // this.$refs.amazon[index].style.visibility = "visible";
    },
    closeBookContent(index) {
      this.$emit("closeBookContent");
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.width = "256px";
        this.$refs.bookContent[index].style.height = "0px";
      } else {
        this.$refs.bookContent[index].style.width = "0px";
      }
      // this.$refs.amazon[index].style.visibility = "hidden";
      this.$refs.bookContent[index].style.visibility = "hidden";
    },
    closeAllBooks() {
      if (this.isBookOpen === true) {
        this.closeBookContent(this.IndexOfOpenedBook);
        this.isBookOpen = false;
      }
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
      this.getFriendsBookshelf();
    },

    async getSession() {
      let response = await fetch("http://localhost:3000/session", {
        credentials: "include",
      });
      if (response.status == 200) {
        console.log("LOGGED IN");
        let data = await response.json();
        this.currentUser = data.username;
        console.log("username: ", this.currentUser);
      }
    },

    checkIfDeleteable(post) {
      if (this.currentUser == post.username) {
        return true;
      }
    },
  },
};
</script>

<style scoped>
@import "../book-data/style.css";

h1 {
  margin-top: 50px;
  color: rgb(201, 201, 201);
}

#comments p {
  color: white;
}

i {
  color: #c9c9c9;
}

#getbooks {
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

#comments {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  min-width: 500px;
  max-width: 500px;
}
/* .book-buttons {
  display: flex;
  justify-content: space-evenly;
} */

/* .book-buttons button {
  background-color: #3f51b5;
  color: white;
  border-radius: 0;
  border: none;
  padding: 5px;
  cursor: pointer;
} */
</style>
