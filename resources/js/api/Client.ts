import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: '/graphql'
})

const authLink = setContext((_: any, { headers }) => {
    const metaElement = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
    const token = metaElement ? metaElement.content : null;
    const authorization = localStorage.getItem('authorization');

    return {
        headers: {
            ...headers,
            'X-CSRF-TOKEN': token ?? '',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': authorization ?? '',
            'Accept': 'application/json'
        }
    }
});

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

export default apolloProvider;
