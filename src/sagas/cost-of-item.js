import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ADD_COST_OF_ITEM,
  addCostOfItemFailure,
  addCostOfItemRequested,
  addCostOfItemSuccess,
  DELETE_COST_OF_ITEM,
  deleteCostOfItemFailure,
  deleteCostOfItemRequested,
  deleteCostOfItemSuccess,
  FETCH_COST_OF_ITEM,
  fetchCostOfItemFailure,
  fetchCostOfItemRequested,
  fetchCostOfItemSuccess,
  FETCH_SINGLE_COST_OF_ITEM,
  fetchSingleCostOfItemFailure,
  fetchSingleCostOfItemRequested,
  fetchSingleCostOfItemSuccess,
  EDIT_COST_OF_ITEM,
  editCostOfItemFailure,
  editCostOfItemRequested,
  editCostOfItemSuccess } from '../actions/cost-item-action-types';
import httpClient from './http-client';

export function* addCostOfItemHandler({ payload }) {
  yield put(addCostOfItemRequested());
  const body = new FormData();

  body.append('cost_item_code', payload.cost_item_code);
  body.append('cost_item_label', payload.cost_item_label);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-cost-item',
  };
  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(addCostOfItemFailure(error));
  } else {
    alert('Cost  Item created successfully.');

    yield put(addCostOfItemSuccess());
    yield put(push('/cost-of-item'));
  }
}

export function* editCostOfItemHandler({ payload }) {
  yield put(editCostOfItemRequested());

  const request = {
    method: 'PUT',
    params: {
      cost_item_code: payload.cost_item_code,
      cost_item_label: payload.cost_item_label,
      status: payload.status.value,
    },
    url: `update-cost-item/${payload.cost_item_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editCostOfItemFailure(error));
  } else {
    alert('Cost  item updated successfully.');

    yield put(editCostOfItemSuccess());
    yield put(push('/cost-of-item'));
  }
}

export function* deleteCostOfItemHandler({ payload }) {
  yield put(deleteCostOfItemRequested());

  const request = {
    method: 'DELETE',
    url: `delete-cost-item/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteCostOfItemFailure(error));
  } else {
    alert('Cost  Item deleted successfully.');
    yield put(deleteCostOfItemSuccess(payload));
  }
}

export function* fetchCostOfItemHandler({ payload }) {
  yield put(fetchCostOfItemRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-cost-item',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchCostOfItemFailure(error));
  } else {
    yield put(fetchCostOfItemSuccess(data.data.result));
  }
}

export function* fetchSingleCostOfItemHandler({ payload }) {
  yield put(fetchSingleCostOfItemRequested());

  const request = {
    method: 'GET',
    url: `view-cost-item/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleCostOfItemFailure(error));
  } else {
    const result = data.data;

    const res = {
      ...data.data.result,
      id: result.cost_item_id,
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleCostOfItemSuccess(res));
  }
}

function* CostOfItem() {
  yield all([
    takeLatest(ADD_COST_OF_ITEM, addCostOfItemHandler),
    takeLatest(DELETE_COST_OF_ITEM, deleteCostOfItemHandler),
    takeLatest(FETCH_COST_OF_ITEM, fetchCostOfItemHandler),
    takeLatest(FETCH_SINGLE_COST_OF_ITEM, fetchSingleCostOfItemHandler),
    takeLatest(EDIT_COST_OF_ITEM, editCostOfItemHandler),
  ]);
}

export default CostOfItem;
