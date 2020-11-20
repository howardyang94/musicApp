import React, { Component } from 'react'
import Link from './Link'
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
// import { LINKS_PER_PAGE } from '../constants'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
export const FEED_QUERY = gql `
  query FeedSearchQuery($filter: String, $title: String, $artist: String, $tags: String, $match: String, $desc: String) {
    feed(filter: $filter title: $title artist:$artist tags:$tags match:$match description:$desc) {
      links {
        id
        createdAt
        title
        artist
        tags
        url
        description
        postedBy {
          id
          name
        }
      }
      count
  }
}`

class LinkList extends Component {
    state = {
        links: [],
        filter: '',
        title:'',
        artist:'',
        tags:'',
        match:'any',
        desc:'',
        showAdv: false,
        search:false
      }
    // _subscribeToNewLinks = subscribeToMore => {
    //     subscribeToMore({
    //       document: NEW_LINKS_SUBSCRIPTION,
    //       updateQuery: (prev, { subscriptionData }) => {
    //         if (!subscriptionData.data) return prev
    //         const newLink = subscriptionData.data.newLink
    //         const exists = prev.feed.links.find(({ id }) => id === newLink.id);
    //         if (exists) return prev;
      
    //         return Object.assign({}, prev, {
    //           feed: {
    //             links: [newLink, ...prev.feed.links],
    //             count: prev.feed.links.length + 1,
    //             __typename: prev.feed.__typename
    //           }
    //         })
    //       }
    //     })
    //   }
    _updateCacheAfterRemove = (store, remove, linkId) => {
        const data = store.readQuery({ query: FEED_QUERY})
        // remove is Link that is being deleted
        const removeIndex = data.feed.links.findIndex(link => linkId === link.id)
        data.feed.links.splice(removeIndex, 1)

        store.writeQuery({ query: FEED_QUERY, data })
    }

    showSearch() {
        this.setState({showAdv: !this.state.showAdv})
    }
    clearSearch() {
        document.getElementById('search').value = ''
        if(this.state.showAdv) {
            document.getElementById('title').value = ''
            document.getElementById('artist').value = ''
            document.getElementById('tags').value = ''
            document.getElementById('match').value = 'any'
            document.getElementById('description').value = ''
        }
        // only rerun query when necessary
        if(this.state.search) {
            this.executeSearch(false)
        }
    }
    executeSearch(e = true) {
        this.setState({
            filter: document.getElementById('search').value,
            search: e
        })
        if(this.state.showAdv) {
            this.setState({
                title: document.getElementById('title').value,
                artist: document.getElementById('artist').value,
                tags: document.getElementById('tags').value,
                match: document.getElementById('match').value,
                desc: document.getElementById('description').value
            })
        }
    }
      
    render() {
        return (
            <Container>
                <Row className="search-title">
                    Search
                </Row>
                <Row>
                    <Col xs sm md lg xl ="auto">
                    <input
                        id="search"
                        type='text'
                        
                    />
                    </Col>
                    <Col>
                        <Button variant="outline-primary" className="button" onClick={() => this.showSearch()}>{this.state.showAdv?'Hide':'Show'} Advanced Search</Button>
                    </Col>
                </Row>
                
                {this.state.showAdv && (
                <div id="advancedSearch">
                    <hr/>
                    <Row className="search-title">
                        Search By Field
                    </Row>

                    <Row className="search-fields">
                        <Col xs sm = "12" md lg xl ="1">Title</Col>
                        <Col>
                        <input
                            // className="search-fields"
                            id='title'
                            type='text'
                            // onChange={e => this.setState({ title: e.target.value })}
                        />
                        </Col>

                        <Col xs sm = "12" md lg xl ="1">Artist</Col>
                        <Col>
                        <input
                            // className="search-fields"
                            id='artist'
                            type='text'
                            // onChange={e => this.setState({ artist: e.target.value })}
                        />
                        </Col>
                    </Row>

                    <Row className="search-fields">
                        <Col xs sm = "12" md lg xl ="1">Tags</Col>            
                        <Col>
                        <input
                            // className="search-fields"
                            id='tags'
                            type='text'
                            // onChange={e => this.setState({ tags: e.target.value })}
                        />
                        </Col>
                        
                        <Col xs sm = "12" md lg xl ="1">Match</Col>
                        <Col>
                        <select
                            id='match'
                            // className="search-fields"
                            // onChange={e => this.setState({ match: e.target.value })}
                        >
                            <option value="any">Any</option>
                            <option value="all">All</option>
                        </select>
                        Tags
                        </Col>
                    </Row>
                    
                    <Row className="search-fields">
                        <Col xs sm = "12" md lg xl ="1">Info</Col>
                        <Col>
                        <input
                            id='description'
                            type='textarea'
                            // onChange={e => this.setState({ desc: e.target.value })}
                        />
                        </Col>
                    </Row>
                </div>)}

                <div className="search-buttons">
                    <Button className="search-button" onClick={() => this.executeSearch()}>Search</Button>
                    <Button variant="secondary" onClick={() => this.clearSearch()}>Clear</Button>
                </div>

                <Query query={FEED_QUERY}  variables= {this.state}> 
                    {({ loading, error, data, subscribeToMore}) => {
                        if(loading){
                            return <div>Fetching</div>
                        }
                        if(error) return <div>Error</div>
                        {/* this._subscribeToNewLinks(subscribeToMore) */}
                        const linksToRender = data.feed.links;
                        window.count = data.feed.count
                        console.log('here')

                        return (
                            <div className="link-list">{linksToRender.map((link, index) => (
                                <Link
                                    
                                    key={link.id}
                                    link={link}
                                    index={index}
                                    updateCacheAfterRemove={this._updateCacheAfterRemove}
                                    />
                                ))} 
                                <div className="page-bottom "> 
                                    <a className="no-underline" href="#top">Back to Top</a>
                                </div>
                            </div>
                        )
                    }}
                </Query>
            </Container>
        )
    }
}
export default withApollo(LinkList)