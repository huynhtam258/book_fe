import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
// npm install --save rxjs-compat

// import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  /* #region SelectedUser for Regis */
  selectedAdmin: Admin = {
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  };
  /* #endregion */

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  // Dùng để loại trừ các hàm không cần dùng đến Interceptor và Authguard

  constructor(private http: HttpClient) { }


  /* #region Login, Regis, Token, GetAdmin */
  regisAdmin(admin: Admin) {
    return this.http.post(environment.apiBaseUrl + '/register', admin, this.noAuthHeader);
    // Gọi để trả về, dùng subcribe để return
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/login', authCredentials, this.noAuthHeader);
  }

  getAdmin(id) {
    return this.http.get(environment.apiBaseUrl + '/userProfile/' + id);
  }

  setToken(token: string) {
    localStorage.setItem('Admin_token', token);
  }
  setUsername(username: string){
    localStorage.setItem('user_name', username);
  }

  getToken() {
    return localStorage.getItem('Admin_token');
  }
  getUsername() {
    return localStorage.getItem('user_name');
  }

  deleteToken() {
    localStorage.removeItem('Admin_token');
  }
  /* #endregion */

  /* #region Auth guard */

  getAdminPayload() {
    var token = this.getToken();
    if (token) {
      var adminPayload = atob(token.split('.')[1]); // Lấy đoạn string thứ 2 sau dấu '.' để decode dữ liệu admin đã login
      return JSON.parse(adminPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    return true;
  }

  changePassword(body){
    return this.http.put(environment.apiBaseUrl + '/changePassword',body);
  }

  updateProfile(body){
    return this.http.put(environment.apiBaseUrl + '/updateProfile', body)
  }
}
