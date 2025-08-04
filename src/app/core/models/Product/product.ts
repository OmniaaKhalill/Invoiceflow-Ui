export class Product {
    constructor(
        public productId:string, 
        public nameEn:string, 
        public category:string, 
        public price:number, 
        public rating:number, 
        public date:string,
        public isOutOfStock:boolean, 

    ){}
}

export class ProductForCreate {
    constructor(
        public nameEn:string, 
        public nameAr:string, 
        public descriptionAr:string, 
        public descriptionEn:string, 
        public categoryId:string, 
        public isBestSeller:boolean, 
        public isOutOfStock:boolean, 

        public price:number, 
        public rating:number, 
        public photo:File|null,
        public occasionsId:string[], 
    ){}
}


export class ProductToCreate {
    constructor(
        public nameEn:string, 
        public nameAr:string, 
        public descriptionAr:string, 
        public descriptionEn:string, 
        public categoryId:string, 
        public isBestSeller:boolean, 
        public isOutOfStock:boolean, 
        public price:number, 
        public rating:number, 
        public occasionsId:string[], 
    ){}
}
  
  

export class CategoryforProduct {
    constructor(
        public categoryId:string, 
        public nameEn:string, 
     
    ){}
}


export class OccasionsforProduct {
    constructor(
        public occasionsId:string, 
        public nameEn:string, 
        public nameAr:string, 
        public PhotoURL:string, 
     
    ){}
}


export class NeighbourhoodforReport {
    constructor(
        public  neighbourhoodId:string, 
        public nameEn:string, 
     
     
    ){}
}



export class ProductForUpdate {
    constructor(
        public productId:string, 
        public nameEn:string, 
        public nameAr:string, 
        public descriptionAr:string, 
        public descriptionEn:string, 
        public categoryId:string, 
        public isBestSeller:boolean, 
        public isOutOfStock:boolean, 
        public price:number, 
        public rating:number, 
        public photoURL:string,
        public occasions:string[], 
    ){}
}


export class ProductToUpdate {
    constructor(
        public productId:string, 
        public nameEn:string, 
        public nameAr:string, 
        public descriptionAr:string, 
        public descriptionEn:string, 
        public categoryId:string, 
        public isBestSeller:boolean, 
        public isOutOfStock:boolean, 
        public price:number, 
        public rating:number, 
        public occasionsId:string[], 
    ){}
}

export class ProductDetails{
    constructor(
        public productId:string, 
        public nameEn:string, 
        public nameAr:string, 
        public descriptionAr:string, 
        public descriptionEn:string, 
        public categoryName:string, 
        public isBestSeller:boolean, 
        public isOutOfStock:boolean, 
        public price:number, 
        public rating:number, 
        public photoURL:string,
        public occasions:OccasionsforProduct[], 
    ){}
}
