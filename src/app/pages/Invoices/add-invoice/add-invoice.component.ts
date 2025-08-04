import { Component } from '@angular/core';
import { InvoiceForCreate, Item } from '../../../core/models/Invoice/invoice';
import { Router } from '@angular/router';
import { ItemService } from '../../../core/services/Item/item.service';
import { InvoiceService } from '../../../core/services/Invoice/invoice.service';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { BranchService } from '../../../core/services/Branch/branch.service';
import { CashierService } from '../../../core/services/Cashier/cashier.service';
import { Cashier } from '../../../core/models/Cashier/Cashier';
import { Branch } from '../../../core/models/Branch/branch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent {
cashier!: Cashier;
 branches!:Branch[]
 
  itemsList: Item[] = [new Item(0,0)];
  invoice: InvoiceForCreate = new InvoiceForCreate("",0,0,this.itemsList);

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private sharedService:SharedService ,
    private ItemService: ItemService,
    private cashierService: CashierService,
        private branchservice: BranchService

      
  ) {}

  ngOnInit(): void {

// based on branch the cashiers appears
      this.branchservice.GetAll().subscribe(data => {
        console.log(data)
        this.branches = data;
  
  
      }, error => {
        console.error('Error: ', error);
      });





  }


  

  Add(): void {
console.log(this.cashier)

 
     this.invoiceService.Create(this.invoice).subscribe(data => {

      this.sharedService.alertnMessage(" Invoice has been Ceated successfully ")
     this.sharedService.alertColor('green')
   this.router.navigate(['/Invoices']).then(() => {
    
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
    this.router.navigateByUrl("Invoices");
  }





  // Add a new item row
  addItem() {
    this.itemsList.push(new Item(0,0));
  }

  // Remove item by index
  removeItem(index: number) {
    this.itemsList.splice(index, 1);
  }

  // Submit invoice
  // Add() {
  //   this.invoice.items = this.itemsList;

  //   // Call service to send invoice to backend
  //   console.log(this.invoice);

  //   // Reset if needed
  //   // this.invoice = new Invoice();
  //   // this.itemsList = [new InvoiceItem()];
  // }
}
