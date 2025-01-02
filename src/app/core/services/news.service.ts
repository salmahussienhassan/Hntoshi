import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

private baseUrl=environment.apiUrlNews

  constructor(private httpClient:HttpClient ) { }

  GetNewsData(){
    return this.httpClient.get(`${this.baseUrl}/GetNewsData`)
  }
  GetNewById(id:any){
    return this.httpClient.get(`${this.baseUrl}/GetNewById/${id}`)
  }
  
}
