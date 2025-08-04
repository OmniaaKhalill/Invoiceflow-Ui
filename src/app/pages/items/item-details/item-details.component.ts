import { Component } from '@angular/core';
import { Item } from '../../../core/models/Item/item';
import { Router } from '@angular/router';
import { ItemService } from '../../../core/services/Item/item.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {

  Item!: Item;
    
      constructor(
        private router: Router,
        private ItemService: ItemService,
      ) {}
    
      ngOnInit(): void {
    
        const id = localStorage.getItem("itemID") ?? '';
        this.ItemService.getItemDetails(Number(id)).subscribe(data => {
          console.log(data)
          this.Item = data;
    
    
        }, error => {
          console.error('Error: ', error);
        });
    
    
      }
  
        Edit(ItemID:number){
  
      localStorage.setItem("itemID",ItemID.toString() )
      this.router.navigateByUrl("EditItem")
    }
  
      Back(): void {
      this.router.navigateByUrl("Items");
    }
    
  }
  

