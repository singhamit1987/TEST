import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_ENROLLMENT_FAILURE,
  CREATE_ENROLLMENT_REQUESTED,
  CREATE_ENROLLMENT_SUCCESS,
  DELETE_ENROLLMENT_FAILURE,
  DELETE_ENROLLMENT_REQUESTED,
  DELETE_ENROLLMENT_SUCCESS,
  FETCH_SINGLE_ENROLLMENT_FAILURE,
  FETCH_SINGLE_ENROLLMENT_REQUESTED,
  FETCH_SINGLE_ENROLLMENT_SUCCESS,
  FETCH_ENROLLMENT_FAILURE,
  FETCH_ENROLLMENT_REQUESTED,
  FETCH_ENROLLMENT_SUCCESS,
  UPDATE_ENROLLMENT_FORM } from '../actions/enrollment-action-type';

const initialState = {
  createEnrollmentStatus: 'pending',
  deleteEnrollmentStatus: 'pending',
  enrollments: [],
  fetchEnrollmentStatus: 'pending',
  fetchSingleEnrollmentStatus: 'pending',
  form: {
    age: '',
    amount_paid: '',
    amount_to_pay: '',
    balance: '',
    city_id: null,
    class_id: null,
    country_id: null,
    date_of_birth: null,
    discount: '',
    file: '',
    gender: '',
    moratorium_deadline: null,
    number_of_days_of_late_payment: '',
    parents: [],
    place_of_birth: '',
    registration_number: '',
    school_id: null,
    seniority: '',
    status: null,
    student_address: '',
    student_email: '',
    student_first_name: '',
    student_last_name: '',
    student_phone_no: '',
    student_profile_picture: null,
    student_registration_no: '',
  },
};

export default function enrollment(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_ENROLLMENT_FAILURE:
      return {
        ...state,
        createEnrollmentStatus: 'failure',
      };

    case CREATE_ENROLLMENT_REQUESTED:
      return {
        ...state,
        createEnrollmentStatus: 'creating',
      };

    case CREATE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        createEnrollmentStatus: 'success',
      };

    case DELETE_ENROLLMENT_FAILURE:
      return {
        ...state,
        deleteEnrollmentStatus: 'failure',
      };

    case DELETE_ENROLLMENT_REQUESTED:
      return {
        ...state,
        deleteEnrollmentStatus: 'deleting',
      };

    case DELETE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        deleteEnrollmentStatus: 'success',
        enrollments: [...state.enrollments].filter((singleEnrollment) => singleEnrollment.enrollment_id.toString() !== payload.toString()),
      };

    case FETCH_ENROLLMENT_FAILURE:
      return {
        ...state,
        fetchEnrollmentStatus: 'failure',
      };

    case FETCH_ENROLLMENT_REQUESTED:
      return {
        ...state,
        fetchEnrollmentStatus: 'fetching',
      };

    case FETCH_ENROLLMENT_SUCCESS:
      return {
        ...state,
        enrollments: payload,
        fetchEnrollmentStatus: 'success',
      };

    case FETCH_SINGLE_ENROLLMENT_FAILURE:
      return {
        ...state,
        fetchSingleEnrollmentStatus: 'failure',
      };

    case FETCH_SINGLE_ENROLLMENT_REQUESTED:
      return {
        ...state,
        fetchSingleEnrollmentStatus: 'fetching',
      };

    case FETCH_SINGLE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        fetchSingleEnrollmentStatus: 'success',
        form: {
          ...state.form,
          ...payload,
          file: encodeURI(payload.student_profile_picture),
          student_profile_picture: null,
        },
      };

    case UPDATE_ENROLLMENT_FORM:
      return {
        ...state,
        form: payload,
      };

    case LOCATION_CHANGE:
      return { ...initialState };

    default:
      return state;
  }
}
