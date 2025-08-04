import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceForCreate, InvoiceForUpdate } from '../../models/Invoice/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

baseUrl = environment.baseUrl;
  
    constructor(public http:HttpClient) { }
  
    GetAll(): Observable<any> {
 
        return this.http.get<any>(this.baseUrl+"/api/Invoices" );
  
    }
  
 
    getItemDetails(id:number): Observable<any> {
    
        return this.http.get<any>(this.baseUrl+"/api/Invoices/"+id  );
  
    }
  
  
    Delete(id:number): Observable<any> {
     
   
  return this.http.delete<any>(this.baseUrl+"/api/Invoices/"+id  );
    
    }
  
  
    
  
  
    Create(item:InvoiceForCreate){
      return this.http.post<any>(this.baseUrl+"/api/Invoices",item)
    }
  
  
    update(item:InvoiceForUpdate,id:number){
      return this.http.put<any>(this.baseUrl+"/api/Invoices/"+id,item)
    }
  

  
  
  
  
  
  
  }
  

