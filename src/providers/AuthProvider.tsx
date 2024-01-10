import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

type AuthContextProps = {
  user: User | undefined;
};

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        setLoading(false);
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
