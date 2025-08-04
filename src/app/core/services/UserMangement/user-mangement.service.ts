import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangePhoneAndEmail, ToggleFavoriteUser } from '../../models/UserMangement/user-mangement';

@Injectable({
  providedIn: 'root'
})
export class UserMangementService {
  baseUrl = environment.baseUrl +"/api/usersManagement"

  GetUsers(pageNumber:number,pageSize:number): Observable<any> {
    let params = new HttpParams()
       .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
      return this.http.get<any>(this.baseUrl+"/GetUsers",  {params} );

  }

  GetFavoriteUsers(): Observable<any> {
   
    return this.http.get<any>(this.baseUrl+"/GetFavoriteUsers",  );
}

  GetUserData( id:string): Observable<any> {
    let params = new HttpParams()
    .set('userId', id)

    return this.http.get<any>(`${this.baseUrl}/GetUserData` , {params});
  }


 ChangePhoneAndEmail(updatedUser:ChangePhoneAndEmail): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/ChangePhoneAndEmail`,updatedUser );

 }



 ToggleFavoriteUser( toggleFavoriteUser:ToggleFavoriteUser): Observable<any> {

      return this.http.put<any>(`${this.baseUrl}/ToggleFavoriteUser`, toggleFavoriteUser );
}
 
 RemoveUser( id:string): Observable<any> {
    let params = new HttpParams()
       .set('userId', id)
  return this.http.delete<any>(`${this.baseUrl}/RemoveUser`, {params} );
}
constructor(public http:HttpClient) { }
}
