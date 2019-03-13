import types from "../../actions/serviceApi/types";
import { reducer, createInitalState } from "../../utils";

const initalState = createInitalState(types.DETAIL_PHARMACY, new Map());

function callSuccess(state, action) {
    let data = new Map(state.data)
    return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: data.set(action.keyData, action.data)
    }
}
const dataDetailPharmacy = (state = initalState, action) => {
    return reducer(state, action, callSuccess);
}

export default dataDetailPharmacy;