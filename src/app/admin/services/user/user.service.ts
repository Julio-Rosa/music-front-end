import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }







getAll(): Observable<User[]>{
  return this.http.get<User[]>(`http://localhost:8082/user/all`)
}
me():Observable<User>{
  return this.http.get<User>(`http://localhost:8082/user/me`)
}


}