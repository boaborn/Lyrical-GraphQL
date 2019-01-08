import React, { Component } from 'react'
import gql from 'graphql-tag' // Step1: Helper function allows us to write queries inside of JS
import { graphql } from 'react-apollo' // Step3: Bound a component with queries

class SongList extends Component {
  renderSongs () {
    if (this.props.data.loading) {
      return (
        <div>Loading...</div>
      )
    }
    return this.props.data.songs.map(song => {
      // Triditionally keyt use the id of model
      return (
        <li key={ song.id } className="collection-item">
          { song.title }
        </li>
      )
    })
  }

  render () {
    return (
      <ul className="collection">
        { this.renderSongs() }
      </ul>
    )
  }
}

// Step2 Define a query
const query = gql`
  {
    songs {
      id
      title
    }
  }
`

export default graphql(query)(SongList)
