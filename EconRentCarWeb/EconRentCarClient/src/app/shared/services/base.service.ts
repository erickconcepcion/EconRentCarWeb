import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


export abstract class BaseService {
    protected Header: HttpHeaders;
    constructor() {
        this.Header = new HttpHeaders();
        this.Header.append('Content-Type', 'application/json');
    }

    protected handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    console.log(error, applicationError);
    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    let modelStateErrors = '';
    const serverError = error;

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
    return Observable.throw(modelStateErrors || 'Error de comunicacion, consulte a soporte');
  }
}
