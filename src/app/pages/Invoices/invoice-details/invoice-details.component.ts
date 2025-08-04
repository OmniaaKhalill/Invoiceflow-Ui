import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { InvoiceService } from '../../../core/services/Invoice/invoice.service';
import { InvoiceDtails } from '../../../core/models/Invoice/invoice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Invoice-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Invoice-details.component.html',
  styleUrl: './Invoice-details.component.css'
})
export class InvoiceDetailsComponent {

invoice!: InvoiceDtails;
  
    constructor(
      private router: Router,
      private InvoiceService: InvoiceService,
      private sharedService:SharedService 
    ) {}
  
    ngOnInit(): void {
  
      const id = localStorage.getItem("InvoiceID") ?? '';
      this.InvoiceService.getItemDetails(Number(id)).subscribe(data => {
        console.log(data)
        this.invoice = data;
  
  
      }, error => {
        console.error('Error: ', error);
      });
  
  
    }

      Edit(InvoiceID:number){

    localStorage.setItem("InvoiceID",InvoiceID.toString() )
    this.router.navigateByUrl("EditInvoice")
  }

    Back(): void {
    this.router.navigateByUrl("Invoices");
  }
  
}
