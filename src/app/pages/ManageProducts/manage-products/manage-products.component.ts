import { CommonModule } from '@angular/common';
import { Comment } from '@angular/compiler';
import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/Product/product.service';
import { Product } from '../../../core/models/Product/product';
import { Route, Router } from '@angular/router';
import { LoaderComponent } from '../../../shared/common/loader/loader.component';
import { SharedService } from '../../../core/services/Shared/shared.service';
import { FormsModule } from '@angular/forms';
import { NoSearchMatchComponent } from '../../../shared/common/no-search-match/no-search-match.component';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, LoaderComponent, FormsModule, NoSearchMatchComponent],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss',
})
export class ManageProductsComponent {
  clicked!: number;
  pageSize = 10;
  pagesCount!: Array<number>;
  entities!: Product[];
  showPopup = false;
  entityIdToDelete: string | null = null;
  isLoading = true;

  true = '../../../../assets/common/right.svg';
  false = '../../../../assets/common/wrong.svg';

  txt = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private sharedService: SharedService
  ) {}
  searchText = '';
  noMatchFound = false;
  search() {
    this.clicked = 0;
    this.productService
      .getItemByPage(1, this.pageSize, this.searchText)
      .subscribe(
        (data) => {
          this.entities = data;
          let count = data;

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          if (data.extra.count == 0) this.noMatchFound = true;

          this.pagesCount = new Array(Math.ceil(count / this.pageSize));
        },
        (error) => {
          // { this..isError(true)
          this.isLoading = false;
          console.error('Error: ', error);
        }
      );
  }

  reset() {
    if (this.searchText == '') {
      this.noMatchFound = false;
      this.clicked = 0;
      this.productService.getItemByPage(1, this.pageSize, '').subscribe(
        (data) => {
          this.entities = data.extra.items;
          let count = data.extra.count;

          setTimeout(() => {
            this.isLoading = false;
          }, 500);

          this.pagesCount = new Array(Math.ceil(count / this.pageSize));
        },
        (error) => {
          // { this..isError(true)
          this.isLoading = false;
          console.error('Error: ', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.clicked = 0;
    this.productService.getItemByPage(1, this.pageSize, '').subscribe(
      (data) => {
        this.noMatchFound = false;
        this.entities = data.extra.items;
        let count = data.extra.count;

        setTimeout(() => {
          this.isLoading = false;
        }, 500);

        this.pagesCount = new Array(Math.ceil(count / this.pageSize));
      },
      (error) => {
        // { this..isError(true)
        this.isLoading = false;
        console.error('Error: ', error);
      }
    );
  }

  Edit(productId: string) {
    localStorage.setItem('productId', productId);
    this.router.navigateByUrl('EditProduct');
  }

  Details(productId: string) {
    localStorage.setItem('productId', productId);
    this.router.navigateByUrl('ProductDetails');
  }

  More(pageNumber: number) {
    this.noMatchFound = false;
    this.clicked = pageNumber;
    this.isLoading = true;
    this.productService
      .getItemByPage(pageNumber + 1, this.pageSize, this.searchText)
      .subscribe(
        (data) => {
          this.entities = data.extra.items;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        },
        (error) => {
          // { this..isError(true)
          this.isLoading = false;
          console.error('Error: ', error);
        }
      );
  }

  Add() {
    this.router.navigateByUrl('AddProduct');
  }

  showConfirmPopup(productId: string) {
    this.showPopup = true;
    this.entityIdToDelete = productId;
  }

  confirmDelete() {
    if (this.entityIdToDelete !== null) {
      this.productService.Delete(this.entityIdToDelete).subscribe(
        (data) => {
          this.showPopup = false;
          this.sharedService.alertnMessage('Deleted successfully ');
          this.sharedService.alertColor('green');
          this.ngOnInit();
        },
        (error) => {
          this.sharedService.alertnMessage(' Something went wrong ');
          this.sharedService.alertColor('red');
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
