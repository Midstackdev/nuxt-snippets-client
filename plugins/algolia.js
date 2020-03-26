import algoliasearch from 'algoliasearch/lite'
import  { createInstantSearch } from 'vue-instantsearch'

export default ({ app }, inject) => {
    const searchClient = algoliasearch(
        'OVL7UOP1FC',
        '3812f3e7124ce7283db55138e069194d'
    )

    const {instantsearch } = createInstantSearch({
        searchClient,
        indexName: 'snippets'
    })

    inject('instantsearch', instantsearch)
}