import types from "../../actions/serviceApi/types";
import { reducer, createInitalState } from "../../utils";

const initalState = createInitalState(types.PHARMACY);
const dataPharmacy = (state = initalState, action) => {
    return reducer(state, action);
}

export default dataPharmacy;
