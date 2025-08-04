export class Cashier {
    constructor(
        public cashierID:number, 
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
    public cashierID:number, 
       public cashierName:string, 
        public branchID:number, 
       
    ){}
}
export class CashierDtails {
    constructor(
        public cashierID:number, 
        public cashierName:string, 
        public branchID:number, 
        public branchName:string,
        public cityName:string,
       
    ){}
}


