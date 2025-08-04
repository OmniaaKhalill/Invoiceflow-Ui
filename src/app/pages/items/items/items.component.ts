import { Component } from '@angular/core';
import { Item } from '../../../core/models/Item/item';
import { ItemService } from '../../../core/services/Item/item.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/common/loader/loader.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule,FormsModule,LoaderComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
clicked!:number
  pageSize=10
  pagesCount!:Array<number>

  entities!:Item[]
  showPopup = false;
  entityIdToDelete: number | null = null;
  isLoading= true;

  true="../../../../assets/common/right.svg"
  false="../../../../assets/common/wrong.svg"
  
txt=''
 
    constructor(private entityervice:ItemService, private router:Router,private sharedService:SharedService ){

  }
  searchText = '';
noMatchFound=false
  search() { 



    this.entityervice.GetAll().subscribe(data=>{

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
    this.entityervice.GetAll().subscribe(data=>{
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

  Edit(itemID:number){

    localStorage.setItem("itemID",itemID.toString() )
    this.router.navigateByUrl("EditItem")
  }

  Details(itemID:number){

    localStorage.setItem("itemID",itemID.toString() )
    this.router.navigateByUrl("ItemDetails")
  }
  



Add(){
    this.router.navigateByUrl("AddItem")
  }


  showConfirmPopup(itemID:number) {

    this.showPopup = true;
    this.entityIdToDelete = itemID;
  }

  confirmDelete() {
    if (this.entityIdToDelete !== null) {
      this.entityervice.Delete(this.entityIdToDelete).subscribe(data => {
  
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

