import { ref } from "vue";

const HomePage = () => {
    const stateHome = ref({
      books: {},
    });


    const shuffle = function (array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

    const getPublicBookShelves = async function () {
        let response = await fetch("/api/bookshelves/public");
        let data = await response.json();
        stateHome.value.books = shuffle(data);
    };

    return {
      stateHome,
      getPublicBookShelves
    };
};

export default HomePage;