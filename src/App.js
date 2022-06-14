import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { createContext, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    first_name: null,
    last_name: null,
    userId: null,
    loggedIn: false,
  });

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Link to="/" className="navbar-brand">
              Todo React App{' '}
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/tasks" className="nav-link">
                  Tasks
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;
