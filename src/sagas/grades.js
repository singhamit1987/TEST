import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ADD_GRADE,
  addGradeFailure,
  addGradeRequested,
  addGradeSuccess,
  DELETE_GRADE,
  deleteGradeFailure,
  deleteGradeRequested,
  deleteGradeSuccess,
  FETCH_GRADE,
  fetchGradeFailure,
  fetchGradeRequested,
  fetchGradeSuccess,
  FETCH_SINGLE_GRADE,
  fetchSingleGradeFailure,
  fetchSingleGradeRequested,
  fetchSingleGradeSuccess,
  EDIT_GRADE,
  editGradeFailure,
  editGradeRequested,
  editGradeSuccess } from '../actions/grades-action-types';
import httpClient from './http-client';

export function* addGradeHandler({ payload }) {
  yield put(addGradeRequested());
  const body = new FormData();

  body.append('grade_name', payload.grade_name);
  body.append('grade_code', payload.grade_code);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    method: 'POST',
    url: 'add-grade',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(addGradeFailure(error));
  } else {
    alert('Grade created successfully.');

    yield put(addGradeSuccess());
    yield put(push('/grades'));
  }
}

export function* fetchGradeHandler({ payload }) {
  yield put(fetchGradeRequested());
  const request = {
    data: payload,
    method: 'GET',
    url: 'list-grade',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchGradeFailure(error));
  } else {
    yield put(fetchGradeSuccess(data.data.result));
  }
}

export function* editGradeHandler({ payload }) {
  yield put(editGradeRequested());

  const request = {
    method: 'POST',
    params: {
      grade_code: payload.grade_code,
      grade_name: payload.grade_name,
      status: payload.status.value,
    },
    url: `update-grade/${payload.grade_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editGradeFailure(error));
  } else {
    alert('Grade updated successfully.');

    yield put(editGradeSuccess());
    yield put(push('/grades'));
  }
}

export function* fetchSingleGradeHandler({ payload }) {
  yield put(fetchSingleGradeRequested());

  const request = {
    method: 'GET',
    url: `view-grade/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleGradeFailure(error));
  } else {
    const result = data.data;

    const res = {
      ...data.data.result,
      id: result.grade_id,
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleGradeSuccess(res));
  }
}

export function* deleteGradeHandler({ payload }) {
  yield put(deleteGradeRequested());

  const request = {
    method: 'DELETE',
    url: `delete-grade/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteGradeFailure(error));
  } else {
    alert('Grade deleted successfully.');
    yield put(deleteGradeSuccess(payload));
  }
}

function* user() {
  yield all([
    takeLatest(ADD_GRADE, addGradeHandler),
    takeLatest(DELETE_GRADE, deleteGradeHandler),
    takeLatest(FETCH_GRADE, fetchGradeHandler),
    takeLatest(FETCH_SINGLE_GRADE, fetchSingleGradeHandler),
    takeLatest(EDIT_GRADE, editGradeHandler),
  ]);
}

export default user;
