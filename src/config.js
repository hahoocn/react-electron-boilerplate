const host = process.env.HOST || '127.0.0.1';
const hotLoadPort = process.env.HOT_LOAD_PORT || 3000;

let apiUrl;
let apiProxy;
let apiHost;
if (process.env.STAGE === 'prod') {
  apiUrl = 'https://api.domain.com';
  apiProxy = 'https://api.domain.com';
} else {
  apiUrl = 'https://api.domain.com';
  apiHost = 'api.domain.com';
  apiProxy = `http://${host}:${hotLoadPort}/api`;
}

module.exports = {
  host,
  hotLoadPort,
  apiUrl,
  apiProxy,
  apiHost,
  app: {
    title: 'My App'
  }
};
