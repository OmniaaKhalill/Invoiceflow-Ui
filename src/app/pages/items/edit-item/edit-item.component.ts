import { Component } from '@angular/core';
import { Item } from '../../../core/models/Item/item';
import { Router } from '@angular/router';
import { ItemService } from '../../../core/services/Item/item.service';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl:  './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {

item!: Item;



  isPhoto=false
  displayPhoto=false
  photoUrl=''



  constructor(
    private router: Router,
    private ItemService: ItemService,
    private sharedService:SharedService ,

  ) {}

  ngOnInit(): void {

    this.item = new Item(0,"", 0)

    const id = localStorage.getItem("itemID") ?? '';
    this.ItemService.getItemDetails(Number(id)).subscribe(data => {
      console.log(data)
      this.item = data;


    }, error => {
      console.error('Error: ', error);
    });

  }


  

  Add(): void {
console.log(this.item)

 
     this.ItemService.update(this.item, this.item.id).subscribe(data => {

      this.sharedService.alertnMessage(" Item has been Ceated successfully ")
     this.sharedService.alertColor('green')
   this.router.navigate(['/Items']).then(() => {
    
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
    this.router.navigateByUrl("Items");
  }

  Display(){
    this.displayPhoto=true
  }
  closePopup() {
    this.displayPhoto=false // Reset photo to close the popup
  }
}


