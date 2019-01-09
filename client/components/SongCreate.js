import React, { Component } from 'react'
import { graphql } from 'react-apollo' // Step3: Bound a component with queries
import { hashHistory } from 'react-router'

import gql from 'graphql-tag'
import { Link } from 'react-router'
import query from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor (props) {
    super(props)
    this.state = { title: '' }
  }

  onSubmit (event) {
    event.preventDefault()
    // Mutate returns a promise
    this.props.mutate({
      variables: { // Pass data into  variables object, then this object will be sended to mutation function
        title: this.state.title
      },
      refetchQueries: [{ query }] // Auto run query to fetch data, eg, songs, also can put variables [{ query, variables:{} }]
      // refetch fix new item not appear on list of songs
    }).then(() => hashHistory.push('/')) // Move user back to root route
  }

  render () {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <label>Song Title:</label>
          <input type="text"
            onChange={ event => this.setState({ title: event.target.value }) }
            value={ this.state.title }
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
