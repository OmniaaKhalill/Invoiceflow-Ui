import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToggleFavoriteUser, User } from '../../../core/models/UserMangement/user-mangement';
import { UserMangementService } from '../../../core/services/UserMangement/user-mangement.service';
import { LoaderComponent } from '../../../shared/common/loader/loader.component';
import { AuthService } from '../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-favourite-users',
  standalone: true,
  imports: [CommonModule,FormsModule, LoaderComponent],
  templateUrl: './favourite-users.component.html',
  styleUrl: './favourite-users.component.scss'
})
export class FavouriteUsersComponent implements OnInit {


  entities!:User[]
    isLoading=true
    toggleFavoriteUser!:ToggleFavoriteUser
    fav="../../../assets/hospital-detes/star_fill.svg"
  
  
    constructor(private userMangeService:UserMangementService,private router:Router,private authService:AuthService ){  this.toggleFavoriteUser= new ToggleFavoriteUser("",false)}
  
    ngOnInit(): void {
      this.authService.UserInfoChecker()
      this.userMangeService.GetFavoriteUsers().subscribe(data=>{
        setTimeout(() => {
          this.isLoading=false
         }, 300);
        this.entities=data
        

   
       },
       error => 
        { //this.sharedService.isError(true)
       this.isLoading=false
       console.error('Error: ', error)}
     )
    }
  
  
  
    UsersManagment(){
  this.router.navigateByUrl("UsersManagement")
    }
  
  
    RemoveFromFavorite(userId :string){
      this.toggleFavoriteUser.isFavoriteUser= false
      this.toggleFavoriteUser.userId=userId
    
      this.userMangeService.ToggleFavoriteUser(this.toggleFavoriteUser).subscribe(data=>{
        this.entities=data
        //this.sharedService.isNotificationMessage("User Has been removed from favourites ")
      //this.sharedService.isNotification(true)
      this.ngOnInit()

       },
       error => 
        { //this.sharedService.isError(true)
   
       console.error('Error: ', error)}
       
     )
    }

    Back(){
      this.router.navigateByUrl("UsersManagement")
    }
  }