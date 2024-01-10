import { signInWithPopup } from "firebase/auth";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  async function handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log(result);
    } catch (error) {
      console.log(error);
    }

    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // IdP data available using getAdditionalUserInfo(result)
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary">
      <Container>
        <Link className="navbar-brand text-light" to="/">
          GL
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color="light" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link text-white" to="/">
              Create Event
            </Link>

            <Link className="nav-link text-white" to="/events">
              Events
            </Link>
          </Nav>
          <Nav>
            {user ? (
              <Link to="/account">
                <Image
                  src="https://ui-avatars.com/api/?background=0D8ABC&color=fff"
                  roundedCircle
                />
              </Link>
            ) : (
              <div>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="outline-secondary"
                  className="d-flex align-items-center gap-2 justify-content-center text-uppercase"
                >
                  <FaGoogle /> <span>Sign in with Google</span>
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
