import { Component } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  products$: Observable<any[]>;
  filteredProducts$: Observable<any[]>;
  searchSubject = new BehaviorSubject<string>('');
  sortSubject = new BehaviorSubject<string>('asc');
  user: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.products$ = this.productService.getProducts();
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });

    this.filteredProducts$ = combineLatest([
      this.products$,
      this.searchSubject,
      this.sortSubject,
    ]).pipe(
      map(([products, search, sort]) => {
        let filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );

        if (sort === 'asc') {
          filteredProducts = filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        } else {
          filteredProducts = filteredProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
        }

        return filteredProducts;
      })
    );
  }

  onSearch(event: any): void {
    let search = event?.target.value;
    this.searchSubject.next(search);
  }

  onSort(event: any): void {
    let sort = event?.target.value;
    this.sortSubject.next(sort);
  }

  canView(): boolean {
    return this.user && ['Admin', 'Manager', 'User'].includes(this.user.role);
  }

  canEdit(): boolean {
    return this.user && ['Admin', 'Manager'].includes(this.user.role);
  }

  canDelete(): boolean {
    return this.user && this.user.role === 'Admin';
  }
}
