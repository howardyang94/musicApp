import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
    mutation PostMutation($title: String!, $artist: String!, $genre: String!, $description: String!, $url: String!) {
        post(title: $title, artist: $artist, genre: $genre, description: $description, url: $url) {
            id
            createdAt
            title
            artist
            genre
            description
            url
        }
    }
`

class CreateLink extends Component {
    state = {
        title: '',
        artist: '',
        genre: '',
        description: '',
        url: '',
    }

    render () {

        const { title, artist, genre, description, url } = this.state
        return(
            <div>
                <div className="flex flex-column mt3">
                    Title
                    <input
                        className="mb2"
                        value={title}
                        onChange={e => this.setState({ title: e.target.value })}
                        type="text"
                        placeholder="Song Title"
                    />
                    Artist
                    <input
                        className="mb2"
                        value={artist}
                        onChange={e => this.setState({ artist: e.target.value })}
                        type="text"
                        placeholder="Artist / Band Name"
                    />
                    Genre
                    <input
                        className="mb2"
                        value={genre}
                        onChange={e => this.setState({ genre: e.target.value })}
                        type="text"
                        placeholder="Music Genre"
                    />
                    Description
                    <input
                        className="mb2"
                        value={description}
                        onChange={e => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder="A description for your post"
                    />
                    Links
                    <input
                        className="mb2"
                        value={url}
                        onChange={e => this.setState({ url: e.target.value })}
                        type="text"
                        placeholder="Associated links"
                    />
                </div>
                <Mutation
                    mutation={POST_MUTATION}
                    variables={{title,artist,genre,description,url}}
                    onCompleted={() => this.props.history.push('/')}
                >
                    {postMutation => <button onClick={postMutation}>Submit</button>}
                </Mutation>
            </div>
        )
    }
}

export default CreateLink