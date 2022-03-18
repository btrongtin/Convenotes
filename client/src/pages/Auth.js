import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { authLoadingSelector, isAuthSelector } from '../redux/selectors';

const Auth = ({ authRoute }) => {
  const dispatch = useDispatch();
  const authLoading = useSelector(authLoadingSelector);
  const isAuthenticated = useSelector(isAuthSelector);

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (isAuthenticated) return <Navigate to="/dashboard" />;
  else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
