import { Observable } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BaseData, BaseSecureHttpService } from '../dynamic-crud/models';
import { ConfigService } from '../utils/config.service';
import { map } from 'rxjs/operators';


export abstract class BaseService<T extends BaseData> implements BaseSecureHttpService<T> {
  private baseUrl: string;
  constructor(private http: HttpClient, private configService: ConfigService, url: string) {
    this.baseUrl = `${configService.getApiUri()}/${url}`;
  }

  public GetAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}`);
  }
  public Get(data: T): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${data.Id}`);
  }

  public Post(data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}`, data);
  }

  public Put(data: T): Observable<number> {
    return this.http.put(`${this.baseUrl}/${data.Id}`, data).pipe(map(res => 204));
  }

  public Delete(data: T): Observable<number> {
    return this.http.delete(`${this.baseUrl}/${data.Id}`).pipe(map(res => 204));
  }
}
