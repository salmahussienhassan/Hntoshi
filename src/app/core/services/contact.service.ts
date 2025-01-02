import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = environment.apiUrlContactRequest;

  constructor(private  httpClient:HttpClient) { }

  createContact(form:any){
return this.httpClient.post(`${this.baseUrl}/Create`,form);
  }
}
