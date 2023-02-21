import logo from './logo.svg';
import './App.css';
import Routes from './Routes';

function App() {
  return (
    <>
    <Routes/>
    </>
  );
}

export default App;

const apiHost="http://127.0.0.1:8000/api";

export const apiroutes ={
  employes:`${apiHost}/employes/`,
  users:`${apiHost}/users/`,
  login:`${apiHost}/authlogin/`,
  register:`${apiHost}/authregister/`
}


