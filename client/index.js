import './style/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-client' // ApolloClinent actually interacting with GraphQL server, making request for data and storing data locally when data comes back
import { ApolloProvider } from 'react-apollo' // AppolloProvider knows how to communicate with react and ApolloClient

import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'

const client = new ApolloClient({
  // This is a super important and confusing part
  // This function fix when child component run mutation but not re-rendering issue
  //  this function tells Apollo
  //  1. Apollo go fetch data you need
  //  2. look every single record
  //  3. use the id field of that record to identifie that pice of data
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ SongList } />
          <Route path="songs/new" component={ SongCreate }/>
          <Route path="songs/:id" component={ SongDetail }/> //e.g: songs/5
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
