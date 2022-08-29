import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CREATE_INSTALLMENT,
  createInstallmentFailure,
  createInstallmentRequested,
  createInstallmentSuccess,
  DELETE_INSTALLMENT,
  deleteInstallmentFailure,
  deleteInstallmentRequested,
  deleteInstallmentSuccess,
  EDIT_INSTALLMENT,
  editInstallmentFailure,
  editInstallmentRequested,
  editInstallmentSuccess,
  FETCH_SINGLE_INSTALLMENT,
  fetchSingleInstallmentFailure,
  fetchSingleInstallmentRequested,
  fetchSingleInstallmentSuccess,
  FETCH_INSTALLMENT,
  fetchInstallmentFailure,
  fetchInstallmentRequested,
  fetchInstallmentSuccess } from '../actions/installment-action-type';
import httpClient from './http-client';

export function* createInstallmentHandler({ payload }) {
  yield put(createInstallmentRequested());
  const body = new FormData();

  body.append('school_year_id', payload.school_year_id.value);
  body.append('grade_id', payload.grade_id.value);
  body.append('installment', payload.installment);
  body.append('amount_to_pay', payload.amount_to_pay);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-installment',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createInstallmentFailure(error));
  } else {
    alert('Installment created successfully.');

    yield put(createInstallmentSuccess());
    yield put(push('/installments'));
  }
}

export function* editInstallmentHandler({ payload }) {
  yield put(editInstallmentRequested());

  const request = {
    method: 'PUT',
    params: {
      amount_to_pay: payload.amount_to_pay,
      grade_id: payload.grade_id.value,
      installment: payload.installment,
      school_year_id: payload.school_year_id.value,
    },
    url: `update-installment/${payload.installment_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editInstallmentFailure(error));
  } else {
    alert('Installment updated successfully.');

    yield put(editInstallmentSuccess());
    yield put(push('/installments'));
  }
}

export function* deleteInstallmentHandler({ payload }) {
  yield put(deleteInstallmentRequested());

  const request = {
    method: 'DELETE',
    url: `delete-installment/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteInstallmentFailure(error));
  } else {
    alert('Installment deleted successfully.');
    yield put(deleteInstallmentSuccess(payload));
  }
}

export function* fetchInstallmentHandler({ payload }) {
  yield put(fetchInstallmentRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-installment',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchInstallmentFailure(error));
  } else {
    yield put(fetchInstallmentSuccess(data.data.result));
  }
}

export function* fetchSingleInstallmentHandler({ payload }) {
  yield put(fetchSingleInstallmentRequested());

  const request = {
    method: 'GET',
    url: `view-installment/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleInstallmentFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      grade_id: {
        label: result.grade_name,
        value: result.grade_id,
      },
      id: result.Installment_id,
      school_year_id: {
        label: result.school_year,
        value: result.school_year_id,
      },

    };

    yield put(fetchSingleInstallmentSuccess(res));
  }
}

function* Installments() {
  yield all([
    takeLatest(CREATE_INSTALLMENT, createInstallmentHandler),
    takeLatest(DELETE_INSTALLMENT, deleteInstallmentHandler),
    takeLatest(EDIT_INSTALLMENT, editInstallmentHandler),
    takeLatest(FETCH_INSTALLMENT, fetchInstallmentHandler),
    takeLatest(FETCH_SINGLE_INSTALLMENT, fetchSingleInstallmentHandler),
  ]);
}

export default Installments;
