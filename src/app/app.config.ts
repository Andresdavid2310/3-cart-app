import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/reducers/items.reduces';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './store/reducers/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProducsEffects } from './store/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({
    items: itemsReducer,
    products: productReducer
  }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideEffects(ProducsEffects)]
};
