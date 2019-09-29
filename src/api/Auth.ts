import httpClient from 'http-utils';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export default class Auth {
  static login(data: LoginData) {
    return httpClient
      .post('/token', data)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  static register(data: RegisterData) {
    return httpClient
      .post('/register', data)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      })
  }

  static delete() {}

  static getById() {}
}
