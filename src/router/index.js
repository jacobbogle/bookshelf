import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home-page.vue";
import Books from "@/views/Books-page.vue";
import About from "@/views/About-page.vue";
import Search from "@/views/Arcade-page.vue";



const routes = [
  {//we are kind of linking everything together here to use esle where.
    path: "/", // Used to link to App.vue.
    name: "Home", // dont know yet.
    component: Home, // links the top imports, linking everything to everything else.
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/books",
    name: "Books",
    component: Books,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;