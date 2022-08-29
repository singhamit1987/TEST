import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import app from './app';
import classes from './classes';
import schools from './schools';
import grades from './grades';
import costItem from './cost-of-item';
import costReason from './cost-reason';
import incomeReason from './income-reason';
import sourceOfIncome from './source-of-income';
import students from './students';
import outflow from './outflow';
import user from './user';
import paymentType from './payment-type';
import entries from './entries';
import posts from './posts';
import installment from './installment';
import schoolYears from './school-year';
import enrollment from './enrollment';
import incomeForecast from './income-forecast';
import expensesForecast from './expenses-forecast';

const config = {
  blacklist: ['app'],
  key: 'primary',
  storage,
};

export default (history) => persistCombineReducers(config, {
  app,
  classes,
  costItem,
  costReason,
  enrollment,
  entries,
  expensesForecast,
  grades,
  incomeForecast,
  incomeReason,
  installment,
  outflow,
  paymentType,
  posts,
  router: connectRouter(history),
  schoolYears,
  schools,
  sourceOfIncome,
  students,
  user,
});
