import { Navigation } from "./Navigation";
import { Provider } from "react-redux";
import store from "./Redux/store";

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
