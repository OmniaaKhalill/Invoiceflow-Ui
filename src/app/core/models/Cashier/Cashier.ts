export class Cashier {
    constructor(
        public id:number, 
        public cashierName:string, 
        public branchName:string, 
        public cityName:string, 
   

    ){}
}


export class CashierForCreate {
    constructor(
        public cashierName:string, 
        public branchID:number, 
       
    ){}
}

export class CashierForUpdate {
    constructor(
    public id:number, 
       public cashierName:string, 
        public branchID:number,
  public branchName:string,
 
       
    ){}
}
export class CashierDtails {
    constructor(
        public id:number, 
        public cashierName:string, 
        public branchID:number, 
        public branchName:string,
        public cityName:string,
       
    ){}
}


