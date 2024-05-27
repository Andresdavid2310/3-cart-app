import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemState } from '../../store/reducers/items.reduces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private store: Store<{ items: ItemState }>,
    private sharingDataService: SharingDataService) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    })
  }

  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
