import { Component } from '@angular/core';
import { ItemForCreate } from '../../../core/models/Item/item';
import { Router } from '@angular/router';
import { ItemService } from '../../../core/services/Item/item.service';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

Item!: ItemForCreate;



  isPhoto=false
  displayPhoto=false
  photoUrl=''



  constructor(
    private router: Router,
    private ItemService: ItemService,
    private sharedService:SharedService ,

  ) {}

  ngOnInit(): void {

    this.Item = new ItemForCreate("", 0)


  }


  

  Add(): void {
console.log(this.Item)

 
     this.ItemService.Create(this.Item).subscribe(data => {

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

