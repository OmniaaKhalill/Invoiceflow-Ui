import { Component } from '@angular/core';
import { Cashier } from '../../../core/models/Cashier/Cashier';
import { CashierService } from '../../../core/services/Cashier/cashier.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { LoaderComponent } from '../../../shared/common/loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoSearchMatchComponent } from '../../../shared/common/no-search-match/no-search-match.component';

@Component({
  selector: 'app-cashiers',
  standalone: true,
  imports: [LoaderComponent, CommonModule,FormsModule,NoSearchMatchComponent],
  templateUrl: './cashiers.component.html',
  styleUrl: './cashiers.component.css'
})
export class CashiersComponent {

clicked!:number
  pageSize=10
  pagesCount!:Array<number>
  entities!:Cashier[]
  showPopup = false;
  entityIdToDelete: number | null = null;
  isLoading= true;

  true="../../../../assets/common/right.svg"
  false="../../../../assets/common/wrong.svg"
  
txt=''
 
    constructor(private cashierService:CashierService, private router:Router,private sharedService:SharedService ){

  }
  searchText = '';
noMatchFound=false
  search() { 


    this.clicked=0
    this.cashierService.GetAll().subscribe(data=>{

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
    this.cashierService.GetAll().subscribe(data=>{
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

  Edit(cashierID:number){

    localStorage.setItem("cashierID",cashierID.toString() )
    this.router.navigateByUrl("EditCashier")
  }

  Details(cashierID:number){

    localStorage.setItem("cashierID",cashierID.toString() )
    this.router.navigateByUrl("CashierDetails")
  }
  



Add(){
    this.router.navigateByUrl("AddCashier")
  }


  showConfirmPopup(cashierID:number) {

    this.showPopup = true;
    this.entityIdToDelete = cashierID;
  }

  confirmDelete() {
    if (this.entityIdToDelete !== null) {
      this.cashierService.Delete(this.entityIdToDelete).subscribe(data => {
  
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

