import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IAuthResult, IUser, ILogInVm } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  baseUrl = '';
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  public User: IUser;
    // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;
  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token') && !!localStorage.getItem('user_info');
    this.User = JSON.parse(localStorage.getItem('user_info')) as IUser;
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiUri();
  }

  login(userName: string, password: string) {
    const headers = this.Header;
    const vm: ILogInVm = {Email: userName, Password: password };
    return this.http
      .post<IAuthResult>(
        `${this.baseUrl}${this.configService.getEndpoints().Auth}`,
        JSON.stringify(vm), { headers }
      )
      .pipe(
        map(res => {
          localStorage.setItem('auth_token', res.auth_token);
          localStorage.setItem('user_info', JSON.stringify(res.user));
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
  getToken() {
    return this.isLoggedIn() ? localStorage.getItem('auth_token') : null;
  }
  getUserInfo() {
    return this.isLoggedIn() ? JSON.parse(localStorage.getItem('user_info')) as IUser : null;
  }

}
