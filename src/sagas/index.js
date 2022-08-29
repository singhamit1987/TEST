import { all } from 'redux-saga/effects';
import app from './app';
import classes from './classes';
import schools from './schools';
import grades from './grades';
import posts from './posts';
import students from './students';
import costItem from './cost-of-item';
import sourceOfIncome from './source-of-income';
import user from './user';
import outflow from './outflow';
import paymentType from './payment-type';
import entries from './entries';
import installment from './installment';
import schoolYears from './school-year';
import enrollments from './enrollment';
import costReason from './cost-reason';
import incomeReason from './income-reason';
import fileDownloader from './file-downloader';
import incomeForecast from './income-forecast';
import expensesForecast from './expenses-forecast';

const sagas = function* sagas() {
  yield all([
    app(),
    incomeReason(),
    schoolYears(),
    costReason(),
    enrollments(),
    schools(),
    grades(),
    posts(),
    students(),
    costItem(),
    sourceOfIncome(),
    installment(),
    classes(),
    outflow(),
    paymentType(),
    entries(),
    fileDownloader(),
    user(),
    incomeForecast(),
    expensesForecast(),
  ]);
};

export default sagas;
