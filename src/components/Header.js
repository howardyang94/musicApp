import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
          <div className="d-flex flex-row header">
            {/* <div className="d-inline-flex flex-fixed black"> */}
            <div className="p-2">
              {/* <div className="fw7 mr2">Howie's Music WebApp </div> */}
              <Link to="/" className="header-title no-underline black">
                Howie's Music WebApp
              </Link>
              </div>
              {/* <Link to="/top" className="ml1 no-underline black">
                Top
              </Link>
              <div className="ml1">|</div> */}
              {/* <div className="p-2 pointer">
                <Link to="/search" className="ml1 no-underline black">
                  search
                </Link>
              </div> */}
              <div className="p-2">
                {authToken && (
                      <Link to="/create" className="ml1 no-underline black">
                        submit
                      </Link>
                )}
              </div>
            {/* <div className="flex flex-fixed"> */}
            <div className="p-2 ml-auto">
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