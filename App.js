import './src/config/reactotronConfig';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useSelector} from 'react-redux';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {darken} from 'polished';
import {appStore, appPersistor} from './src/appStore/appStore';
import createRouter from './routes';
import {appColors} from './src/utils/appColors';
import {NavigationContainer} from '@react-navigation/native';

function DevDoido() {
  const signed = useSelector(state => state.auth.signed);
  const Routes = createRouter(signed);
  return <Routes />;
}

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={appPersistor}>
        <DevDoido />
        {/* <StatusBar
          barStyle="light-content"
          backgroundColor={darken(0.2, appColors.primary)}
        />
        <PaperProvider>
          <NavigationContainer>
            <DevDoido />
          </NavigationContainer>
        </PaperProvider> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
