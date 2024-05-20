import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { products } from '../../data/product.data';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartitem';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  
  products: Product[] = [];
  
  items: CartItem[] = [];
  
  total: number = 0;

  showCart: boolean = false;
  
  constructor(private service: ProductService){
    
  }
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]') ;
    this.calculateTotal();
  }

  onAddCart(product: Product): void{
    const hasItem = this.items.find(item => item.product.id === product.id);
    if(hasItem){
      this.items = this.items.map(item => {
        if(item.product.id === product.id){
          return {
            ...item, quantity: item.quantity + 1
          }
        }
        return item;
      });
    }else {
      this.items = [...this.items, {product: {...product}, quantity:1 }];
    }
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number): void{
    this.items = this.items.filter(item =>item.product.id !== id);
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0);
    this.saveSession();
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCloseCart(): void {
    this.showCart = !this.showCart;
  }
}
