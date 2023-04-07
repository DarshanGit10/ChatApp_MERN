import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, auth=false }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null || false;

  
  if(!isLoggedIn && auth){
  return <Navigate to="/users/login" />;
}
else if(isLoggedIn && ['/users/login', '/users/signup'].includes(window.location.pathname)){
  return <Navigate to="/" />;
}
  return children
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route exact path="/users/login" element={
          <ProtectedRoute>
            <LoginForm />
          </ProtectedRoute>} />
        <Route exact path="/users/signup" element={
        <ProtectedRoute>
          <SignupForm />
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginForm() {
  return <Form isLoginPage={true} />;
}

function SignupForm() {
  return <Form isLoginPage={false} />;
}

export default App;

