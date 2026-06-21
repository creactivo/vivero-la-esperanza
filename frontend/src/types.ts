import type { Timestamp } from "firebase/firestore";

export interface UserData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export interface OrderItem {
  cantidad: number;
  nombre: string;
  precioUnitario: number;
  id: string;
}

export interface Order {
  id: string;
  fecha: Timestamp;
  total: number;
  items: OrderItem[];
  userId: string;
}