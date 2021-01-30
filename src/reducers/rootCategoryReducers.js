import {
  ROOT_CATEGORY_LIST_REQUEST,
  ROOT_CATEGORY_LIST_SUCCESS,
  ROOT_CATEGORY_LIST_FAIL,
  ROOT_CATEGORY_DELETE_REQUEST,
  ROOT_CATEGORY_DELETE_SUCCESS,
  ROOT_CATEGORY_DELETE_FAIL,
  ROOT_CATEGORY_CREATE_RESET,
  ROOT_CATEGORY_CREATE_FAIL,
  ROOT_CATEGORY_CREATE_SUCCESS,
  ROOT_CATEGORY_CREATE_REQUEST,
  ROOT_CATEGORY_UPDATE_REQUEST,
  ROOT_CATEGORY_UPDATE_SUCCESS,
  ROOT_CATEGORY_UPDATE_FAIL,
  ROOT_CATEGORY_UPDATE_RESET,
} from "../constants/rootCategoryConstants";

export const rootCategoryListReducer = (
  state = { rootCategories: [] },
  action
) => {
  switch (action.type) {
    case ROOT_CATEGORY_LIST_REQUEST:
      return { loading: true, rootCategories: [] };
    case ROOT_CATEGORY_LIST_SUCCESS:
      return { loading: false, rootCategories: action.payload };
    case ROOT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rootCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOT_CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case ROOT_CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ROOT_CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rootCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOT_CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case ROOT_CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, rootCategory: action.payload };
    case ROOT_CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ROOT_CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const rootCategoryUpdateReducer = (
  state = { rootCategory: {} },
  action
) => {
  switch (action.type) {
    case ROOT_CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case ROOT_CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, rootCategory: action.payload };
    case ROOT_CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ROOT_CATEGORY_UPDATE_RESET:
      return { rootCategory: {} };
    default:
      return state;
  }
};
