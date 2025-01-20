export interface IColor {
  images: string[];
  id: number;
  name: string;
  price: string;
  description: string;
  sizes: number[];
}

export interface IProduct {
  id: number; 
  name: string;
  colors: IColor[];
}
