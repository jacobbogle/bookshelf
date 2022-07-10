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
        books: ''
    })

    //makes the querystring and adds the needed api string for the GET of google books api
    //example : [?q=<searchTitle>&key=<googleApiKey>]
    //this needs to be appended to the url
    function urlString() {
        let title = encodeURIComponent(state.value.searchTitle)
        let key = googleApiKey
        return ('?q=' + title + '&key=' + key)
    }
    
    //returns a json file of related books from searchTitle
    const searchByTitle = async () => {
        try {
            let URLSTRING = urlString()
            await fetch(googleBooksURL + "/volumes" + URLSTRING).then(
                res => res.json()
            ).then(
                data => {
                    state.value.books = data
                }
            )
            //show books
            console.log(state.value.books)

            //pulls a* isbn
            console.log(state.value.books.items[1].volumeInfo.industryIdentifiers[0].identifier)   
        } catch (err) {
            //response.status(500).send(err);
            console.log(err) 
        }
    }

    return {
        state,
        searchByTitle
    }
}

export default SearchBar