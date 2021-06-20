export interface TradeProDto{
    productId:number;
    productName:string;
    productCategoryId:number;
    productPrice:number;
    productStockAmount:number;
    productDescription:string;
    productSupplierId:number;
    productToVerify:boolean;

    orderId:number;
    orderProductName:string;
    orderAmount:number;
    orderUserId:number;
    orderPrice:number;


    customerWalletId:number;
    customerWalletUserId:number;
    customerWalletUserName:string;
    customerWalletUserLastName:string;
    customerWalletBalance:number;
    customerWalletToVerify:boolean;

    supplierWalletId:number;
    supplierWalletUserId:number;
    supplierWalletUserName:string;
    supplierWalletUserLastName:string;
    supplierWalletBalance:number;
    supplierWalletToVerify:boolean;
}
