import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import {Date} from 'prismic-reactjs';

const timeOptions = {
    weekday: 'long',
    hour:'numeric',
    minute:'numeric',
    // second:'numeric'
}
class Link extends Component {   
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
        // // <div className="flex mt2 items-start">
        // <div>
        //     {/* <div className="flex items-center"> */}
        //     <span className="gray">{this.props.index + 1}.</span>
        //         {this.props.link.title} == {this.props.link.artist}
        //     {/* </div> */}
        //     {/* <div className="ml1"> */}

        //     <div>
        //         {this.props.link.description}   
        //     </div>
        //     <div >
        //         {this.props.link.url}
        //     </div>
        //     <div className="f6 lh-copy gray">
        //     {/* {this.props.link.votes.length} votes | by{' '} */}
        //     postedBy {this.props.link.postedBy
        //         ? this.props.link.postedBy.name
        //         : 'Unknown'}{' '} 
        //     {/* {timeDifferenceForDate(this.props.link.createdAt)} */}
        //     on {new Intl.DateTimeFormat('default', timeOptions).format(this.props.link.createdAt)}
        //     </div>
        //     {/* </div> */}
        // </div>

        <article class="bt bb b--black-10">
            <a class="db pv4 ph3 ph0-l no-underline black dim" href="#0">
                <div class="flex flex-column flex-row-ns">
                    <div class="pr3-ns mb4 mb0-ns w-100 w-40-ns">
                        <img src="../../frontend-react-apollo/public/logo192.png" class="db" alt="Image not found"></img>
                    </div>
                    <div class="w-100 w-60-ns pl3-ns">
                        <h1 class="f3 fw1 baskerville mt0 lh-title">{this.props.link.title}</h1>
                        <h2 class="f6 lh-copy mv0">{this.props.link.artist}</h2>
                        <p class="f6 f5-l lh-copy">
                            {this.props.link.description}
                        </p>
                        <p class="f6 lh-copy mv0">tags: {this.props.link.genre}</p>
                    </div>
                </div>
            </a>
        </article>


    )
  }
}

export default Link