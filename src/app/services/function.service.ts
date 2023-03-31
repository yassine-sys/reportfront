import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleFunction } from 'src/model/ModuleFunction';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private http: HttpClient) { }

  public getAllFunction():Observable<ModuleFunction[]>{
    return this.http.get<ModuleFunction[]>(`${"http://localhost:8080"}/function/list`);
  }

  public deleteFonction(id:any){
    return this .http.delete('http://localhost:8080/function/delete/'+id)
  }

  public addFonction(fonction:any) {
    return this.http.post('http://localhost:8080/function/add',fonction);
  }
  public updateFonction(id:number,fonction:any){
    return this.http.put(`${"http://localhost:8080"}/function/edit/${id}`,fonction);
  }

}
