import RootNav from './src/navigation/RootNav';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNav />
    </Provider>
  );
}
  