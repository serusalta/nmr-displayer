/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { buildMenu, getKey } from '../../utility/menu';
import Menu from 'rc-menu';
import logo from '../../assets/img/logo-white.svg';
import 'rc-menu/assets/index.css';
import { FaBars } from 'react-icons/fa';

var ps;

class Sidebar extends React.PureComponent {
  state = { routes: [] };
  constructor(props) {
    super(props);
    this.sidebar = React.createRef();
    this.activeRoute.bind(this);
    this.menuHandler = this.menuHandler.bind(this);
    this.isMenuOpen = true;
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    const routes = buildMenu(this.props.routes, []);
    this.setState((prev) => {
      return { ...prev, routes };
    });
    // this.sidebar.current.class = 'sidebar menu-open';
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }

  menuHandler(e) {
    this.isMenuOpen = !this.isMenuOpen;
    this.sidebar.current.className = this.isMenuOpen
      ? 'sidebar menu-open'
      : 'sidebar menu-close';

    this.props.onMenuClose(!this.isMenuOpen);
  }

  render() {
    return (
      <div
        ref={this.sidebar}
        data-color={this.props.backgroundColor}
        className="sidebar menu-open"
      >
        <button type="button" className="menu-bt" onClick={this.menuHandler}>
          <FaBars />
        </button>
        <div className="logo">
          <a
            // href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-mini"
            // target="_blank"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            // href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-normal"
            // target="_blank"
          >
            NMRium
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Menu
            onClick={(e) => {
              this.props.history.push(
                `/SamplesDashboard/${Math.random()
                  .toString(36)
                  .replace('0.', '')}/${getKey(e.item.props.file)}`,
              );
            }}
            mode="inline"
          >
            {this.state.routes}
          </Menu>

          {/* <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    (prop.pro ? ' active active-pro' : '')
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    style={{ borderRadius: '10px' }}
                  >
                    <i className={'now-ui-icons ' + prop.icon} />
                    <p style={{ whiteSpace: 'pre-line', paddingLeft: '60px' }}>
                      {prop.name}
                    </p>
                  </NavLink>
                </li>
              );
            })}
          </Nav> */}
        </div>
      </div>
    );
  }
}

export default Sidebar;
