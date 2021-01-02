import React from "react";
import { useAuth0 } from "../lib/auth0-spa";
import styles from "./Login.module.css";

interface Props {}

const Login: React.FunctionComponent<Props> = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user,
  } = useAuth0();

  return (
    <div>
      {!loading && !isAuthenticated && (
        <button
          onClick={() => loginWithRedirect({})}
          className={styles.loginbutton}
        >
          Log in
        </button>
      )}

      {!loading && isAuthenticated && (
        <div>
          Logged in as {user.nickname}
          <button onClick={() => logout()} className={styles.loginbutton}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
