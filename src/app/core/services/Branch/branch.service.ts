import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  baseUrl = environment.baseUrl;
   constructor(public http:HttpClient) { }
  
    GetAll(): Observable<any> {
 
        return this.http.get<any>(this.baseUrl+"/api/Branches" );
  
    }
  
 
    getItemDetails(id:number): Observable<any> {
    
        return this.http.get<any>(this.baseUrl+"/api/Branches/"+id  );
  
    }
}
