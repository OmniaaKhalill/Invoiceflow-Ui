import { Component } from '@angular/core';
import { Item } from '../../../core/models/Item/item';
import { ItemService } from '../../../core/services/Item/item.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/common/loader/loader.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {


  entities!: Item[];
  showPopup = false;
  entityIdToDelete: number | null = null;
  isLoading = true;

  true = '../../../../assets/common/right.svg';
  false = '../../../../assets/common/wrong.svg';

  txt = '';

  constructor(
    private entityervice: ItemService,
    private router: Router,
  ) {}



  ngOnInit(): void {
   
    this.entityervice.GetAll().subscribe(
      (data) => {
        this.entities = data;

 
     

        setTimeout(() => {
          this.isLoading = false;
        }, 500);

      },
      (error) => {
    
        this.isLoading = false;
        console.error('Error: ', error);
      }
    );
  }

  Edit(itemID: number) {
    localStorage.setItem('itemID', itemID.toString());
    this.router.navigateByUrl('EditItem');
  }

  Details(itemID: number) {
    localStorage.setItem('itemID', itemID.toString());
    this.router.navigateByUrl('ItemDetails');
  }

  Add() {
    this.router.navigateByUrl('AddItem');
  }

  showConfirmPopup(itemID: number) {
    this.showPopup = true;
    this.entityIdToDelete = itemID;
  }

  confirmDelete() {
    if (this.entityIdToDelete !== null) {
      this.entityervice.Delete(this.entityIdToDelete).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
    }
    this.showPopup = false;
  }

  cancelDelete() {
    this.showPopup = false;
    this.entityIdToDelete = null;
  }
}
