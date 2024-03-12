import { Injectable } from '@angular/core';
import { IAdminRegister, IAdminResponse, IParentRegister, IParentResponse, IStudentRegister, IStudentResponse, ITeacherRegister, ITeacherResponse, IUserRegister, IUserResponse } from '../../interfaces/signup.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from '../auth/jwt.service';
import { API_AUTH_SERVICE, API_USER_SERVICE } from '../../constants/baseurls.constant';

// const BASE_URL = ["http://localhost:8060/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BASE_URI = API_USER_SERVICE;


  constructor(private http: HttpClient,
    private authService: JwtService) { }

  registerUser(signRequest: IUserRegister, role: string): Observable<IUserResponse> {
    console.log(signRequest);
    
    switch (role) {
      case 'student':
        return this.http.post<IStudentResponse>(this.BASE_URI + 'user/register/student', signRequest);
      case 'teacher':
        return this.http.post<ITeacherResponse>(this.BASE_URI + 'user/register/teacher', signRequest);
      case 'parent':
        return this.http.post<IParentResponse>(this.BASE_URI + 'user/register/parent', signRequest);
      case 'admin':
        return this.http.post<IAdminResponse>(this.BASE_URI + 'user/register/admin', signRequest);
      default:
        throw new Error(`Invalid role: ${role}`);
    }
  }

  // change any
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.BASE_URI + 'auth/delete/' + userId);
  }

  getAdminProfile(): Observable<IAdminResponse> {
    return this.http.get<IAdminResponse>(this.BASE_URI + 'user/admin/profile');
  }

  getAllTeachers(): Observable<ITeacherResponse[]> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.get<ITeacherResponse[]>(this.BASE_URI + 'user/admin/allTeachers');
    } else {
      return of([]);
    }
  }



  // hello(): Observable<any> {
  //   const jwtToken = localStorage.getItem('jwt');
  //   if (this.authService.extractRole() === '[ADMIN]') {
  //     console.log("admin side");
  //     return this.http.get(BASE_URL + 'admin/hi '
  //     );
  //   } else {
  //     console.log("user side");
  //     return this.http.get(BASE_URL + 'test/'+ this.authService.extractUsername());
  //   }
  // }
}
