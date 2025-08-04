export class User {
    constructor(
     public userId:string,
     public name:string,
     public email:string,
     public phoneNumber:string,
     public joiningDate:string,
     public isFavoriteUser:boolean,
     public totalUsersCount:number,
    ){}
 }
 
 
 export  class  UserData{
     constructor(
         public userId:string,
         public name:string,
         public email:string,
         public phoneNumber:string,
         public isSuccess:boolean,
     ){}
 }
 
 
 export class ToggleFavoriteUser{
     constructor(
         public  userId:string,
         public  isFavoriteUser:boolean
     ){}
 }
 
 export  class  ChangePhoneAndEmail{
     constructor(
         public userId:string,
         public email:string,
         public phone:string,
   
     ){}
 }
