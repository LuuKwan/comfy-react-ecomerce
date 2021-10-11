import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  // DEFAULT
  if (action.type === LOAD_PRODUCTS) {
    //Find maxPrice and minPrice from my products
    let maxPrice = action.payload.map((p) => p.price);
    let minPrice = action.payload.map((p) => p.price);
    // max method compare 2 value x and y, spread operator of maxPrice to satisfy the condition
    maxPrice = Math.max(...maxPrice);
    minPrice = Math.min(...minPrice);

    return {
      ...state,
      // make a shalow copy of the payload avoid making any changes on filtered_products would affect the all_products
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  // END DEFAULT

  //=====Sort component===============
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === "price-lowest") {
      //compareFunction(a, b) returns a value < than 0, sort a before b. lowest to heighest
      tempProducts = tempProducts.sort((firstEl, secondEl) => {
        if (firstEl.price < secondEl.price) {
          return -1;
        } else if (firstEl.price > secondEl.price) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (sort === "price-heighest") {
      // if compareFunction(a, b) returns a value > than 0, sort b before a, heighest to lowest
      tempProducts = tempProducts.sort(
        (firstEl, secondEl) => secondEl.price - firstEl.price
      );
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((firstEl, secondEl) => {
        //return negative number if referenceStr occurs before compareString, a->z
        return firstEl.name.localeCompare(secondEl.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((firstEl, secondEl) => {
        //return positive number if referenceStr occurs before compareString, z->a
        return secondEl.name.localeCompare(firstEl.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  //=====ENd Sort component===============

  //=====Filter component===============
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    //---------------------set object's properties dynamically
    console.log(name, value);
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];

    //FILTERING
    //text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    //category
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    //company
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }
    //color
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    //price
    tempProducts = tempProducts.filter((product) => product.price <= price);
    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      });
    }

    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    //set back to default
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        color: "all",
        category: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  //=====END Filter component===============
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
