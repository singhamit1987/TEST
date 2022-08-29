import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { CheckBox, Button, TextInput } from '../../components';
import { login } from '../../actions/user-action-types';
import Regex from '../../utility/regex';

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    remember: false,
  });
  const {
    email, password, remember,
  } = form;

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updates);
  };

  const onNavigate = () => {
    const path = '/forgot-password';

    dispatch(push(path));
  };

  const onRemember = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.checked,
    };

    setForm(updates);
  };

  const onLogin = () => {
    if (email === '' || !Regex.email(email)) {
      alert('Please enter a valid email address');

      return;
    }

    if (password === '') {
      alert('Please enter a valid password');

      return;
    }

    const request = {
      email,
      password,
    };

    dispatch(login(request));
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      if (email === '' || !Regex.email(email)) {
        alert('Please enter a valid email address');

        return;
      }

      if (password === '') {
        alert('Please enter a valid password');

        return;
      }

      const request = {
        email,
        password,
      };

      dispatch(login(request));
    }
  };

  return (
    <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
      <div className="logo">
        <img alt='Logo' src="public/images/logo-n.png" />
      </div>
      <div className="login-box mt-3">
        <h4 className="mb-0">
          <span>Please sign in to your account.</span>
        </h4>
        <div className="divider row" />
        <form>
          <div className="form-row">
            <div className="col-md-6">
              <TextInput
                title="Email"
                name="email"
                id="email-address"
                type="email"
                placeholder="Enter your email here..."
                onChange={onChange}
                value={email}
                onKeyPress={onEnterPress}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                title="Password"
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password here..."
                onChange={onChange}
                value={password}
                onKeyPress={onEnterPress}
              />
            </div>
          </div>
          <CheckBox title="Keep me logged in" name="remember" id="remember" onChange={onRemember} value={remember} />
          <div className="divider row" />
          <div className="d-flex align-items-center">
            <div className="ml-auto">
              <Button className="btn-lg btn btn-link" onClick={onNavigate}>
                Recover Password
              </Button>
              <Button className="btn btn-primary btn-lg" onClick={onLogin}>
                Login to Dashboard
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
