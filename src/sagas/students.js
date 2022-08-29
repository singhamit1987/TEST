import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import moment from 'moment';
import { CREATE_STUDENT,
  createStudentFailure,
  createStudentRequested,
  createStudentSuccess,
  DELETE_STUDENT,
  deleteStudentFailure,
  deleteStudentRequested,
  deleteStudentSuccess,
  EDIT_STUDENT,
  editStudentFailure,
  editStudentRequested,
  editStudentSuccess,
  FETCH_SINGLE_STUDENT,
  fetchSingleStudentFailure,
  fetchSingleStudentRequested,
  fetchSingleStudentSuccess,
  FETCH_STUDENTS,
  fetchStudentsFailure,
  fetchStudentsRequested,
  fetchStudentsSuccess } from '../actions/students-action-types';
import httpClient from './http-client';

export function* createStudentHandler({ payload }) {
  yield put(createStudentRequested());
  const body = new FormData();

  body.append('student_first_name', payload.student_first_name);
  body.append('student_last_name', payload.student_last_name);
  body.append('student_registration_no', payload.student_registration_no);
  body.append('student_address', payload.student_address);
  body.append('student_email', payload.student_email);
  body.append('student_phone_no', payload.student_phone_no);
  body.append('place_of_birth', payload.place_of_birth);
  body.append('date_of_birth', moment(payload.date_of_birth).format('MM/DD/yyyy').toString());
  body.append('age', payload.age);
  body.append('student_profile_picture', payload.student_profile_picture);
  body.append('gender', payload.gender.value);
  body.append('country_id', payload.country_id.value);
  body.append('city_id', payload.city_id.value);
  body.append('class_id', payload.class_id.value);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-student',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createStudentFailure(error));
  } else {
    alert('Student created successfully.');

    yield put(createStudentSuccess());
    yield put(push('/school-students'));
  }
}

export function* editStudentHandler({ payload }) {
  yield put(editStudentRequested());
  const body = new FormData();

  body.append('student_first_name', payload.student_first_name);
  body.append('student_last_name', payload.student_last_name);
  body.append('student_registration_no', payload.student_registration_no);
  body.append('student_address', payload.student_address);
  body.append('student_email', payload.student_email);
  body.append('student_phone_no', payload.student_phone_no);
  body.append('place_of_birth', payload.place_of_birth);
  body.append('date_of_birth', moment(payload.date_of_birth).format('MM/DD/yyyy').toString());
  body.append('age', payload.age);
  body.append('gender', payload.gender.value);
  body.append('country_id', payload.country_id.value);
  body.append('city_id', payload.city_id.value);
  body.append('class_id', payload.class_id.value);
  body.append('status', payload.status.value);

  if (payload.student_profile_picture) {
    body.append('student_profile_picture', payload.student_profile_picture);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: `update-student/${payload.student_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editStudentFailure(error));
  } else {
    alert('Student updated successfully.');

    yield put(editStudentSuccess());
    yield put(push('/school-students'));
  }
}

export function* deleteStudentHandler({ payload }) {
  yield put(deleteStudentRequested());

  const request = {
    method: 'DELETE',
    url: `delete-student/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteStudentFailure(error));
  } else {
    // alert('Student deleted successfully.');
    yield put(deleteStudentSuccess(payload));
  }
}

export function* fetchStudentsHandler({ payload }) {
  yield put(fetchStudentsRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-student',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchStudentsFailure(error));
  } else {
    yield put(fetchStudentsSuccess(data.data.result));
  }
}

export function* fetchSingleStudentHandler({ payload }) {
  yield put(fetchSingleStudentRequested());

  const request = {
    method: 'GET',
    url: `view-student/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleStudentFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
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
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleStudentSuccess(res));
  }
}

function* students() {
  yield all([
    takeLatest(CREATE_STUDENT, createStudentHandler),
    takeLatest(DELETE_STUDENT, deleteStudentHandler),
    takeLatest(EDIT_STUDENT, editStudentHandler),
    takeLatest(FETCH_STUDENTS, fetchStudentsHandler),
    takeLatest(FETCH_SINGLE_STUDENT, fetchSingleStudentHandler),
  ]);
}

export default students;
