import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CashierDtails, CashierForCreate, CashierForUpdate } from '../../models/Cashier/Cashier';

@Injectable({
  providedIn: 'root'
})
export class CashierService {

   baseUrl = environment.baseUrl;
  
    constructor(public http:HttpClient) { }
  
    GetAll(): Observable<any> {
 
        return this.http.get<any>(this.baseUrl+"/api/Cashiers" );
  
    }
  
 
    getItemDetails(id:number): Observable<any> {
    
        return this.http.get<any>(this.baseUrl+"/api/Cashiers/"+id  );
  
    }
  
  
    Delete(id:number): Observable<any> {
     
   
  return this.http.delete<any>(this.baseUrl+"/api/Cashiers/"+id  );
    
    }
  
  
    
  
  
    Create(item:CashierForCreate){
      return this.http.post<any>(this.baseUrl+"/api/Cashiers",item)
    }
  
  
    update(item:CashierForUpdate,id:number){
      return this.http.put<any>(this.baseUrl+"/api/Cashiers/"+id,item)
    }
  

  
  
  
  
  
  
  }
  

