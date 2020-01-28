import hahoorequest from 'hahoorequest/lib/fetch';
import config from '../../config';

const hrequest = hahoorequest;
const apiUrl = config.apiProxy;

const responseError = res => {
  let result = {
    status: 0,
    statusText: '',
    errcode: 1
  };
  if (typeof res === 'string') {
    result = Object.assign(result, { errmsg: res });
  }
  if (typeof res === 'object') {
    result = {
      status: res.status,
      statusText: res.statusText,
      errcode: res.body.errcode,
      errmsg: res.body.errmsg
    };
  }
  return result;
};

const request = async options => {
  const { url, endpoint, ...rest } = options;
  const opts = {
    url: url || `${apiUrl}${endpoint}`,
    mode: 'cors',
    ...rest
  };
  try {
    const res = await hahoorequest(opts);

    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
};

export { apiUrl, request, responseError, hrequest };
