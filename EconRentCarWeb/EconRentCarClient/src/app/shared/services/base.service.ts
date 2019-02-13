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
    return this.http.get<T[]>(`${this.baseUrl}?included=true`);
  }
  public Get(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}?included=true`);
  }

  public Post(data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}`, data);
  }

  public Put(id: string | number, data: T): Observable<number> {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(map(res => 204));
  }

  public Delete(id: string | number): Observable<number> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(map(res => 204));
  }
}
