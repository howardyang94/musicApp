import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import FormErrors from './FormErrors'
import { FEED_QUERY } from './LinkList'

const POST_MUTATION = gql`
    mutation PostMutation($title: String!, $artist: String!, $tags: String, $description: String, $url: String) {
        post(title: $title, artist: $artist, tags: $tags, description: $description, url: $url) {
            id
            createdAt
            title
            artist
            tags
            description
            url
        }
    }
`

class CreateLink extends Component {
    state = {
        title: '',
        artist: '',
        tags: '',
        description: '',
        url: '',
        titleValid: false,
        artistValid: false,
        formValid: false,
        formErrors: {title:'', artist:''}
    }
    handleInput(e, req = false) {
        const name = e.target.name
        const value = e.target.value
        if(req) {
            this.setState({ [name]: value })
            this.validateField(name, value.trim())
        } else {
            this.setState({ [name]: value })
        }
    }
    validateField(name, value) {
        let titleValid = this.state.titleValid
        let artistValid = this.state.artistValid
        let formErrors = this.state.formErrors
        switch(name) {
            case 'title':
                titleValid = value === '' ? false : true
                formErrors.title = titleValid ? '' : 'Please enter a Title'
                break;
            case 'artist':
                artistValid = value === '' ? false : true
                formErrors.artist = artistValid ? '' : 'Please enter an Artist'
                break;
            default: 
                console.warn('need to create validation case for ', name)
        }
        this.setState({
            titleValid: titleValid,
            artistValid: artistValid,
            formErrors: formErrors,
            formValid: titleValid && artistValid,
        })
    }

    render () {

        const { title, artist, tags, description, url } = this.state
        return(
            <div>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className="flex flex-column mt3">
                    Title
                    <input
                        className="mb2 mt1"
                        name="title"
                        value={title}
                        onChange={e => this.handleInput(e, true)}
                        type="text"
                        placeholder="Song Title"
                        required
                    />
                    Artist
                    <input
                        className="mb2 mt1"
                        name="artist"
                        value={artist}
                        onChange={e => this.handleInput(e, true)}
                        type="text"
                        placeholder="Artist / Band Name"
                        required
                    />
                    Tags
                    <input
                        className="mb2 mt1"
                        name="tags"
                        value={tags}
                        onChange={e => this.handleInput(e, true)}
                        type="text"
                        placeholder="Tags"
                    />
                    Description
                    <input
                        className="mb2 mt1"
                        name="description"
                        value={description}
                        onChange={e => this.handleInput(e)}
                        type="text"
                        placeholder="A description for your post"
                    />
                    Links
                    <input
                        className="mb2 mt1"
                        name="url"
                        value={url}
                        onChange={e => this.handleInput(e)}
                        type="text"
                        placeholder="Associated links"
                    />
                </div>
                <Mutation
                    mutation={POST_MUTATION}
                    variables={{title,artist,tags,description,url}}
                    onCompleted={() => this.props.history.push('/')}
                    update={(store, { data: { post } }) => {
                        const data = store.readQuery({ query: FEED_QUERY })
                        data.feed.links.unshift(post)
                        store.writeQuery({
                            query: FEED_QUERY,
                            data
                        })
                    }}
                >
                    {postMutation => <button class="button mt2" disabled={!this.state.formValid} onClick={postMutation}>Submit</button>}
                </Mutation>
            </div>
        )
    }
}

export default CreateLink