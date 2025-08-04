import { Component } from '@angular/core';
import { CategoryforProduct, OccasionsforProduct, ProductForCreate, ProductForUpdate, ProductToUpdate } from '../../../core/models/Product/product';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/Product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../core/environments/environment';
import { SharedService } from '../../../core/services/Shared/shared.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],

  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {


  product= new ProductForUpdate("","","","","","",false,false,0,0,"",[])


  Categories: CategoryforProduct[] = [];
  Occasions: OccasionsforProduct[] = [];

  isPhoto=false
  displayPhoto=false
photo!:File|null

baseUrl=environment.baseUrl
id = localStorage.getItem("productId") ?? ''

  constructor(
    private router: Router,
    private productService: ProductService,
    private sharedService:SharedService,

  ) {}

  ngOnInit(): void {


   
this.productService.getItemForUpdate(this.id).subscribe(data => {
  this.product = data.extra;
  this.isPhoto=  this.product.photoURL==null? false: true

}, error => {
  console.error('Error: ', error);
});



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
      this.photo = input.files[0];
    
  
      const reader = new FileReader();
      reader.onload = () => {
        this.product.photoURL = reader.result as string; // Convert to Base64 or URL
        this.isPhoto = !!  this.product.photoURL; // Check if photo exists
      };
      reader.readAsDataURL(this.photo); 
       // Trigger file read
    }
  }

  Edit(): void {
    const formData = new FormData();
  
    console.log(this.product) 
    formData.append("productId", this.product.productId);

  

    
    if (this.photo  instanceof File) {
      formData.append('photo', this.photo);
    }

    let productToUpdate = new ProductToUpdate("","","","","","",false,false,0,0,[])
  productToUpdate.productId=this.product.productId
  productToUpdate.categoryId= this.product.categoryId
  productToUpdate.nameEn= this.product.nameEn
  productToUpdate.nameAr= this.product.nameAr
  productToUpdate.descriptionAr= this.product.descriptionAr
  productToUpdate.isBestSeller= Boolean(this.product.isBestSeller)
  productToUpdate.isOutOfStock= Boolean(this.product.isOutOfStock)
//  productToUpdate.isBestSeller = this.product.isBestSeller === true ? true : false;
  //productToUpdate.isOutOfStock = this.product.isOutOfStock === true ? true : false;

  productToUpdate.price= this.product.price
  productToUpdate.rating= this.product.rating
  productToUpdate.descriptionEn= this.product.descriptionEn

  console.log(productToUpdate) 

  
    this.product.occasions.forEach((id: string) => productToUpdate.occasionsId.push(id));


     this.productService.updateProduct(productToUpdate).subscribe(data => {

     this.productService.updateProductUploadPhoto(formData).subscribe(data => {

      this.sharedService.alertnMessage(" Product has been updated")
     this.sharedService.alertColor('green')
   this.router.navigate(['/ManageProducts']).then(() => {
    
   });
    }, error => {
      console.error('Error: ', error);
        this.sharedService.alertnMessage(" Something went wrong ")
      this.sharedService.alertColor('red')
    });
   
    
    }, error => {
      this.sharedService.alertnMessage(" Something went wrong ")
      this.sharedService.alertColor('red')

    });
  }


  Reset(): void {

  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
  });  }

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

