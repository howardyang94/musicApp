import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
          <div className="flex pa3 f4 justify-between headerColor">
            <div className="flex flex-fixed black">
              {/* <div className="fw7 mr2">Howie's Music WebApp </div> */}
              <Link to="/" className="fw7 mr2 no-underline black">
              Howie's Music WebApp
              </Link>
              {/* <Link to="/top" className="ml1 no-underline black">
                Top
              </Link>
              <div className="ml1">|</div> */}
              <Link to="/search" className="ml1 no-underline black">
                search
              </Link>
              {authToken && (
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/create" className="ml1 no-underline black">
                    submit
                  </Link>
                </div>
              )}
            </div>
            <div className="flex flex-fixed">
              {authToken ? (
                <div
                  className="ml1 pointer black"
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN)
                    this.props.history.push(`/`)
                  }}
                >
                  logout
                </div>
              ) : (
                <Link to="/login" className="ml1 no-underline black">
                  login
                </Link>
              )}
            </div>
          </div>
        )
      }
    }

export default withRouter(Header)