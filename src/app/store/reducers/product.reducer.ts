import { createReducer, on } from "@ngrx/store";
import { findAll, load } from "../actions/products.actions";

const products: any[] = [];
const initialState = {
    products
}

export const productReducer = createReducer(
    initialState,
    on(load, (state ) => ({ products: [... state.products] })),
    on(findAll, (state, { products }) => ({ products: [...products] })),

)