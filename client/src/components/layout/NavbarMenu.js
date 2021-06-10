import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import myUdemyLogo from '../../assets/udemy-logo.png';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';

const NavbarMenu = () => {
  const {authState: {user: { username }},logoutUser} = useContext(AuthContext)

  const logout = () => logoutUser()

  return (
    <Navbar expand='lg' bg='dark' variant='dark' className='shadow'>
      <Navbar.Brand className='font-weight-bolder text-white px-1'>
        <img
          className='mx-2'
          src={myUdemyLogo}
          alt='myUdemyLogo'
          width='40'
          height='40'
        />
        My Udemy
			</Navbar.Brand>
      
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
    
      <Navbar.Collapse id='basic-navbar-nav' className="justify-content-between">
        <Nav className='mr-auto'>
          <Nav.Link
            className='font-weight-bolder text-white'
            to='/dashboard'
            as={Link}
          >
            Dashboard
					</Nav.Link>
          <Nav.Link
            className='font-weight-bolder text-white'
            to='/about'
            as={Link}
          >
            About
					</Nav.Link>
        </Nav>

        <Nav className="align-items-center px-2">
          <Nav.Link className='font-weight-bolder text-white' disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant='primary'
            className='font-weight-bolder text-white'
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt='logoutIcon'
              width='32'
              height='32'
              className='mr-2'
            />
						Logout
					</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarMenu