import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
// import { LINKS_PER_PAGE } from '../constants'

export const FEED_QUERY = gql `
# query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) 
{
  feed (orderBy: {createdAt: desc}){
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
        // remove is Link that is being removed
        const removeIndex = data.feed.links.findIndex(link => linkId === link.id)
        data.feed.links.splice(removeIndex, 1)

        store.writeQuery({ query: FEED_QUERY, data })
    }
    render() {
        return (
            //  variables={this._getQueryVariables()}>
            <Query query={FEED_QUERY}> 
                {({ loading, error, data, subscribeToMore}) => {
                    if(loading) return <div>Fetching</div>
                    if(error) return <div>Error</div>
                    {/* this._subscribeToNewLinks(subscribeToMore) */}
                    const linksToRender = data.feed.links;
                    window.count = data.feed.count
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
        )
    }
}

export default LinkList