import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/**
 * Apollo client which request to the graphQL server for the data according our query.
 */
const client = new ApolloClient( {
	uri: "/graphql"	
} );


const apolloProviderAndRouter = (
<ApolloProvider client={client}>
	<Router>
		<Route exact path='/' component={App} />
	</Router>
</ApolloProvider>
);

// Render react componet App with defined apolloClient and routers.
ReactDOM.render(
    apolloProviderAndRouter,
    document.getElementById('root')
);

serviceWorker.unregister();
