import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokemModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44376/api/auth";
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + '/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + '/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      registerModel
    );
  }


  isAuthenticated() {
    if (this.localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  }
}
