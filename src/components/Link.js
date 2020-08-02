import React, { Component } from 'react'
import CreateLink from './CreateLink'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

// import { AUTH_TOKEN } from '../constants'
// import { timeDifferenceForDate } from '../utils'
const DELETE_MUTATION = gql`
mutation DeleteMutation($id: ID!) {
    remove(id: $id){
        id
        title
        artist
        tags
        description
        url
        postedBy {
            name
        }
        createdAt
    }
}
`
const timeOptions = {
    weekday: 'long',
    year:'numeric',
    month:'long',
    day:'numeric',
    hour:'numeric',
    minute:'numeric',
    // second:'numeric'
}

// const home = 'http://localhost:3000'
class Link extends Component {   
    state = {
        edit: false,
        showPosted: false,
    }

    editCallback = (data) => {
        this.setState({edit: data})
    }    

    displayTags() {
        let arr = []
        const tagPropArr = this.props.link.tags.split(' ');
        for(let i = 0; i < tagPropArr.length; i++ ) {
            arr.push(<span key={'tag'+i} className="ma1 pa1  ml0 f7 flex-wrap tag">{tagPropArr[i]}</span>)
        }
        // console.log(this.props.link.id, arr)
        if(arr.length > 1) {
            return (
                <p className="f6 lh-copy mv0 flex-wrap">{arr}</p>
            )
        }
    }

    youtubePlayer() {
        let youtubeUrl = ''
        const otherUrls = []
        for(let url of this.props.link.url.split(' ')) {
            if(url.includes('youtube.com')) {
                const str = url.slice(url.indexOf('=')+1)
                youtubeUrl = "https://www.youtube.com/embed/" + str + '?showinfo=0&enablejsapi=1&origin=http://localhost:3000'
            } else {
                // validate url?
                otherUrls.push(url)
            }
        }
        if(youtubeUrl) {
            return (
            <iframe id={'yp' + (this.props.index)}
                width="460" height="270"
                src={youtubeUrl}
            ></iframe>
            )
        }       
    }
    postedBy() {
        return (
            <div className="f6 lh-copy gray mt3">
                    posted By {this.props.link.postedBy
                    ? this.props.link.postedBy.name
                    : 'Unknown'}{' '} 
                on {new Intl.DateTimeFormat('default', timeOptions).format(this.props.link.createdAt)}
            </div>
        )
    }

    render() {
        const { id, title, artist, tags, description, url } = this.props.link
        const tagsArr = this.displayTags()
        const youtubePlayer = this.youtubePlayer()
        const postedBy = this.state.showPosted ? postedBy() : null
        // // const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <div>
                <article className="bt bb b--black-10 self-center" hidden={this.state.edit}>
                        <div className="flex flex-column flex-row-ns" >
                            {youtubePlayer}
                            <div className="pl3-ns">
                                <h1 className="f2 fw1 baskerville mt0 lh-title">{this.props.link.title}</h1><h2>{this.props.link.artist} </h2>
                                <p className="f6 f5-l lh-copy">
                                    {this.props.link.description}
                                </p>
                                {tagsArr}
                                {postedBy}
                            </div>
                        </div>
                        <button className="button mt2" hidden={this.state.edit} onClick={() => this.setState({edit: !this.state.edit})}>edit</button>                
                        <Mutation 
                            mutation={DELETE_MUTATION}
                            variables={{id}}
                            update={(store, { data: { remove } }) => {
                                this.props.updateCacheAfterRemove(store, remove, id)
                            }}
                        >
                            {deleteMutation => <button className="button mt2" onClick={deleteMutation}>delete</button>}
                        </Mutation>
                </article>
                <div className="mb3" hidden={!this.state.edit}>
                        <CreateLink
                            id={id}
                            title={title}
                            artist={artist}
                            description={description}
                            tags={tags}
                            url={url}
                            editCallback={this.editCallback}
                        />
                        {/* <button hidden={!this.state.edit} onClick={() => this.setState({edit: !this.state.edit})}>cancel</button> */}
                </div>  
            </div>
        )
    }
}

export default Link