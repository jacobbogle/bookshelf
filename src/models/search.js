import { ref} from 'vue'
const api =  require("../../api.config")
//import { useRoute  } from 'vue-router'

//google stuff
const googleApiKey = api["API_KEY"]
const googleBooksURL = 'https://www.googleapis.com/books/v1'


const SearchBar = () => {

    const state = ref({
        searchTitle: '',
        searchAuthor: '',
        searchISBN: '',
        bookObject: {},
        books: {}
    })
    //makes the querystring and adds the needed api string for the GET of google books api
    //example : [?q=<searchTitle>&key=<googleApiKey>]
    //this needs to be appended to the url
    function urlString() {
        let title = encodeURIComponent(state.value.searchTitle)
        let key = googleApiKey
        return ('?q=' + title + '&key=' + key)
    }


    async function setBetterObject(response) {
        try {
            let newObject = []
            for (let i = 0; i < 10; i++) {
                await fetch(String(response.items[i].selfLink)).then(
                    res => res.json()
                ).then(
                    data => {
                        newObject.push(data)
                    }
                )
            }
            state.value.bookObject = newObject
        } catch (err) {
            console.log(err) 
        }
    }


    //returns a json file of related books from searchTitle
    const searchByTitle = async () => {
        try {
            let URLSTRING = urlString()
            await fetch(googleBooksURL + "/volumes" + URLSTRING).then(
                res => {
                    let response = res.json()
                    return response
                }
            ).then(
                data => {
                    state.value.books = data
                }
            )
            setBetterObject(state.value.books)
        } catch (err) {
            console.log(err) 
        }
    }


    return {
        state,
        searchByTitle
    }
}

export default SearchBar