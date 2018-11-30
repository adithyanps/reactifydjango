import React , {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CustomNavbar extends Component {
  render() {
    return (
      <Navbar dafault collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem><Link to="/" >Vehicle</Link></NavItem>
            <NavItem><Link to="/saved" >saved</Link></NavItem>


          </Navbar.Brand>
        </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} componentClass={Link} to="/Show" >
          <Link to="/Show" >
          Show</Link></NavItem>
          <NavItem eventKey={2} componentClass={Link} to="/any" >test</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
export default CustomNavbar;
