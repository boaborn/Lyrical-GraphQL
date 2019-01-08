import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client' // ApolloClinent actually interacting with GraphQL server, making request for data and storing data locally when data comes back
import { ApolloProvider } from 'react-apollo' // AppolloProvider knows how to communicate with react and ApolloClient
import SongList from './components/SongList'

const client = new ApolloClient({})

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <div>
        <SongList/>
      </div>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
