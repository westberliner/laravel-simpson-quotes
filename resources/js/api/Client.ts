import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'
import Echo from 'laravel-echo'
import PusherConnector from 'pusher-js'

import { createLighthouseSubscriptionLink } from '@thekonz/apollo-lighthouse-subscription-link'

const customConnector = (options:any) => {
    console.log(options)
    return new PusherConnector('abc', options);
}

const echoClient = new Echo({
    broadcaster: PusherConnector,
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001
});

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
