import { handleRequest, success, fail, loading } from "../../utils";
import { NavigationActions } from 'react-navigation';

export const fetch = (axiosObj, typeObject, keyData) => {
    return (dispatch) => {
        dispatch(loading(typeObject))
        handleRequest(
            axiosObj,
            (data) => {
                dispatch(success(data, typeObject, keyData))
            },
            (err) => {
                dispatch(fail(err, typeObject))
            }
        )
    }
}
export const navigate = (routeName, params) => {
    return (dispatch) => dispatch(NavigationActions.navigate({ routeName: routeName, params: params }));
}
