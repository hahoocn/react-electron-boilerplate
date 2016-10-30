import React from 'react';
import logoImg from '../../assets/images/logo.jpg';

class About extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    home: React.PropTypes.object,
  };

  state = {
    info: 'About'
  }

  render() {
    const homeStyles = require('../../containers/Home/Home.css');
    const styles = require('./About.css');

    return (
      <div className={homeStyles.main}>
        <div className={homeStyles.logo}><img src={logoImg} alt="" /></div>
        <h1>{this.state.info}</h1>
        <h3 className={styles.content}>
          Boilerplate app for Electron with React ( Node.js, React.js,
          Redux, Webpack, CSS Modules, PostCSS, Babel, ES2015, ESLint ... )
        </h3>
      </div>
    );
  }
}

export default About;
