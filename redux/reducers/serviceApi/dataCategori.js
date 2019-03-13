import types from "../../actions/serviceApi/types";
import { reducer, createInitalState } from "../../utils";

const initalState = createInitalState(types.CATEGORI);
const dataCategori = (state = initalState, action) => {
    return reducer(state, action);
}

export default dataCategori;

