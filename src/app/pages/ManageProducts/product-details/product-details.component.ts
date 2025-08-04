import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/Product/product.service';
import { ProductDetails } from '../../../core/models/Product/product';
import { environment } from '../../../core/environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product!:ProductDetails
  baseUrl=environment.baseUrl
  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  Edit(productId:string){

    localStorage.setItem("productId",productId)
    this.router.navigateByUrl("EditProduct")
  }

  ngOnInit(): void {
     let id = localStorage.getItem("productId") ?? ''
    this.productService.getItemDetails(id).subscribe(data => {
      this.product = data.extra;
    

    }, error => {
      console.error('Error: ', error);
    });
  }


  Back(): void {
    this.router.navigateByUrl("ManageProducts");
  }
}
