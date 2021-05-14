export interface Trade{
    id:number;
    productId:number;
    customerId:number;
    supplierId:number;
    sellDate:Date;
    tradeAmount:number;
    orderId:number;
}