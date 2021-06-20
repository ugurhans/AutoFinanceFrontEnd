export interface Trade{
    id:number;
    productName:string;
    customerId:number;
    supplierId:number;
    sellDate:Date;
    tradeAmount:number;
    tradePrice:number;
    tax:number;
}