import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/Product/product.service';
import { CategoryforProduct, OccasionsforProduct, ProductForCreate, ProductToCreate } from '../../../core/models/Product/product';
import { CommonModule, formatDate } from '@angular/common';

import { SharedService } from '../../../core/services/Shared/shared.service';



@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product!: ProductForCreate;
  Categories: CategoryforProduct[] = [];
  Occasions: OccasionsforProduct[] = [];

  isPhoto=false
  displayPhoto=false
  photoUrl=''



  constructor(
    private router: Router,
    private productService: ProductService,
    private sharedService:SharedService 
  ) {}

  ngOnInit(): void {

    this.product = new ProductForCreate("", "", "", "", "",false, false, 0, 0, null, []);


    this.productService.getCategories().subscribe(data => {
      this.Categories = data.extra;
    }, error => {
      console.error('Error: ', error);
    });


    this.productService.getOccasions().subscribe(data => {
      this.Occasions = data.extra;
    }, error => {
      console.error('Error: ', error);
    });
  }


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.product.photo = input.files[0];
   
  
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string; // Convert to Base64 or URL
  
      };
      reader.readAsDataURL(this.product.photo); // Trigger file read
    }
  }
  

  Add(): void {
    const formData = new FormData();
  
    if (this.product.photo) {
      formData.append("photo", this.product.photo);
    }

        let productToCreate = new ProductToCreate("","","","","",false,false,0,0,[])
     
      productToCreate.categoryId= this.product.categoryId
      productToCreate.nameEn= this.product.nameEn
      productToCreate.nameAr= this.product.nameAr
      productToCreate.descriptionAr= this.product.descriptionAr
      productToCreate.isBestSeller = Boolean(this.product.isBestSeller);
      productToCreate.isOutOfStock = Boolean(this.product.isOutOfStock);
      productToCreate.price= this.product.price
      productToCreate.rating= this.product.rating
      productToCreate.descriptionEn= this.product.descriptionEn
  
      this.product.occasionsId.forEach((id: string) => productToCreate.occasionsId.push(id));   
 
     this.productService.createProduct(productToCreate).subscribe(data => {

   
    }, error => {
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
    this.router.navigateByUrl("ManageProducts");
  }

  Display(){
    this.displayPhoto=true
  }
  closePopup() {
    this.displayPhoto=false // Reset photo to close the popup
  }
}
