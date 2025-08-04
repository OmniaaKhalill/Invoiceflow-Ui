export class Item {
    constructor(
       public itemID:number, 
       public name:string, 
    public price:number, 
    ){

    }
}


export class ItemForCreate {
    constructor(
      
     public name:string, 
    public price:number, 
    ){

    }
}
