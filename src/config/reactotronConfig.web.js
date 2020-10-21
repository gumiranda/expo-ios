import Reactotron, {overlay} from 'reactotron-react-js';
import {YellowBox} from 'react-native';
import {reactotronRedux} from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['Unrecognized WebSocket']);
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

if (__DEV__) {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();
  tron.clear();
  console.tron = tron;
} else {
  const noop = () => undefined;
  console.tron = {
    configure: noop,
    connect: noop,
    use: noop,
    useReactNative: noop,
    clear: noop,
    log: noop,
    logImportant: noop,
    display: noop,
    error: noop,
    createEnhancer: noop,
  };
}
