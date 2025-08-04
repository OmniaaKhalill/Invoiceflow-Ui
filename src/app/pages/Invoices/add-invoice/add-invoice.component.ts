import { Component } from '@angular/core';
import { InvoiceForCreate, ItemForInvoice } from '../../../core/models/Invoice/invoice';
import { Router } from '@angular/router';
import { ItemService } from '../../../core/services/Item/item.service';
import { InvoiceService } from '../../../core/services/Invoice/invoice.service';
import { BranchService } from '../../../core/services/Branch/branch.service';
import { CashierService } from '../../../core/services/Cashier/cashier.service';
import { Cashier } from '../../../core/models/Cashier/Cashier';
import { Branch } from '../../../core/models/Branch/branch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/models/Item/item';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css',
})
export class AddInvoiceComponent {
  cashiers!: Cashier[];
  branches!: Branch[];
    items!: Item[];

  itemsList: ItemForInvoice[] = [new ItemForInvoice(0, 0)];
  invoice: InvoiceForCreate = new InvoiceForCreate('', 0, 0, this.itemsList);

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,

    private ItemService: ItemService,
    private cashierService: CashierService,
    private branchservice: BranchService
  ) {}

  ngOnInit(): void {
    // based on branch the cashiers appears
    this.branchservice.GetAll().subscribe(
      (data) => {
        console.log(data);
        this.branches = data;
      },
      (error) => {
        console.error('Error: ', error);
      }
    );





   this.ItemService.GetAll().subscribe(
      (data) => {
      this.items = data;
      console.log(data);
   

      

      },
      (error) => {
   
        console.error('Error: ', error);
      }
    );

  }

  Add(): void {
    this.invoiceService.Create(this.invoice).subscribe(
      (data) => {
  
  
      },
      (error) => {
        console.error('Error: ', error);

      }
    );
  }

  Reset(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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
