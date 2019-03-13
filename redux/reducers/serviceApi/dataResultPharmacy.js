import types from "../../actions/serviceApi/types";
import { reducer, createInitalState } from "../../utils";

const initalState = createInitalState(types.RESULT_PHARMACY);
const dataResultPharmacy = (state = initalState, action) => {
    return reducer(state, action);
}

export default dataResultPharmacy;
