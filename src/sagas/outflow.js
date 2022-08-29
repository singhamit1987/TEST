import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CREATE_OUTFLOW,
  createOutflowFailure,
  createOutflowRequested,
  createOutflowSuccess,
  DELETE_OUTFLOW,
  deleteOutflowFailure,
  deleteOutflowRequested,
  deleteOutflowSuccess,
  EDIT_OUTFLOW,
  editOutflowFailure,
  editOutflowRequested,
  editOutflowSuccess,
  FETCH_SINGLE_OUTFLOW,
  fetchSingleOutflowFailure,
  fetchSingleOutflowRequested,
  fetchSingleOutflowSuccess,
  FETCH_OUTFLOW,
  fetchOutflowFailure,
  fetchOutflowRequested,
  fetchOutflowSuccess } from '../actions/outflow-action-types';
import httpClient from './http-client';

export function* createOutflowHandler({ payload }) {
  yield put(createOutflowRequested());
  const body = new FormData();

  body.append('cost_reason_id', payload.cost_reason_id.value);
  body.append('amount', payload.amount);
  body.append('payment_type_id', payload.payment_type_id.value);
  body.append('bank_name', payload.bank_name);
  body.append('receipt_number', payload.receipt_number);
  body.append('comments', payload.comments);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-outflow',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createOutflowFailure(error));
  } else {
    alert('Outflow created successfully.');

    yield put(createOutflowSuccess());
    yield put(push('/outflows'));
  }
}

export function* editOutflowHandler({ payload }) {
  yield put(editOutflowRequested());

  const request = {
    method: 'PUT',
    params: {
      amount: payload.amount,
      bank_name: payload.bank_name,
      comments: payload.comments,
      cost_reason_id: payload.cost_reason_id.value,
      payment_type_id: payload.payment_type_id.value,
      receipt_number: payload.receipt_number,
      status: payload.status.value,
    },
    url: `update-outflow/${payload.outflow_reason_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editOutflowFailure(error));
  } else {
    alert('Outflow updated successfully.');

    yield put(editOutflowSuccess());
    yield put(push('/outflows'));
  }
}

export function* deleteOutflowHandler({ payload }) {
  yield put(deleteOutflowRequested());

  const request = {
    method: 'DELETE',
    url: `delete-outflow/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteOutflowFailure(error));
  } else {
    alert('Outflow deleted successfully.');
    yield put(deleteOutflowSuccess(payload));
  }
}

export function* fetchOutflowHandler({ payload }) {
  yield put(fetchOutflowRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-outflow',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchOutflowFailure(error));
  } else {
    // console.log(data.data)
    yield put(fetchOutflowSuccess(data.data.result));
  }
}

export function* fetchSingleOutflowHandler({ payload }) {
  yield put(fetchSingleOutflowRequested());

  const request = {
    method: 'GET',
    url: `view-outflow/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleOutflowFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      cost_reason_id: {
        label: result.cost_reason_label,
        value: result.cost_reason_id,
      },

      id: result.outflow_reason_id,
      payment_type_id: {
        label: result.payment_type_label,
        value: result.payment_type_id,
      },
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleOutflowSuccess(res));
  }
}

function* Outflows() {
  yield all([
    takeLatest(CREATE_OUTFLOW, createOutflowHandler),
    takeLatest(DELETE_OUTFLOW, deleteOutflowHandler),
    takeLatest(EDIT_OUTFLOW, editOutflowHandler),
    takeLatest(FETCH_OUTFLOW, fetchOutflowHandler),
    takeLatest(FETCH_SINGLE_OUTFLOW, fetchSingleOutflowHandler),
  ]);
}

export default Outflows;
