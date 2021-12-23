import { useEffect, useState } from 'react';
import axios from 'axios';
import { store } from './store';

const endpoint = {
  api: API_ENDPOINT
}

const useRawCall = async (method, url, payload = {}, opts = {}) => {
  const token = store.getState()?.app.token || null;
  let data = null;
  let error = null;

  try {
    const response = await axios({
      baseURL: endpoint.api,
      headers: {
        Authorization: 'Bearer ' + token
      },
      method,
      url,
      data: payload
    });

    data = response.data;
  } catch (e) {
    error = e;
  }

  return {
    data,
    error
  };
};

const useApi = (method, url, payload = {}, opts = {}) => {
  const [func, response] = useLazyApi(method, url, payload);

  useEffect(() => {
    (async () => {
      await func();
    })();
  }, []);

  return response;
};

const useLazyApi = (method, url, opts = {}) => {
  const [error, setError] = useState(null);
  const [event, setEvent] = useState({
    loading: false,
    data: null
  });

  const token = store.getState()?.app.token || null;
  const func = async (payload = {}) => {
    try {
      setEvent({
        loading: true,
        data: null
      });

      const response = await axios({
        baseURL: endpoint.api,
        headers: {
          Authorization: 'Bearer ' + token
        },
        method,
        url,
        data: payload
      });

      setEvent({
        loading: false,
        data: response.data
      });
    } catch (e) {
      setError(e);
    }
  };

  return [
    func,
    {
      error,
      loading: event.loading,
      data: event.data
    }
  ];
};

export { useApi, useLazyApi, useRawCall, endpoint };
