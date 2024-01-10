import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  
  return (
    <div className="min-h-100 d-flex flex-column justify-content-center align-items-center">
      <div>
        <Button onClick={logout} className="mt-5">
          LOG OUT
        </Button>
      </div>
    </div>
  );
};

export default Account;
