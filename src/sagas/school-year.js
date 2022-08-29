import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import moment from 'moment';
import { CREATE_SCHOOL_YEAR,
  createSchoolYearFailure,
  createSchoolYearRequested,
  createSchoolYearSuccess,
  DELETE_SCHOOL_YEAR,
  deleteSchoolYearFailure,
  deleteSchoolYearRequested,
  deleteSchoolYearSuccess,
  EDIT_SCHOOL_YEAR,
  editSchoolYearFailure,
  editSchoolYearRequested,
  editSchoolYearSuccess,
  FETCH_SINGLE_SCHOOL_YEAR,
  fetchSingleSchoolYearFailure,
  fetchSingleSchoolYearRequested,
  fetchSingleSchoolYearSuccess,
  FETCH_SCHOOL_YEAR,
  fetchSchoolYearFailure,
  fetchSchoolYearRequested,
  fetchSchoolYearSuccess } from '../actions/school-year-action-type';
import httpClient from './http-client';

export function* createSchoolYearHandler({ payload }) {
  yield put(createSchoolYearRequested());
  const body = new FormData();

  body.append('school_start_year', moment(payload.school_start_year).format('yyyy').toString());
  body.append('back_to_school_date', moment(payload.back_to_school_date).format('MM/DD/yyyy').toString());
  body.append('school_end_year', moment(payload.school_end_year).format('yyyy').toString());
  body.append('registration_start_date', moment(payload.registration_start_date).format('MM/DD/yyyy').toString());
  body.append('school_year_end_date', moment(payload.school_year_end_date).format('MM/DD/YYYY').toString());

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-schoolyear',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createSchoolYearFailure(error));
  } else {
    alert('School Year created successfully.');

    yield put(createSchoolYearSuccess());
    yield put(push('/school-year'));
  }
}

export function* editSchoolYearHandler({ payload }) {
  yield put(editSchoolYearRequested());

  const request = {
    method: 'PUT',
    params: {
      back_to_school_date: payload.back_to_school_date,
      registration_start_date: payload.registration_start_date,
      school_end_year: payload.school_end_year,
      school_start_year: payload.school_start_year,
      school_year_end_date: payload.school_year_end_date,
    },
    url: `update-schoolyear/${payload.SchoolYear_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editSchoolYearFailure(error));
  } else {
    alert('SchoolYear updated successfully.');

    yield put(editSchoolYearSuccess());
    yield put(push('/SchoolYears'));
  }
}

export function* deleteSchoolYearHandler({ payload }) {
  yield put(deleteSchoolYearRequested());

  const request = {
    method: 'DELETE',
    url: `delete-schoolyear/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteSchoolYearFailure(error));
  } else {
    alert('SchoolYear deleted successfully.');
    yield put(deleteSchoolYearSuccess(payload));
  }
}

export function* fetchSchoolYearHandler({ payload }) {
  yield put(fetchSchoolYearRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-schoolyear',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSchoolYearFailure(error));
  } else {
    yield put(fetchSchoolYearSuccess(data.data.result));
  }
}

export function* fetchSingleSchoolYearHandler({ payload }) {
  yield put(fetchSingleSchoolYearRequested());

  const request = {
    method: 'GET',
    url: `view-schoolyear/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleSchoolYearFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      id: result.school_year_id,

    };

    yield put(fetchSingleSchoolYearSuccess(res));
  }
}

function* SchoolYears() {
  yield all([
    takeLatest(CREATE_SCHOOL_YEAR, createSchoolYearHandler),
    takeLatest(DELETE_SCHOOL_YEAR, deleteSchoolYearHandler),
    takeLatest(EDIT_SCHOOL_YEAR, editSchoolYearHandler),
    takeLatest(FETCH_SCHOOL_YEAR, fetchSchoolYearHandler),
    takeLatest(FETCH_SINGLE_SCHOOL_YEAR, fetchSingleSchoolYearHandler),
  ]);
}

export default SchoolYears;
