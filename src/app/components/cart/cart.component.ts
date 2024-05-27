import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemState } from '../../store/items.reduces';
import { Store } from '@ngrx/store';
import { total } from '../../store/items.actions';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

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
  ngOnInit(): void {
    this.store.dispatch(total());
  }

  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
