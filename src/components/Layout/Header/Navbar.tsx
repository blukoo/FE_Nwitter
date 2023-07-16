import { NavLink } from "react-router-dom";
import styles from "@/styles/Layout/Header/Navbar.module.scss";

export default function Navbar() {
  return (
    <>
      <div className={styles.menu_wrap}>
        <div className={styles.link_item}>
          <NavLink
            end
            className={isActive => (isActive ? "active" : "")}
            to="/home"
          >
            Home
          </NavLink>
        </div>
        <div className={styles.link_item}>
          <NavLink
            className={isActive => (isActive ? "active" : "")}
            to="/TableComponentTest"
          >
            TableComponentTest
          </NavLink>
        </div>
        <div className={styles.link_item}>
          <NavLink
            className={isActive => (isActive ? "active" : "")}
            to="/temp"
          >
            Temp
          </NavLink>
        </div>
        <div className={styles.link_item}>
          <NavLink
            className={isActive => (isActive ? "active" : "")}
            to="/table"
          >
            table
          </NavLink>
        </div>
        <div className={styles.link_item}>
          <NavLink
            className={isActive => (isActive ? "active" : "")}
            to="/needLogin"
          >
            needLogin
          </NavLink>
        </div>
      </div>
    </>
  );
}
