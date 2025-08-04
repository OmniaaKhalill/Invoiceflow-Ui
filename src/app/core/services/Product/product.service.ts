import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductForCreate , ProductForUpdate, ProductToCreate, ProductToUpdate } from '../../models/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(public http:HttpClient) { }

  getItemByPage(pageNumber:number,pageSize:number, keyword:string): Observable<any> {
    let params = new HttpParams()
       .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('keyword', keyword)
      return this.http.get<any>(this.baseUrl+"/admin-products",  {params} );

  }

  getItemForUpdate(Id:string): Observable<any> {
    let params = new HttpParams()
       .set('productId', Id)
 
      return this.http.get<any>(this.baseUrl+"/get-product-for-update",  {params} );

  }


  getItemDetails(productId:string): Observable<any> {
    let params = new HttpParams()
       .set('productId', productId)
 
      return this.http.get<any>(this.baseUrl+"/product-details",  {params} );

  }


  Delete(Id:string): Observable<any> {
    let params = new HttpParams()
       .set('productId', Id)
 
      return this.http.delete<any>(this.baseUrl+"/delete-product",  {params} );

  }

  
  getCategories(): Observable<any> {
   
      return this.http.get<any>(this.baseUrl+"/admin-categories" );

  }

  updateProductUploadPhoto( photoAndLogo:FormData){
    console.log(photoAndLogo)
        return this.http.put<any>(`${this.baseUrl}/update-product-upload-photo`, photoAndLogo );
      }

   
  getOccasions(): Observable<any> {
    return this.http.get<any>(this.baseUrl+"/admin-Occasions" );
  }
  


  createProduct(item:ProductToCreate){
    return this.http.post<any>(this.baseUrl+"/create-product",item)
  }


  updateProduct(item:ProductToUpdate){
    return this.http.put<any>(this.baseUrl+"/update-product",item)
  }







}
