import { Component } from '@angular/core';
import { ChangePhoneAndEmail, UserData } from '../../../core/models/UserMangement/user-mangement';
import { UserMangementService } from '../../../core/services/UserMangement/user-mangement.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { AuthService } from '../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  User!:UserData
  updatedUser!:ChangePhoneAndEmail
  isShown=true
  constructor( private userMangeService:UserMangementService ,private router:Router,private sharedService:SharedService ,private authService:AuthService ){

    this.updatedUser=new  ChangePhoneAndEmail("","","")
  }

  ngOnInit(): void {
    this.authService.UserInfoChecker()
  let userId = localStorage.getItem("userId")
  if(userId){
    this.userMangeService.GetUserData(userId).subscribe(data=>{
      this.User=data

 
     },
     error => { //this.sharedService.isError(true)
     
      console.error('Error: ', error)}
   )
  }


 
  }

  onSubmit(): void {
    let userId = localStorage.getItem("userId")
if(userId)
    this.updatedUser.userId =  userId
    this.updatedUser.email= this.User.email
    this.updatedUser.phone= this.User.phoneNumber

    this.userMangeService.ChangePhoneAndEmail(this.updatedUser).subscribe(data=>{
      //this.sharedService.isNotificationMessage(" User has been updated successfully ")
      //this.sharedService.isNotification(true)
this.router.navigate(['/UsersManagement']).then(() => {
  this.router.navigateByUrl(this.router.url + '/'); // Adds the trailing slash
});
    this.isShown=false
    this.sharedService.alertnMessage("User has been updated")
    this.sharedService.alertColor('green')
   },
   error => { //this.sharedService.isError(true)
    this.sharedService.alertnMessage(" Something went wrong ")
    this.sharedService.alertColor('red')
    }
 )
  }

  Reset(): void {

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
    });  }


    Back(){
      this.router.navigateByUrl("UsersManagement")
    }
}


