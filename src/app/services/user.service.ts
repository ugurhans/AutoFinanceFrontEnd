import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44376/api/users";
  constructor(private httpClient: HttpClient) { }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newUrl = this.apiUrl+'getuserbyid?id='+userId;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }

  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl+'getbymail?email='+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user:User):Observable<ResponseModel>{
    let newUrl= this.apiUrl+"updateuser";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }
 
}
