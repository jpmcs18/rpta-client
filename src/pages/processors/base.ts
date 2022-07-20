import axios, { AxiosRequestConfig } from 'axios';
import { API } from '../../constant';

export async function httpGet<Return>(
  url: string
): Promise<Return | undefined> {
  return await axios
    .get(url, {
      headers: {
        'content-type': 'application/json',
      },
      baseURL: API,
    } as AxiosRequestConfig)
    .then(async (res) => {
      switch (res.status) {
        case 200:
          return res.data;
      }
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            throw new Error(err.response.data);
          case 403:
            throw new Error('Access denied');
          case 404:
            throw new Error('Not Data Found');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error(err);
    });
}

export async function httpPost<Return>(
  url: string,
  param: any
): Promise<Return | undefined> {
  return await axios
    .post(url, param, {
      headers: {
        'content-type': 'application/json',
      },
      baseURL: API,
    } as AxiosRequestConfig)
    .then(async (res) => {
      switch (res.status) {
        case 200:
          return res.data;
        case 201:
          return res.data;
        case 204:
          return true;
        default:
          throw new Error('Unknown Error');
      }
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            throw new Error(err.response.data);
          case 403:
            throw new Error('Access denied');
          case 404:
            throw new Error('No Data Found');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error(err);
    });
}

export async function httpPut(url: string, param: any): Promise<boolean> {
  return await axios
    .put(url, param, {
      headers: {
        'content-type': 'application/json',
      },
      baseURL: API,
    } as AxiosRequestConfig)
    .then(async (res) => {
      switch (res.status) {
        case 204:
          return true;
        default:
          throw new Error('Unknown Error');
      }
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            throw new Error(err.response.data);
          case 403:
            throw new Error('Access denied');
          case 404:
            throw new Error('No Data Found');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error(err);
    });
}

export async function httpDelete(url: string): Promise<boolean> {
  return await axios
    .delete(url, {
      headers: {
        'content-type': 'application/json',
      },
      baseURL: API,
    } as AxiosRequestConfig)
    .then(async (res) => {
      switch (res.status) {
        case 204:
          return true;
        default:
          throw new Error('Unknown Error');
      }
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            throw new Error(err.response.data);
          case 403:
            throw new Error('Access denied');
          case 404:
            throw new Error('No Data Found');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error(err);
    });
}
