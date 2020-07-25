import React, { Component, Fragment } from 'react'
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
                        <div>{linksToRender.map((link, index) => (
                            <Link 
                                key={link.id}
                                link={link}
                                index={index}
                                />)
                            )} </div>
                    )
                }}
            </Query>
        )
    }
}

export default LinkList