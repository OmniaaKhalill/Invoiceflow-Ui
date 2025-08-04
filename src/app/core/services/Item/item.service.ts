import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item, ItemForCreate } from '../../models/Item/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 baseUrl = environment.baseUrl;
  
    constructor(public http:HttpClient) { }
  
    GetAll(): Observable<any> {
 
        return this.http.get<any>(this.baseUrl+"/api/Items" );
  
    }
  
 
    getItemDetails(id:number): Observable<any> {
    
        return this.http.get<any>(this.baseUrl+"/api/Items/"+id  );
  
    }
  
  
    Delete(id:number): Observable<any> {
     
   
  return this.http.delete<any>(this.baseUrl+"/api/Items/"+id  );
    
    }
  
  
    
  
  
    Create(item:ItemForCreate){
      return this.http.post<any>(this.baseUrl+"/api/Items",item)
    }
  
  
    update(item:Item){
      return this.http.put<any>(this.baseUrl+"/api/Items",item)
    }
  
    //    getItemForUpdate(Id:string): Observable<any> {
    //   let params = new HttpParams()
    //      .set('productId', Id)
   
    //     return this.http.get<any>(this.baseUrl+"/get-product-for-update",  {params} );
  
    // }
  
  
  
  
  
  
  }
  


  

