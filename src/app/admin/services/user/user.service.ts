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

new(body:any):Observable<User>{
  return this.http.post<User>(`http://localhost:8082/user/new`, body)
}
deleteById(id:string):Observable<any>{
  
  return this.http.delete<any>(`http://localhost:8082/user/${id}`)
}


}