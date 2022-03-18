import { Navigate, Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../layout/NavbarMenu';
import { authLoadingSelector, isAuthSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const authLoading = useSelector(authLoadingSelector);
  const isAuthenticated = useSelector(isAuthSelector);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
