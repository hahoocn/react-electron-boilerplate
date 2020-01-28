import { request } from '../../utils/api';

const showHelloApi = name => {
  const result = new Promise(resolve => {
    setTimeout(() => {
      const resJson = { infoAsync: 'Async loading' };
      resJson.name = name;
      resolve(resJson);
    }, 1000);
  });
  return result;
};

const getMoviesApi = async (dispatch, getState) => {
  try {
    const res = await request({
      url: 'https://raw.githubusercontent.com/ihahoo/doc/master/MoviesExample.json',
      method: 'GET',
    }, dispatch, getState);
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { showHelloApi, getMoviesApi };
