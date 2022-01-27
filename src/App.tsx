import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/redux-store';
import MainComponent from './components/main';
import styles from './App.module.css'

function App() {
  return (
    <Provider store={store}>
    <div className={styles.App}>
      <h1 className={styles.h1_text}>Entropy calculator</h1>
      <MainComponent />
    </div>
    </Provider>
  );
}

export default App;