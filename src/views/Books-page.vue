<template>
  <div id="bookCollection">
    <Book1/>
    <Book2/>
    <Book3/>
  </div>
</template>

<script>
import Book1 from '../book-objects/the-bone-witch.vue'
import Book2 from '../book-objects/ready-player-one.vue'
import Book3 from '../book-objects/free-the-darkness.vue'
export default {
  data() {
    return {
    };
  },
  components: {
    Book1,
    Book2,
    Book3,  
  }


}
</script>

<style scoped>
*, ::after, ::before {
    box-sizing: content-box;
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

