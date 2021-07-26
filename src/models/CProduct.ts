import Product from "./Product";

export default interface CProduct {
  productId: number;
  productName: string;
  productCode: string;
  imageUrl: string;
  description: string;
  price: number;
  priceRrp: number;
  priceShopify: number;
  priceAgent: number;
  price1212: number;
  priceSpecial: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  packageQty: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: number;
  tOrder: any[];
}
