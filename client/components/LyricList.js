import React, { Component } from 'react'
import gql from 'graphql-tag' // Step1: Helper function allows us to write queries inside of JS
import { graphql } from 'react-apollo' // Step3: Bound a component with queries

class LyricList extends Component {
  onLike (id, likes) {
    this.props.mutate({
      variables: { id },
      // Ask apollo to guess the result before receiving data back from graphQL
      // Assume the result then render then update when data come back
      optimisticResponse: {
        __typename: 'Mutation', // The type of request
        likeLyric: { // The name of mutation query
          id,
          __typename: 'LyricType', // The type of response from server
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics () {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={ id } className="collection-item">
          { content }
          <div className="vote-box">
            <i className="material-icons"
              onClick={ () => this.onLike(id, likes) }
            >thumb_up</i>
            { likes }
          </div>
        </li>
      )
    })
  }
  render () {
    return (
      <ul className="collection">
        { this.renderLyrics() }
      </ul>
    )
  }
}

const mutation = gql`
 mutation LikeLyric($id: ID){
    likeLyric(id:$id){
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)
