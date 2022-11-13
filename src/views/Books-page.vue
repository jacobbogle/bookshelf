<template>
  <div id="wrapper">
    <w-flex row justify-center align-center class="mt12" gap="3">
      <w-button lg v-if="state.bookshelf.public === true"  @click="patchBookShelfPublic()">Is Private</w-button>
      <w-button lg v-else  @click="patchBookShelfPublic()">Is Public</w-button>
      <w-button  lg v-show="viewComments === false" @click="viewComments = true">See Comments</w-button>
      <w-button lg  v-show="viewComments === true" @click="viewComments = false">See Books</w-button>
    </w-flex>
    

    <div id="bookCollection" v-show="viewComments === false">
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
          <div :value="`${index}`" class="text-content" >
            <h2>{{ book.title }}</h2>
            <!-- Book Title -->
            <w-rating :model-value="book.rating" ref="rating"></w-rating>
            <!-- Book Series Name -->
            <h4>By: {{ book.authors }}</h4>
            <!-- Author's Name -->
            <div class="book-buttons">
              <w-button
                :value="`${index}`"
                ref="amazon"
                class="Amazon mr3"
                @click="openLink(book.link)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google
                <w-icon>mdi mdi-link</w-icon></w-button
              ><!-- Product Link -->
              <w-button @click="deleteBook(book._id)" s>
                DELETE <w-icon>mdi mdi-delete</w-icon>
              </w-button>
            </div>
            <p v-html="book.description" :value="`${index}`"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="" v-show="viewComments === true">
      <h1>Comments</h1>
      <div>
        <div id="comments" v-for="(post, i) in state.bookshelf.posts" :key="i">
          <w-flex>
            <i class="mr4"> {{ state.bookshelf.posts[i].username }}:&nbsp; </i>
            <w-flex wrap>
              <p>{{ state.bookshelf.posts[i].comment }}</p>
            </w-flex>
          </w-flex>
          <w-flex justify-end>
            <w-button
              @click="
                deletePost(state.bookshelf.posts[i]._id, state.bookshelf._id)
              "
            >
              Delete <w-icon> mdi mdi-delete</w-icon>
            </w-button>
          </w-flex>
        </div>
        <h1>Add A Comment</h1>
        <w-input
          bg-color="secondary"
          type="text"
          placeholder="Leave A Comment"
          v-model="postInput"
        />
        <w-button @click="postPosts()">Add Comment</w-button>
      </div>
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
      viewComments: false,
      isBookOpen: false,
      IndexOfOpenedBook: null,
      postInput: "",
    };
  },
  methods: {
    openLink(link) {
      window.open(link)
    },
    async postPosts() {
      let newPost = {
        comment: this.postInput,
        bookshelf_id: this.state.bookshelf._id,
      };
      let response = await fetch(`http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/posts`, {
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
      this.postInput = "";
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

    async patchBookShelfPublic() {
      let requestBody = {};
      if (this.state.bookshelf.public == true) {
        requestBody["public"] = false;
      } else {
        requestBody["public"] = true;
      }
      let response = await fetch("http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/bookshelves", {
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
        `http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/posts/${postID}/bookshelf/${bookshelfID}`,
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

#comments p {
  color: white;
}
i {
  color: #c9c9c9;
}
h1 {
  margin-top: 50px;
  color: #c9c9c9
}

#comments {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  min-width: 500px;
  max-width: 500px;
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
  margin-top: 2rem;
}

#bookCollection > * {
  margin: 0.5rem;
}

</style>
