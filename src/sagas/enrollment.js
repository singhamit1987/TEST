import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import moment from 'moment';
import { CREATE_ENROLLMENT,
  createEnrollmentFailure,
  createEnrollmentRequested,
  createEnrollmentSuccess,
  DELETE_ENROLLMENT,
  deleteEnrollmentFailure,
  deleteEnrollmentRequested,
  deleteEnrollmentSuccess,
  EDIT_ENROLLMENT,
  editEnrollmentFailure,
  editEnrollmentRequested,
  editEnrollmentSuccess,
  FETCH_SINGLE_ENROLLMENT,
  fetchSingleEnrollmentFailure,
  fetchSingleEnrollmentRequested,
  fetchSingleEnrollmentSuccess,
  FETCH_ENROLLMENT,
  fetchEnrollmentFailure,
  fetchEnrollmentRequested,
  fetchEnrollmentSuccess } from '../actions/enrollment-action-type';
import httpClient from './http-client';

export function* createEnrollmentHandler({ payload }) {
  yield put(createEnrollmentRequested());
  const body = new FormData();

  body.append('registration_number', payload.registration_number);
  body.append('student_first_name', payload.student_first_name);
  body.append('student_last_name', payload.student_last_name);
  body.append('student_address', payload.student_address);
  body.append('student_email', payload.student_email);
  body.append('student_phone_no', payload.student_phone_no);
  body.append('student_profile_picture', payload.student_profile_picture);
  body.append('date_of_birth', moment(payload.date_of_birth).format('MM/DD/yyyy').toString());
  body.append('age', payload.age);
  body.append('place_of_birth', payload.place_of_birth);

  body.append('amount_to_pay', payload.amount_to_pay);
  body.append('discount', payload.discount);
  body.append('amount_paid', payload.amount_paid);
  body.append('balance', payload.balance);
  body.append('number_of_days_of_late_payment', payload.number_of_days_of_late_payment);
  body.append('moratorium_deadline', moment(payload.moratorium_deadline).format('MM/DD/yyyy').toString());

  body.append('gender', payload.gender.value);
  body.append('seniority', payload.seniority.value);
  body.append('country_id', payload.country_id.value);
  body.append('city_id', payload.city_id.value);
  body.append('class_id', payload.class_id.value);

  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-enrollment',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createEnrollmentFailure(error));
  } else {
    alert('Enrollment created successfully.');

    yield put(createEnrollmentSuccess());
    yield put(push('/enrollments'));
  }
}

export function* editEnrollmentHandler({ payload }) {
  yield put(editEnrollmentRequested());
  const body = new FormData();

  body.append('registration_number', payload.registration_number);
  body.append('student_first_name', payload.student_first_name);
  body.append('student_last_name', payload.student_last_name);
  body.append('amount_to_pay', payload.amount_to_pay);
  body.append('discount', payload.discount);
  body.append('amount_paid', payload.amount_paid);
  body.append('balance', payload.balance);
  body.append('number_of_days_of_late_payment', payload.number_of_days_of_late_payment);
  body.append('moratorium_deadline', moment(payload.moratorium_deadline).format('MM/DD/yyyy').toString());
  body.append('class_id', payload.class_id.value);
  body.append('status', payload.status.value);
  body.append('seniority', payload.seniority.value);

  if (payload.student_profile_picture) {
    body.append('student_profile_picture', payload.student_profile_picture);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: `update-enrollment/${payload.publicId}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editEnrollmentFailure(error));
  } else {
    alert('Enrollment updated successfully.');

    yield put(editEnrollmentSuccess());
    yield put(push('/enrollments'));
  }
}

export function* deleteEnrollmentHandler({ payload }) {
  yield put(deleteEnrollmentRequested());

  const request = {
    method: 'DELETE',
    url: `delete-enrollment/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteEnrollmentFailure(error));
  } else {
    alert('Enrollment deleted successfully.');
    yield put(deleteEnrollmentSuccess(payload));
  }
}

export function* fetchEnrollmentHandler({ payload }) {
  yield put(fetchEnrollmentRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-enrollment',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchEnrollmentFailure(error));
  } else {
    yield put(fetchEnrollmentSuccess(data.data.result));
  }
}

export function* fetchSingleEnrollmentHandler({ payload }) {
  yield put(fetchSingleEnrollmentRequested());

  const request = {
    method: 'GET',
    url: `view-enrollment/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleEnrollmentFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...result,
      city_id: {
        label: result.city_name,
        value: result.city_id,
      },
      class_id: {
        label: result.class_name,
        value: result.class_id,
      },
      country_id: {
        label: result.country_name,
        value: result.country_id,
      },
      date_of_birth: moment(result.date_of_birth, 'X').toDate(),
      gender: {
        label: result.gender,
        value: result.gender,
      },
      moratorium_deadline: moment(result.moratorium_deadline, 'X').toDate(),
      seniority: {
        label: result.seniority,
        value: result.seniority,
      },
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleEnrollmentSuccess(res));
  }
}

function* Enrollment() {
  yield all([
    takeLatest(CREATE_ENROLLMENT, createEnrollmentHandler),
    takeLatest(DELETE_ENROLLMENT, deleteEnrollmentHandler),
    takeLatest(EDIT_ENROLLMENT, editEnrollmentHandler),
    takeLatest(FETCH_ENROLLMENT, fetchEnrollmentHandler),
    takeLatest(FETCH_SINGLE_ENROLLMENT, fetchSingleEnrollmentHandler),
  ]);
}

export default Enrollment;
