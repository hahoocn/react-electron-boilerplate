import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.css';
import logoImg from '../../assets/images/logo.jpg';

const About = () => {
  const homeStyles = require('../Home/styles.css');

  return (
    <div className={homeStyles.main}>
      <Helmet title="About" />
      <div className={homeStyles.logo}><img src={logoImg} alt="" /></div>
      <h1>About</h1>
      <h3 className={styles.content}>
        Boilerplate app for Electron with React ( Node.js, React.js,
        Redux, Webpack, CSS Modules, PostCSS, Babel, ES2015, ESLint ... )
      </h3>
    </div>
  );
};

export default About;
