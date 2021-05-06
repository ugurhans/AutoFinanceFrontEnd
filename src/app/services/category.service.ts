import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl="https://localhost:44376/api/";

  constructor(private httpClient:HttpClient) { }

  getCategory():Observable<ListResponseModel<Category>>{
    let newPath  = this.apiUrl + "categories/getall" 
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
}
