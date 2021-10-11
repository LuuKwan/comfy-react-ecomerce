import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  all_products: [],
  filtered_products: [],
  //Sort component
  grid_view: false,
  sort: "price-lowest",
  //END Sort component
  //Filter component
  filters: {
    text: "",
    company: "all",
    color: "all",
    category: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
  //END Filter component
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // get all fetched products from the useProductsContext
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Sort component
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);
  // END Sort component

  // Filter component
  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "price") {
      value = parseInt(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  // END Filter component

  //Default
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setListView,
        setGridView,
        updateSort,
        updateFilter,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
