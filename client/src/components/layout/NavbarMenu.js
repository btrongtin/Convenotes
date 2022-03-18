import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import convenotesLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserSelector } from '../../redux/selectors';
import { setAuth } from '../auth/authSlice';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../constant';

function capitalize(s) {
  //func uppercase first letter of string, use for display theme title
  return s[0].toUpperCase() + s.slice(1);
}

const listTheme = [
  'minty',
  'quartz',
  'vapor',
  'united',
  'spacelab',
  'solar',
  'slate',
  'sketchy',
  'simplex',
  'superhero',
  'sandstone',
  'pulse',
  'materia',
  'lumen',
  'litera',
  'journal',
  'darkly',
  'cerulean',
  'lux',
  'cyborg',
  'cosmo',
  'flatly',
];

const NavbarMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(loginUserSelector);

  //   const logout = () => logoutUser();
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch(
      setAuth({
        isAuthenticated: false,
        user: null,
      })
    );
  };

  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      className="shadow"
      style={{ padding: '.5rem 1rem', fontWeight: 'bold' }}
    >
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={convenotesLogo}
          alt="convenotesLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        Convenotes
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>

          {/* <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link> */}
          {/* <Nav.Link
            className="font-weight-bolder text-white"
            to="/statistic"
            as={Link}
          >
            Statistic
          </Nav.Link> */}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Change theme
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {listTheme.map((theme) => (
                <Dropdown.Item
                  key={theme}
                  className="change-style-menu-item"
                  rel={theme}
                >
                  {capitalize(theme)}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {user}
          </Nav.Link>
          <Button
            variant="danger"
            className="font-weight-bolder text-white"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
