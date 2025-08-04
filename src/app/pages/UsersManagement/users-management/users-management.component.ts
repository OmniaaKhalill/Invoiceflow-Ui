import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToggleFavoriteUser, User } from '../../../core/models/UserMangement/user-mangement';
import { UserMangementService } from '../../../core/services/UserMangement/user-mangement.service';
import { LoaderComponent } from '../../../shared/common/loader/loader.component';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { AuthService } from '../../../core/services/Auth/auth.service';




@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule ,FormsModule,LoaderComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent implements OnInit {
 
  isAddUser = false;
  isEditUser=false;
  entities!:User[]
 toggleFavoriteUser!:ToggleFavoriteUser
  clicked!:number
  pageSize=10
  pagesCount!:Array<number>
  isLoading=true
  showPopup = false
  entityIdToDelete=''


  isFavourite:boolean=false
  notFav="../../../../assets/common/star.svg"
  fav="../../../../assets/common/star_fill.svg"
  
 tokenRoles:string[]=[]

 
constructor(
  private userMangeService:UserMangementService, private router:Router ,private sharedService:SharedService,private authService:AuthService
){
  this.toggleFavoriteUser= new ToggleFavoriteUser("",false)
}

  ngOnInit(): void {
    this.authService.UserInfoChecker()
    this.clicked=0

    this.userMangeService.GetUsers(1,this.pageSize).subscribe(data=>{
      setTimeout(() => {
        this.isLoading=false
       }, 500);
     this.entities=data

     this.pagesCount= new Array(Math.ceil((this.entities[0].totalUsersCount)/this.pageSize))

    },
    error => { //this.sharedService.isError(true)
      this.isLoading=false
      console.error('Error: ', error)}
  
  )
  //this.tokenRoles = this.authService.getCurrentUserClaims()?.Role ?? [];
 // this.RoleComparison()

}



  addUser() {
  this.isAddUser = !this.isAddUser;

  
  }
  EditUser(userId:string){
    localStorage.setItem("userId",userId)
    this.router.navigateByUrl("EditUser")
   
  }

  More(pageNumber:number){
    this.isLoading=true
    this.clicked =pageNumber

    this.userMangeService.GetUsers(pageNumber+1,this.pageSize).subscribe(data=>{
      this.entities=data
      setTimeout(() => {
        this.isLoading=false
       }, 500);

     },
     error =>   { //this.sharedService.isError(true)
      this.isLoading=false
      console.error('Error: ', error)}
  
     
   )
  }
  favUsers(){
    this.router.navigateByUrl("FavouriteUsers")
  }


  ToggleFavorite( userId:string , IsFavoriteUser:boolean){

    this.toggleFavoriteUser.isFavoriteUser= !IsFavoriteUser
    this.toggleFavoriteUser.userId=userId
    this.userMangeService.ToggleFavoriteUser(this.toggleFavoriteUser).subscribe(data=>{
      //this.sharedService.isNotificationMessage(" User has been added to favourites ")
      //this.sharedService.isNotification(true)
  
      this.entities=data
      this.More(this.clicked)
     },
     error => 
      { //this.sharedService.isError(true)
           
             console.error('Error: ', error)}
     
   )


  }





   
  confirmDelete(){
    this.userMangeService.RemoveUser(this.entityIdToDelete).subscribe(data=>{
    // this.sharedService.isNotificationMessage("User Has been Deleted ")
     //  this.sharedService.isNotification(true)
     this.showPopup = false;
     this.sharedService.alertnMessage("Deleted successfully ")
     this.sharedService.alertColor('green')
      this.ngOnInit()
      },
      error =>{// this.sharedService.isError(true)
       this.showPopup=false
       this.sharedService.alertnMessage(" Something went wrong ")
       this.sharedService.alertColor('red')

      }
    )
   }
 



   Delete(id: string) {

    this.showPopup = true;
    this.entityIdToDelete = id;
  }



  cancelDelete() {
    this.showPopup = false;
 
  }
 



  


}

  