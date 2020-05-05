import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { showHello, showHelloAsync, showMoviesAsync } from './actions';
import { selectInfo, selectHome } from './selectors';
import styles from './styles.css';
import logoImg from '../../assets/images/logo.jpg';
import config from '../../config';

class Home extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    home: PropTypes.object.isRequired,
    homeinfo: PropTypes.string,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    homeinfo: undefined,
  }

  state = {
    info: 'Oh My App!'
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (!this.props.homeinfo) dispatch(showHello('About'));
    if (!this.props.home.moviesTotal) dispatch(showMoviesAsync());
    if (!this.props.home.name || !this.props.home.infoAsync) {
      dispatch(showHelloAsync('This is the content of'));
    }
  }

  render() {
    const { home, homeinfo, history } = this.props;
    return (
      <div className={styles.main}>
        <Helmet title={config.app.title} />
        <div className={styles.logo}><img src={logoImg} alt="" /></div>
        <h1>{this.state.info}</h1>
        <h2 className={styles.aboutBox}>
          <span onClick={() => history.push('/about')} role="link" tabIndex="0" className={styles.about}>
            {homeinfo}
          </span>
        </h2>
        <h2>Loading remote: movies {home.moviesTotal}</h2>
        <h3>{home.name} {home.infoAsync}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: selectHome(state).toObject(),
  homeinfo: selectInfo(state),
});

export default connect(mapStateToProps)(Home);
