import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageBoxService } from '../dynamic-crud/message-dialog/MessageBox.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService, private messageBox: MessageBoxService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if ((err.status === 401 || err.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
              // auto logout if 401 response returned from api
              this.userService.logout();
              this.router.navigate(['/account/login'], {queryParams: {returnUrl: window.location.pathname}});
              // location.reload(true);
          }
          const error = err.error.message || err.statusText;
          this.messageBox.Error('Advertencia', this.handleError(err));
          return throwError(error);
      }));
  }
  private handleError(error: HttpErrorResponse): string {
        let modelStateErrors = '';
        const serverError = error.error;
        if (!serverError.type) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        if (error.status === 401 || error.status === 403) {
            modelStateErrors = 'Sesion Expirada, acceda nuevamente';
        }
        return modelStateErrors || 'Error de comunicacion, consulte a soporte';
        // return Observable.throw(modelStateErrors || 'Error de comunicacion, consulte a soporte');
    }
}
