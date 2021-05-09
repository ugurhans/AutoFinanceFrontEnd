import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44376/api/users";
  constructor(private httpClient: HttpClient) { }

  // getUserById(userId: number): Observable<SingleResponseModel<User>> {
  //   let newUrl = this.apiUrl+'getuserbyid?id='+userId;
  //   return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  // }

  getAll():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl+'/getallusers';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl+'/getuserbymail?email='+ email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user:User):Observable<ResponseModel>{
    let newUrl= this.apiUrl+"updateuser";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }
 
  getUserClaims(user: User): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'users/getuserclaims?userId=' + user.id;//backend
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }
}
