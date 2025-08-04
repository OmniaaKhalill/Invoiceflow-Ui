import { Component } from '@angular/core';
import { CashierForCreate } from '../../../core/models/Cashier/Cashier';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { CashierService } from '../../../core/services/Cashier/cashier.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Branch } from '../../../core/models/Branch/branch';
import { BranchService } from '../../../core/services/Branch/branch.service';

@Component({
  selector: 'app-add-cashier',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-cashier.component.html',
  styleUrl: './add-cashier.component.css'
})
export class AddCashierComponent {

 cashier!: CashierForCreate;
 branches!:Branch[]


  isPhoto=false
  displayPhoto=false
  photoUrl=''



  constructor(
    private router: Router,
    private cashierService: CashierService,
    private sharedService:SharedService ,
    private branchservice: BranchService
  ) {}

  ngOnInit(): void {

    this.cashier = new CashierForCreate("", 0)
      this.branchservice.GetAll().subscribe(data => {
        console.log(data)
        this.branches = data;
  
  
      }, error => {
        console.error('Error: ', error);
      });

  }


  

  Add(): void {
console.log(this.cashier)

 
     this.cashierService.Create(this.cashier).subscribe(data => {

      this.sharedService.alertnMessage(" cashier has been Ceated successfully ")
     this.sharedService.alertColor('green')
   this.router.navigate(['/Cashiers']).then(() => {
    
   });
    }, error => {
      console.error('Error: ', error);
        this.sharedService.alertnMessage(" Something went wrong ")
      this.sharedService.alertColor('red')
    });
 
  }


  Reset(): void {
 
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
  });

  }

  Back(): void {
    this.router.navigateByUrl("Cashiers");
  }

  Display(){
    this.displayPhoto=true
  }
  closePopup() {
    this.displayPhoto=false // Reset photo to close the popup
  }
}

