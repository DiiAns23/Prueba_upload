import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  private uploadUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('tipo', "1");
    console.log('Enviando la peticion')
    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    console.log('Ya se fue la peticion')
    return this.http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              console.log('Progreso: ' + Math.round((100 * event.loaded) / event.total) + '%');
              return Math.round((100 * event.loaded) / event.total);
            }
            return 0;
          case HttpEventType.Response:
            console.log('Respuesta recibida');
            return 100;
          default:
            console.log('Default')
            return 0;
        }
      })
    );
  }
}
