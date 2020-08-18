import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    showAdv: false
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs sm = "12" md lg xl ="auto">Search</Col><Col xs sm md lg xl ="auto">
          <input
            id="search"
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          </Col>
          <Col>
            <button className="button ml3" onClick={() => this.showSearch()}>{this.state.showAdv?'Hide':'Show'} Advanced Search</button>
          </Col>
        </Row>
        
        {this.state.showAdv && (
          <div id="advancedSearch">
          <hr></hr>
          <Row>
          <Col xs sm = "12" md lg xl ="1">Title</Col>
          <Col>
              <input
                className="mr3"
                id='title'
                type='text'
                onChange={e => this.setState({ title: e.target.value })}
              />
            </Col>
            <Col xs sm = "12" md lg xl ="1">Artist</Col>
            <Col>
              <input
                className="mr3"
                id='artist'
                type='text'
                onChange={e => this.setState({ artist: e.target.value })}
              />
            </Col>
          </Row>
          <Row>
          <Col xs sm = "12" md lg xl ="1">Tags</Col>            
          <Col>
            <input
              className="mr3"
              id='tags'
              type='text'
              onChange={e => this.setState({ tags: e.target.value })}
            />
            </Col>
            <Col xs sm = "12" md lg xl ="1">Match</Col>
            <Col>
              <select
                id='match'
                className="mr1 ml1"
                onChange={e => this.setState({ match: e.target.value })}
              >
                <option value="any">Any</option>
                <option value="all">All</option>
              </select>
              Tags
            </Col>
          </Row>
          
          <Row>
          <Col xs sm = "12" md lg xl ="1">Description</Col>
          <Col>
              <input
                id='description'
                className="mr3"
                type='textarea'
                onChange={e => this.setState({ desc: e.target.value })}
              />
            </Col>

          </Row>
          <button className="mt1 mb3 button" onClick={() => this._executeSearch()}>Search</button>
          {this.state.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </div>
        )}
      </Container>
    )
  }
  showSearch() {
    this.setState({showAdv: !this.state.showAdv})
  }

  _executeSearch = async () => {
    const { filter, title, artist, tags, match, desc } = this.state
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter, title, artist, tags, match, desc },
    })
    const links = result.data.feed.links
    this.setState({ links })
  }
}

export default withApollo(Search)