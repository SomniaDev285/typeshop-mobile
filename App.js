import { StatusBar } from 'expo-status-bar';
import Navigation from './src/services/navigation';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TailwindProvider>
          <ToastProvider>
            <Navigation />
            <StatusBar style='auto' />
          </ToastProvider>
        </TailwindProvider>
      </PersistGate>
    </Provider>
  );
}
