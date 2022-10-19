import { legacy_createStore , applyMiddleware} from "redux";
import rootReducer from "./Reducer";
import thunk from "redux-thunk";

const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store;