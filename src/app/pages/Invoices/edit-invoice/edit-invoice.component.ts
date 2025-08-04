import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../core/services/Invoice/invoice.service';
import { ItemService } from '../../../core/services/Item/item.service';
import { CashierService } from '../../../core/services/Cashier/cashier.service';
import { BranchService } from '../../../core/services/Branch/branch.service';
import {  InvoiceForUpdate, InvoiceItem, ItemForInvoice } from '../../../core/models/Invoice/invoice';
import { Cashier } from '../../../core/models/Cashier/Cashier';
import { Branch } from '../../../core/models/Branch/branch';
import { Item } from '../../../core/models/Item/item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.css'
})
export class EditInvoiceComponent {

    cashiers!: Cashier[];
    branches!: Branch[];
      items!: Item[];
  
    itemsList: ItemForInvoice[] = [new ItemForInvoice(0, 0)];
    invoice: InvoiceForUpdate = new InvoiceForUpdate(0,'', 0, 0, this.itemsList);
  constructor(
  private router: Router,
  private route: ActivatedRoute, // <-- Injected
  private invoiceService: InvoiceService,
  private ItemService: ItemService,
  private cashierService: CashierService,
  private branchservice: BranchService
) {}

ngOnInit(): void {


 

        const id = localStorage.getItem("InvoiceID") ?? '';
            if (id) {
      this.loadInvoice(+id); // convert string to number
    }

  this.branchservice.GetAll().subscribe(
    (data) => (this.branches = data),
    (error) => console.error('Error: ', error)
  );

  this.ItemService.GetAll().subscribe(
    (data) => (this.items = data),
    (error) => console.error('Error: ', error)
  );
}

  loadInvoice(id: number): void {
  this.invoiceService.getItemDetails(id).subscribe(
    (data: any) => {
      this.invoice = new InvoiceForUpdate(
        id,
        data.customerName,
        data.cashierID,
        data.branchID,
        data.items.map((item: InvoiceItem) => new ItemForInvoice(item.id,  item.count))
      );
      console.log(this.invoice)
      this.itemsList = this.invoice.items;
      this.fetchCashiersByBranch(data.branchID); // preload cashiers for that branch
    },
    (error) => {
      console.error('Error fetching invoice: ', error);
    }
  );
}
submit(): void {
      const hasId = localStorage.getItem("InvoiceID") ?? '';

  if (hasId) {
    const id = +hasId;
    this.invoiceService.update(this.invoice,id).subscribe(
      () => {
     
        this.router.navigate(['/Invoices']);
      },
      (error) => {
        console.error('Error updating: ', error);
  
      }
    );
  } else {
    this.invoiceService.Create(this.invoice).subscribe(
      () => {
     
        this.router.navigate(['/Invoices']);
      },
      (error) => {
        console.error('Error creating: ', error);
    
      }
    );
  }
}

  Back(): void {
    this.router.navigateByUrl('Invoices');
  }

  // Add a new item row
  addItem() {
    this.itemsList.push(new ItemForInvoice(0, 0));
  }

  // Remove item by index
  removeItem(index: number) {
    this.itemsList.splice(index, 1);
  }

    Reset(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  onBranchChange(branchId: number) {
  if (branchId) {
    this.fetchCashiersByBranch(branchId);
  } else {
    this.cashiers = [];
  }
}
fetchCashiersByBranch(branchId: number) {

    this.cashierService.getCashiersByBranch(branchId).subscribe(
      (data) => {
        this.cashiers = data;

        console.log(data);
        let count = data;
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
}

}
