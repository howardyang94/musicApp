import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String, $title: String, $artist: String, $tags: String, $match: String, $desc: String) {
    feed(filter: $filter title: $title artist:$artist tags:$tags match:$match desc:$desc) {
      links {
        id
        title
        artist
        tags
        url
        description
        createdAt
        postedBy {
          id
          name
        }
      }
    }
  }
`
class Search extends Component {

  state = {
    links: [],
    filter: '',
    title:'',
    artist:'',
    tags:'',
    match:'',
    desc:'',
    hidden: true
  }

  render() {
    return (
      <div>
        <div className="pb2">
          <label className="pr2" for="search">Search</label>
          <input
            id="search"
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button className="button ml3" onClick={() => this.showSearch()}>{this.state.hidden?'Show':'Hide'} Advanced Search</button>
        </div>
        <div id="advancedSearch" hidden={this.state.hidden}>
          Advanced Search
          <div className="pt1">
            <label className="pr2" for="title">Title</label>
            <input
              className="mr3"
              id='title'
              type='text'
              onChange={e => this.setState({ title: e.target.value })}
            />
            <label className="pr2" for="artist">Artist</label>
            <input
              className="mr3"
              id='artist'
              type='text'
              onChange={e => this.setState({ artist: e.target.value })}
            />
          </div>
          <div className="pt1">
            <label className="pr2" for="tags">Tags</label> 
            <input
              className="mr3"
              id='tags'
              type='text'
              onChange={e => this.setState({ tags: e.target.value })}
            />
            <label className="pr2" for="match">Match
              <select
                id='match'
                className="mr1 ml1"
                onChange={e => this.setState({ match: e.target.value })}
              >
                <option value="any">Any</option>
                <option value="all">All</option>
              </select>
              Tags
            </label> 
          </div>
          <div className="pt1">
            <label className="pr2" for="description">Description</label>
            <input
              id='description'
              className="mr3"
              type='text'
              onChange={e => this.setState({ desc: e.target.value })}
            />
            </div>
        </div>
        <button className="mt1 mb3 button" onClick={() => this._executeSearch()}>Search</button>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    )
  }
  showSearch() {
    this.setState({hidden: !this.state.hidden})
  }

  _executeSearch = async () => {
    const { filter, title, artist, tags, match, desc } = this.state
    console.log(filter, title, artist, tags, match, desc)
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter, title, artist, tags, match, desc },
    })
    const links = result.data.feed.links
    this.setState({ links })
  }
}

export default withApollo(Search)