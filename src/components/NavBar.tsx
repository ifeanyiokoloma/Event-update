import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='primary'>
      <Container>
        <Link className='navbar-brand text-light' to='/'>
          GL
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' color='light' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Link className='nav-link text-white' to='/'>
              Create Event
            </Link>

            <Link className='nav-link text-white' to='/events'>
              Events
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
