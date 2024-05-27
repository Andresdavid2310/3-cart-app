import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { findAll, load } from "../actions/products.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";

@Injectable()
export class ProducsEffects {

    loadProduct$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(() => this.services.findAll())
        ).pipe(
            map(products => (findAll({ products }))),
            catchError(() => EMPTY)
        )
    );

    constructor(private actions$: Actions,
        private services: ProductService
    ) {

    }
}