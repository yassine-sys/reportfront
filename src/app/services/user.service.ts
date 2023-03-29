import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public getAllUsers ():Observable<User[]>{
    return this.http.get<User[]>(`${"http://localhost:8080"}/user`);
  }

  public deleteUser(id:any){
    return this .http.delete('http://localhost:8080/user/delete/'+id)
  }
}
