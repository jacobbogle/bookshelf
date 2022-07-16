<template>
  <div class="topBox">
    <iframe
      width="622"
      height="350"
      src="https://www.youtube.com/embed/jnBM1Zp_bCU?autoplay=1&loop=1&mute=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <Book1 />
  </div>
</template>

<script>
import Book1 from "../golobalBookInfo/the-bone-witch.vue";
import IsLoggedIn from "../middleware/getSession";

export default {
  setup() {
    const { state, getSession } = IsLoggedIn();
    return { state, getSession };
  },
  components: {
    Book1,
  },
  data() {
    return {
      userName: "",
    };
  },
  created: function () {
    this.getSession();
    this.userName = this.state.currentUser;
  },
};
</script>

<style scoped>
* {
  border-radius: 10px;
  margin: 0.5rem;
}

.topBox {
  grid-column: 2/8;
  grid-row: 2/3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

iframe {
  box-shadow: 0 0 15px 15px rgba(9, 9, 9);
}

@media only screen and (max-width: 1260px) {
  .topBox {
    flex-direction: column;
  }
}

@media only screen and (max-width: 684px) {
  iframe {
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
  }

  .topBox {
    grid-column: 1 / -1;
    margin-top: 1rem;
  }
}
</style>
