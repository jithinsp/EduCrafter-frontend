import { Injectable } from '@angular/core';
import { API_ACADEMICS_SERVICE } from '../../constants/baseurls.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  BASE_URI = API_ACADEMICS_SERVICE;

  getFile(item: any): Observable<any> {
    const options = {
      responseType: 'blob' as 'json',
    };
    return this.http.get(this.BASE_URI + 'academics/resources/files/' + item.filepath, options);
  }

  constructor(private http: HttpClient) {}

  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URI + 'academics/resources/listAll');
  }

  uploadFile(formData: FormData): Observable<any> {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // const formData = new FormData();
    // formData.append('file', file);
    console.log(formData);
    
    return this.http.post(this.BASE_URI + 'academics/resources/upload', formData);
  }

  // uploadFile(file: File): Observable<any> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   console.log(formData);
    
  //   return this.http.post(BASE_URL + 'academics/resources/upload', formData);
  // }

  deleteResource(item: any) {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/resources/delete/' + item.id, item);
  }

  toggleResource(item: any) {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/resources/toggle/' + item.id, item);
  }
}
