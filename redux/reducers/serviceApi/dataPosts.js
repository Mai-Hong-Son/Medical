import types from "../../actions/serviceApi/types";
import { reducer, createInitalState } from "../../utils";

const initalState = createInitalState(types.POST, new Map());

function callSuccess(state, action) {
    let data = new Map(state.data)
    return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: data.set(action.keyData, action.data)
    }
}
const dataPosts = (state = initalState, action) => {
    return reducer(state, action, callSuccess);
}

export default dataPosts;