import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-client' // ApolloClinent actually interacting with GraphQL server, making request for data and storing data locally when data comes back
import { ApolloProvider } from 'react-apollo' // AppolloProvider knows how to communicate with react and ApolloClient

import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'

const client = new ApolloClient({})

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ SongList } />
          <Route path="songs/new" component={ SongCreate }/>
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
