import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_STUDENT_FAILURE,
  CREATE_STUDENT_REQUESTED,
  CREATE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  DELETE_STUDENT_REQUESTED,
  DELETE_STUDENT_SUCCESS,
  FETCH_SINGLE_STUDENT_FAILURE,
  FETCH_SINGLE_STUDENT_REQUESTED,
  FETCH_SINGLE_STUDENT_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENTS_REQUESTED,
  FETCH_STUDENTS_SUCCESS,
  UPDATE_STUDENT_FORM } from '../actions/students-action-types';

const initialState = {
  createStudentStatus: 'pending',
  deleteStudentStatus: 'pending',
  fetchSingleStudentStatus: 'pending',
  fetchStudentsStatus: 'pending',
  form: {
    age: '',
    city_id: null,
    class_id: null,
    country_id: null,
    date_of_birth: null,
    file: '',
    gender: '',
    parents: [],
    place_of_birth: '',
    school_id: null,
    status: null,
    student_address: '',
    student_email: '',
    student_first_name: '',
    student_last_name: '',
    student_phone_no: '',
    student_profile_picture: null,
    student_registration_no: '',
  },
  students: [],
};

export default function schools(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_STUDENT_FAILURE:
      return {
        ...state,
        createStudentStatus: 'failure',
      };

    case CREATE_STUDENT_REQUESTED:
      return {
        ...state,
        createStudentStatus: 'creating',
      };

    case CREATE_STUDENT_SUCCESS:
      return {
        ...state,
        createStudentStatus: 'success',
      };

    case DELETE_STUDENT_FAILURE:
      return {
        ...state,
        deleteStudentStatus: 'failure',
      };

    case DELETE_STUDENT_REQUESTED:
      return {
        ...state,
        deleteStudentStatus: 'deleting',
      };

    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        deleteStudentStatus: 'success',
        students: [...state.students].filter((student) => student.student_id.toString() !== payload.toString()),
      };

    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        fetchStudentsStatus: 'failure',
      };

    case FETCH_STUDENTS_REQUESTED:
      return {
        ...state,
        fetchStudentsStatus: 'fetching',
      };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        fetchStudentsStatus: 'success',
        students: payload,
      };

    case FETCH_SINGLE_STUDENT_FAILURE:
      return {
        ...state,
        fetchSingleStudentStatus: 'failure',
      };

    case FETCH_SINGLE_STUDENT_REQUESTED:
      return {
        ...state,
        fetchSingleStudentStatus: 'fetching',
      };

    case FETCH_SINGLE_STUDENT_SUCCESS:
      return {
        ...state,
        fetchSingleStudentStatus: 'success',
        form: {
          ...state.form,
          ...payload,
          file: encodeURI(payload.student_profile_picture),
          student_profile_picture: null,
        },
      };

    case UPDATE_STUDENT_FORM:
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
