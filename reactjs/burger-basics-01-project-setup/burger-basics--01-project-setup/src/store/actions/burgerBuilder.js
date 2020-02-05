import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';
 


export const addIngrediants = (name) =>{
    return {
        type:actionTypes.ADD_INGREDIANTS,
        ingrediantName:name
    }
}
export const removeIngrediants = (name) =>{
    return {
        type:actionTypes.REMOVE_INGREDIANTS,
        ingrediantName:name
    }
}
export const setIngrediants  = (ingrediants) =>{
    return{
        type:actionTypes.SET_INGREDIANTS,
        ingrediants:ingrediants
    }
}
export const fetchIngrediantsFailed = ()=>{
    return {
        type:actionTypes.FETCH_INGREDIANTS_FAILED
    }
}
export const initIngrediants = () =>{
    return dispatch => {
        axios.get('/ingrediants.json')
        .then(response => {
            dispatch(setIngrediants(response.data));
        }).catch(error => {
            dispatch(fetchIngrediantsFailed());
        });
    }
}