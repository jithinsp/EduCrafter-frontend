import { Injectable } from '@angular/core';
import { JwtService } from '../auth/jwt.service';
import { Observable, of } from 'rxjs';

import { ITeacherResponse } from '../../interfaces/signup.interface';
import { HttpClient } from '@angular/common/http';
import { API_ACADEMICS_SERVICE } from '../../constants/baseurls.constant';

@Injectable({
  providedIn: 'root'
})
export class AcademicsService {

  constructor(private http: HttpClient,
    private authService: JwtService) { }

  BASE_URI = API_ACADEMICS_SERVICE;

  getAllClasses(): Observable<ITeacherResponse[]> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]' || this.authService.extractRole() === '[TEACHER]') {
      return this.http.get<ITeacherResponse[]>(this.BASE_URI + 'academics/classes/getAll');
    } else {
      return of([]);
    }
  }

  getClass(editId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]' || this.authService.extractRole() === '[TEACHER]') {
      return this.http.get(this.BASE_URI + 'academics/classes/get/' + editId);
    } else {
      return of([]);
    }
  }

  deleteClasses(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/classes/delete/' + item.id, item);
    } else {
      return of([]);
    }
  }

  toggleClass(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/classes/toggle/' + item.id, item);
    } else {
      return of([]);
    }
  }

  createClass(value: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      // console.log(item.id);
      return this.http.post<any[]>(this.BASE_URI + 'academics/classes/addNew', value);
    } else {
      return of([]);
    }

  }

  editClasses(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/classes/editClass/' + item.id, item);
    } else {
      return of([]);
    }
  }

  //Subjects
  getAllSubjects(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]' || this.authService.extractRole() === '[TEACHER]') {
      return this.http.get<any>(this.BASE_URI + 'academics/subjects/getAll');
    } else {
      return of([]);
    }
  }

  getSubject(editId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.get(this.BASE_URI + 'academics/subjects/get/' + editId);
    } else {
      return of([]);
    }
  }

  deleteSubjects(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/subjects/delete/' + item.id, item);
    } else {
      return of([]);
    }
  }

  toggleSubjects(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/subjects/toggle/' + item.id, item);
    } else {
      return of([]);
    }
  }

  createSubjects(value: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      // console.log(item.id);
      return this.http.post<any[]>(this.BASE_URI + 'academics/subjects/addNew', value);
    } else {
      return of([]);
    }

  }

  editSubjects(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/subjects/editSubject/' + item.id, item);
    } else {
      return of([]);
    }
  }

  //Results
  getAllResults(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]' || this.authService.extractRole() === '[TEACHER]') {
      return this.http.get<any>(this.BASE_URI + 'academics/results/getAll');
    } else {
      return of([]);
    }
  }

  getResults(editId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.get(this.BASE_URI + 'academics/results/get/' + editId);
    } else {
      return of([]);
    }
  }

  deleteResults(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/results/delete/' + item.id, item);
    } else {
      return of([]);
    }
  }

  toggleResults(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/results/toggle/' + item.id, item);
    } else {
      return of([]);
    }
  }

  createResults(value: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      // console.log(item.id);
      return this.http.post<any[]>(this.BASE_URI + 'academics/results/addNew', value);
    } else {
      return of([]);
    }

  }

  editResults(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/results/edit/' + item.id, item);
    } else {
      return of([]);
    }
  }

  //Exams
  getAllExams(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]' || this.authService.extractRole() === '[TEACHER]') {
      return this.http.get<any>(this.BASE_URI + 'academics/exam/getAll');
    } else {
      return of([]);
    }
  }

  getExams(editId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.get(this.BASE_URI + 'academics/exam/get/' + editId);
    } else {
      return of([]);
    }
  }

  deleteExams(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/exam/delete/' + item.id, item);
    } else {
      return of([]);
    }
  }

  toggleExams(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/exam/toggle/' + item.id, item);
    } else {
      return of([]);
    }
  }

  createExams(value: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      // console.log(item.id);
      return this.http.post<any[]>(this.BASE_URI + 'academics/exam/addNew', value);
    } else {
      return of([]);
    }
  }

  editExams(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/exam/edit/' + item.id, item);
    } else {
      return of([]);
    }
  }

  //Slots
  getAllSlots(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]' || this.authService.extractRole() === '[TEACHER]') {
      return this.http.get<any>(this.BASE_URI + 'academics/slot/getAll');
    } else {
      return of([]);
    }
  }

  getSlots(editId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.get(this.BASE_URI + 'academics/slot/get/' + editId);
    } else {
      return of([]);
    }
  }

  deleteSlots(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/slot/delete/' + item.id, item);
    } else {
      return of([]);
    }
  }

  toggleSlots(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/slot/toggle/' + item.id, item);
    } else {
      return of([]);
    }
  }

  createSlots(value: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.post<any[]>(this.BASE_URI + 'academics/slot/addNew', value);
    } else {
      return of([]);
    }
  }

  editSlots(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/slot/edit/' + item.id, item);
    } else {
      return of([]);
    }
  }

  //Timetable
  getAllTimetable(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]' || this.authService.extractRole() === '[TEACHER]') {
      return this.http.get<any>(this.BASE_URI + 'academics/timetable/getAll');
    } else {
      return of([]);
    }
  }

  getTimetable(editId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.get(this.BASE_URI + 'academics/timetable/get/' + editId);
    } else {
      return of([]);
    }
  }

  deleteTimetable(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/timetable/delete/' + item.id, item);
    } else {
      return of([]);
    }
  }

  toggleTimetable(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/timetable/toggle/' + item.id, item);
    } else {
      return of([]);
    }
  }

  createTimetable(value: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      return this.http.post<any[]>(this.BASE_URI + 'academics/timetable/addNew', value);
    } else {
      return of([]);
    }
  }

  editTimetable(item: any) {
    const jwtToken = localStorage.getItem('jwt');
    if (this.authService.extractRole() === '[ADMIN]') {
      console.log(item.id);
      return this.http.put<any[]>(this.BASE_URI + 'academics/timetable/edit/' + item.id, item);
    } else {
      return of([]);
    }
  }
}
