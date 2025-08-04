
export class Invoice {
  constructor(
    public id: number,
    public customerName: string,
    public invoiceDate: string, 
    public totalPrice: number,
    public cashierName: string,
    public branchName:string,
    public itemsCount: Number
  ) {}
}



export class InvoiceItem {
  constructor(
    public id: number,
    public name: string,
    public count: number,
    public price: number
  ) {}
}

export class InvoiceDtails {
  constructor(
    public id: number,
    public customerName: string,
    public invoiceDate: string, 
    public totalPrice: number,
    public cashierID: number,
    public cashierName: string,
    public branchID: number,
    public branchName: string,
    public items: InvoiceItem[]
  ) {}
}

export class InvoiceForUpdate {
  constructor(

  

  ){}}


  export class InvoiceForCreate {

  

  constructor(
    public customerName: string,
    public cashierID: number,
    public branchID: number,
    public items: Item[]
  ) {}}



 export  class Item {

constructor(
     public itemID: number,
    public itemCount: number,
){}}
   


  



