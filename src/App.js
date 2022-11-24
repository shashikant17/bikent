import logo from './logo.svg';
import './App.css';
import { HJome } from './components/HJome';
import { AppProvider } from './components/context/AppConfig';
import { Header } from './components/Header';

function App() {
  return (
    <AppProvider>
      <Header/>
   <HJome/>
   </AppProvider>

    
  );
}

export default App;
