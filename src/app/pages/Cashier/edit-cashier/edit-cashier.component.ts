import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CashierDtails, CashierForUpdate } from '../../../core/models/Cashier/Cashier';
import { Router } from '@angular/router';
import { CashierService } from '../../../core/services/Cashier/cashier.service';
import { SharedService } from '../../../core/services/Shared/shared.service';

@Component({
  selector: 'app-edit-cashier',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-cashier.component.html',
  styleUrl: './edit-cashier.component.css'
})
export class EditCashierComponent {

cashier!: CashierForUpdate;

  constructor(
    private router: Router,
    private cashierService: CashierService,
    private sharedService:SharedService 
  ) {}

  ngOnInit(): void {

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

 
     this.cashierService.Create(this.cashier).subscribe(data => {

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


