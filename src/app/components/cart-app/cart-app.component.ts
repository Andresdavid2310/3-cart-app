import { Component, OnInit } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartitem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemState } from '../../store/reducers/items.reduces';
import { add, remove, total } from '../../store/actions/items.actions';


@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  constructor(
    private store: Store<{ items: ItemState }>,
    private router: Router,
    private sharingDataService: SharingDataService) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.saveSession();
    })
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {

      this.store.dispatch(add({ product }));
      this.store.dispatch(total());

      this.router.navigate(['/cart']);
      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto agregado al carro",
        icon: "success"
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Estas seguro que deseas eliminar el item?",
        text: "El item se eliminará del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras.",
            icon: "success"
          });
        }
      });

    })
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
