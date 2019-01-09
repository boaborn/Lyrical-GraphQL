import React, { Component } from 'react'
import gql from 'graphql-tag' // Step1: Helper function allows us to write queries inside of JS
import { graphql } from 'react-apollo' // Step3: Bound a component with queries
import { Link } from 'react-router'
import query from '../queries/fetchSongs'

class SongList extends Component {

  onSongDelete (id) {
    this.props.mutate({
      variables: { id: id }
    }).then(() => this.props.data.refetch()) // Because we passed query to props so we can use refetch
  }

  renderSongs () {
    if (this.props.data.loading) {
      return (
        <div>Loading...</div>
      )
    }
    return this.props.data.songs.map(({ id, title }) => {
      // Triditionally keyt use the id of model
      return (
        <li key={ id } className="collection-item">
          { title }
          <i className="material-icons"
            onClick={ () => this.onSongDelete(id) }
          >delete</i>
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

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id:$id){
      id
    }
  }
`

// Graphql lib only takes 1 query and 1 mutation at a time
export default graphql(mutation)(
  graphql(query)(SongList)
)
