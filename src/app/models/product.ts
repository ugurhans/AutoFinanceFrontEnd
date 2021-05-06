export interface Product{
    id:number;
    name:string;
    categoryId:number;
    price:number;
    stockAmount:number;
    description:string;
    supplierId:number;
    toVerify:boolean;
}