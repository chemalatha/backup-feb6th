import * as actionTypes from '../actions/actionTypes';
const initialState={
    ingrediants :null,
    totalPrice :4,
    error:false,
    building:false
}
const INGREDIANT_PRICES = {
    salad: 0.5,
    bacon:0.7,
    cheese:0.3,
    meat:0.4
}

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIANTS:
            return{
                ...state,
                building:true,
                ingrediants:{
                    ...state.ingrediants,
                    [action.ingrediantName]:state.ingrediants[action.ingrediantName]+1
                },
                totalPrice:state.totalPrice+INGREDIANT_PRICES[action.ingrediantName],
                
            }
        case actionTypes.REMOVE_INGREDIANTS:
                return{
                    ...state,
                    building:true,
                    ingrediants:{
                        ...state.ingrediants,
                        [action.ingrediantName]:state.ingrediants[action.ingrediantName]-1
                    },
                    totalPrice:state.totalPrice-INGREDIANT_PRICES[action.ingrediantName],
                    
                }
        case actionTypes.SET_INGREDIANTS:
            return{
                ...state,
                building:false,
                ingrediants:{
                    salad:action.ingrediants.salad,
                    bacon:action.ingrediants.bacon,
                    meat:action.ingrediants.meat,
                    cheese:action.ingrediants.cheese
                },
                error:false,
                totalPrice:4,
                
            }
        case actionTypes.FETCH_INGREDIANTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
};

export default reducer;