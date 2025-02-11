import { Product } from "./product";

interface Order {
  id: number;
  customerId: string;
  orderDate: string;
  addressId: number;
  paymentMethod: string;
  totalAmount: string;
  items: OrderItem[];
}

interface DisplayOrder {
  id: number;
  customerId: string;
  orderDate: string;
  addressId: number;
  paymentMethod: string;
  totalAmount: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  size:string,
  color:string,
  status: string;
  price: number;
  deliveryDate: null;
  product:Product
}

interface InsertOrderItem {
  productId: number;
  quantity: number;
}
