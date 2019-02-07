import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthResult, IUser, ILogInVm } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = '';
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  public User: IUser;
    // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.loggedIn = this.isLoggedIn();
    this.User = JSON.parse(localStorage.getItem('user_info')) as IUser;
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiUri();
  }

  login(userName: string, password: string) {
    const vm: ILogInVm = {Email: userName, Password: password };
    return this.http
      .post<IAuthResult>(
        `${this.baseUrl}${this.configService.getEndpoints().Auth}`,
        vm
      )
      .pipe(
        map(res => {
          localStorage.setItem('auth_token', res.auth_token);
          localStorage.setItem('user_info', JSON.stringify(res.user));
          this.loggedIn = this.isLoggedIn();
          this._authNavStatusSource.next(true);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.loggedIn = this.isLoggedIn();
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return !!localStorage.getItem('auth_token') && !!localStorage.getItem('user_info');
  }
  getToken() {
    return this.isLoggedIn() ? localStorage.getItem('auth_token') : null;
  }
  getUserInfo() {
    return this.isLoggedIn() ? JSON.parse(localStorage.getItem('user_info')) as IUser : null;
  }

}
