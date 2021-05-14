import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { OperationClaimDto } from '../models/operationClaimDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserDto } from '../models/UserDto';
import { UserOperationClaim } from '../models/userOperationClaims';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44376/api/users";
  constructor(private httpClient: HttpClient) { }


  getAll():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl+'/getallusers';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }


  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl+'/getuserbymail?email='+ email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }


  getAllDto():Observable<ListResponseModel<UserDto>>{
    let newPath = this.apiUrl+'/getallusersdto';
    return this.httpClient.get<ListResponseModel<UserDto>>(newPath);
  }


  getDtoByEmail(email:string):Observable<SingleResponseModel<UserDto>>{
    let newPath = this.apiUrl+'/getuserdtobymail?email='+ email;
    return this.httpClient.get<SingleResponseModel<UserDto>>(newPath);
  }

  update(user:User):Observable<ResponseModel>{
    let newUrl= this.apiUrl+"/updateuser";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }


  delete(user:User):Observable<ResponseModel>{
    let newUrl= this.apiUrl+"/deleteuser";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }
 
  getUserClaimsById(userId: number): Observable<ListResponseModel<OperationClaimDto>> {
    let newPath = this.apiUrl + '/getclaimsdtobyid?userid=' + userId;
    return this.httpClient.get<ListResponseModel<OperationClaimDto>>(newPath);
  }

  getAllClaims(): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + '/getalloperationclaims';
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }


  addClaim(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/adduseroperationclaims';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }
}
