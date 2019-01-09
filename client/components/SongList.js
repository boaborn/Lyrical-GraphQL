import React, { Component } from 'react'
import gql from 'graphql-tag' // Step1: Helper function allows us to write queries inside of JS
import { graphql } from 'react-apollo' // Step3: Bound a component with queries
import { Link } from 'react-router'
import query from '../queries/fetchSongs'

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
      <div>
        <ul className="collection">
          { this.renderSongs() }
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

// Step2 Define a query, using import now
// const query = gql`
//   {
//     songs {
//       id
//       title
//     }
//   }
// `

export default graphql(query)(SongList)
