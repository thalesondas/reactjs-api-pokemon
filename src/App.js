import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Main />
        <Footer />
      </Provider>
    </>
  );
}

export default App;
