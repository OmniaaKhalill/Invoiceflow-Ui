import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CashierDtails } from '../../../core/models/Cashier/Cashier';
import { CashierService } from '../../../core/services/Cashier/cashier.service';

@Component({
  selector: 'app-cashier-details',
  standalone: true,
  imports: [],
  templateUrl: './cashier-details.component.html',
  styleUrl: './cashier-details.component.css'
})
export class CashierDetailsComponent {

  cashier!: CashierDtails;
  
    constructor(
      private router: Router,
      private cashierService: CashierService,
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

      Edit(cashierID:number){

    localStorage.setItem("cashierID",cashierID.toString() )
    this.router.navigateByUrl("EditCashier")
  }

    Back(): void {
    this.router.navigateByUrl("Cashiers");
  }
  
}
