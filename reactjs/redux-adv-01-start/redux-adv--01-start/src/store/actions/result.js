import * as actionTypes from '../actions/actionTypes';
export const saveResult = (result)=>{
    return {
        type:actionTypes.STORE_RESULT,
        result:result
    }
}
export const storeResult = (result) =>{
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(saveResult(result))
        },2000);
    }


}
export const deleteResult = (id) =>{
    return {
        type:actionTypes.DELETE_RESULT,
        resultElId: id   
    }
}