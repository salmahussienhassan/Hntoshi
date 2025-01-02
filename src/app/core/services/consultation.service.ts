import { Injectable } from '@angular/core';
import { environment } from '../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

 private baseUrl = environment.apiUrlConsultation;

  constructor(private  httpClient:HttpClient) { }

  createConsultation(form:any){
return this.httpClient.post(`${this.baseUrl}/Create`,form);
  }
  
}
