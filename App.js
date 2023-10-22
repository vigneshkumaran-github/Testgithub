/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigations/AppNav';
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux';
import store from './src/Redux/Store';


function App() {
  return (
    <AuthProvider >
    <Provider store={store}>
    <AppNav />
    <Toast />
    </Provider>
    </AuthProvider>
  );
}

export default App;
