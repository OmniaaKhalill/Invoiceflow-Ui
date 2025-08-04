import { Component } from '@angular/core';
import { Invoice } from '../../../core/models/Invoice/invoice';
import { InvoiceService } from '../../../core/services/Invoice/invoice.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/common/loader/loader.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule,FormsModule,LoaderComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
clicked!:number
  pageSize=10
  pagesCount!:Array<number>
  entities!:Invoice[]
  showPopup = false;
  entityIdToDelete: number | null = null;
  isLoading= true;

  true="../../../../assets/common/right.svg"
  false="../../../../assets/common/wrong.svg"
  
txt=''
 
    constructor(private InvoiceService:InvoiceService, private router:Router,private sharedService:SharedService ){

  }
  searchText = '';
noMatchFound=false
  search() { 


    this.clicked=0
    this.InvoiceService.GetAll().subscribe(data=>{

     this.entities=data
     let count = data.length

 
     setTimeout(() => {
       this.isLoading=false
     }, 500);
      if(data.extra.count==0)
        this.noMatchFound=true
 
 
    },
    error => {
      // { this..isError(true)
      this.isLoading=false
     console.error('Error: ', error)
    }
  )
   }



  ngOnInit(): void {

    this.clicked=0
    this.InvoiceService.GetAll().subscribe(data=>{
      this.noMatchFound=false
     this.entities=data

     console.log(data)
     let count = data
 
     setTimeout(() => {
       this.isLoading=false
     }, 500);
  
 
     this.pagesCount= new Array(Math.ceil((count/this.pageSize)));
    },
    error => {
      // { this..isError(true)
      this.isLoading=false
     console.error('Error: ', error)
    }
  )
  }

  Edit(InvoiceID:number){

    localStorage.setItem("InvoiceID",InvoiceID.toString() )
    this.router.navigateByUrl("EditInvoice")
  }

  Details(InvoiceID:number){

    localStorage.setItem("InvoiceID",InvoiceID.toString() )
    this.router.navigateByUrl("InvoiceDetails")
  }
  



Add(){
    this.router.navigateByUrl("AddInvoice")
  }


  showConfirmPopup(InvoiceID:number) {

    this.showPopup = true;
    this.entityIdToDelete = InvoiceID;
  }

  confirmDelete() {
    if (this.entityIdToDelete !== null) {
      this.InvoiceService.Delete(this.entityIdToDelete).subscribe(data => {
  
        this.showPopup = false;
        this.sharedService.alertnMessage("Deleted successfully ")
        this.sharedService.alertColor('green')
 this.ngOnInit()
  
       }, error => {
        this.sharedService.alertnMessage(" Something went wrong ")
          this.sharedService.alertColor('red')
         console.error('Error: ', error);
       });
    }
    this.showPopup = false;
  }

  cancelDelete() {
    this.showPopup = false;
    this.entityIdToDelete = null;
  }

}


