import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CashierDtails, CashierForUpdate } from '../../../core/models/Cashier/Cashier';
import { Router } from '@angular/router';
import { CashierService } from '../../../core/services/Cashier/cashier.service';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { BranchService } from '../../../core/services/Branch/branch.service';
import { Branch } from '../../../core/models/Branch/branch';

@Component({
  selector: 'app-edit-cashier',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-cashier.component.html',
  styleUrl: './edit-cashier.component.css'
})
export class EditCashierComponent {

cashier!: CashierForUpdate;
 branches!:Branch[]
  constructor(
    private router: Router,
    private cashierService: CashierService,
    private sharedService:SharedService ,
        private branchservice: BranchService
  ) {}

  ngOnInit(): void {

    
       
          this.branchservice.GetAll().subscribe(data => {
            console.log(data)
            this.branches = data;
      
      
          }, error => {
            console.error('Error: ', error);
          });

    const id = localStorage.getItem("cashierID") ?? '';
    this.cashierService.getItemDetails(Number(id)).subscribe(data => {
      console.log(data)
      this.cashier = data;


    }, error => {
      console.error('Error: ', error);
    });


  }


  

  Edit(): void {
console.log(this.cashier)

 
     this.cashierService.update(this.cashier,this.cashier.id).subscribe(data => {

      this.sharedService.alertnMessage(" cashier has been updated successfully ")
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



}


