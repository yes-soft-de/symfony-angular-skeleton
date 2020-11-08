import { Injectable } from '@angular/core';
import { AdminConfig } from '../../AdminConfig';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    //login: AdminConfig.loginAPI,
    username: ''
  }

  constructor() { }

  handle(username, token) {
    this.iss.username = username;
    this.setToken(token);
  }

  // Store The Token In The Cookie
  setToken(token) {
    localStorage.setItem('token', token);
  }

    // GET The Token From The Cookie
  getToken() {
    return localStorage.getItem('token');
  }

    // Delete The Token From The Cookie
  deleteToken() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      return Object.values(this.iss).indexOf(payload.email) > -1 ? true : false;
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  // decode the token to fetch the data from it
  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

}
