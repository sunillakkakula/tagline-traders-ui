import axios from "axios";
import {
  ROOT_CATEGORY_LIST_REQUEST,
  ROOT_CATEGORY_LIST_SUCCESS,
  ROOT_CATEGORY_LIST_FAIL,
  ROOT_CATEGORY_DELETE_SUCCESS,
  ROOT_CATEGORY_DELETE_REQUEST,
  ROOT_CATEGORY_DELETE_FAIL,
  ROOT_CATEGORY_CREATE_REQUEST,
  ROOT_CATEGORY_CREATE_SUCCESS,
  ROOT_CATEGORY_CREATE_FAIL,
  ROOT_CATEGORY_UPDATE_REQUEST,
  ROOT_CATEGORY_UPDATE_SUCCESS,
  ROOT_CATEGORY_UPDATE_FAIL,
} from "../constants/rootCategoryConstants";

export const listRootCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ROOT_CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`/api/rootcategory`);

    dispatch({
      type: ROOT_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOT_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRootCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOT_CATEGORY_DELETE_REQUEST,
    });

    await axios.delete(`/api/rootcategory/${id}`);

    dispatch({
      type: ROOT_CATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ROOT_CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createRootCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOT_CATEGORY_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/api/rootcategory`, {});

    dispatch({
      type: ROOT_CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ROOT_CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateRootCategory = (rootcategory) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ROOT_CATEGORY_UPDATE_REQUEST,
    });

    const { data } = await axios.put(
      `/api/rootcategory/${rootcategory._id}`,
      rootcategory
    );

    dispatch({
      type: ROOT_CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: ROOT_CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};
