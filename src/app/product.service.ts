import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = [
    { id: 1, name: 'Soap', description: 'Bathing product', price: 40 },
    {
      id: 2,
      name: 'Detergent',
      description: 'Stain removal product',
      price: 520,
    },
    { id: 3, name: 'Shampoo', description: 'Hair wash product', price: 450 },
    { id: 4, name: 'Noodles', description: 'Consumable product', price: 60 },
    { id: 5, name: 'paper cups', description: 'Drinking product', price: 20 },
    { id: 6, name: 'Tissues', description: 'Hygiene product', price: 120 },
    { id: 7, name: 'Bitterroot', description: 'Medecine product', price: 65 },
    { id: 8, name: 'Mandorin', description: 'Fruit product', price: 89 },
    { id: 9, name: 'Comb', description: 'Hygiene product', price: 142 },
    { id: 10, name: 'Caps', description: 'Clothing product', price: 1200 },
  ];

  getProducts(): Observable<any[]> {
    return of(this.products);
  }
}
