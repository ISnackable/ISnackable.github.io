import React from "react";
import { Link } from "gatsby";
import * as styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/privacy">Privacy</Link>
      <span></span>
      <a href="https://github.com/ISnackable">GitHub</a>
      <a href="https://www.linkedin.com/in/#/">LinkedIn</a>
      <a href="https://hackerone.com/isnackable">HackerOne</a>
    </footer>
  );
};

export default Footer;