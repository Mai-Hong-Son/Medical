import types from "../../actions/serviceApi/types";
import { reducer, createInitalState } from "../../utils";

const initalState = createInitalState(types.LOGIN);
const dataLogin = (state = initalState, action) => {
    return reducer(state, action);
}

export default dataLogin;

