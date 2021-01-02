import Login from "./Login";
import styles from "./Layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.main}>
      <nav className={styles.navigation}>
        <h1>My Memes</h1>
        <Login />
      </nav>
      <main className={styles.content}>{children}</main>
    </div>
  );
};
export default Layout;
