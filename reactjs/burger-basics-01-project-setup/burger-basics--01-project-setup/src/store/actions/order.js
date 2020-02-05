import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const purchaseBurgerSuccess = (id,orderData) => {
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const purchaseBurgerFail = (id,error) => {
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurgerInit = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_INIT
    }
}
export const purchaseBurger = (orderData,token) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData).then((response)=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        }).catch((error)=>{
            dispatch(purchaseBurgerFail(error));
        })
    }
}
export const fetchOrdersSuccess = (orders) =>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrdersFail = (error) =>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrdersStart = () =>{
    return {
        type:actionTypes.FETCH_ORDERS_START,
        
    }
}
export const fetchOrders = (token,userId) =>{
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams).then((response)=>{
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                });
                console.log(fetchedOrders);
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch((err)=>{
            // this.setState({loading:false});
            dispatch(fetchOrdersFail(err))
        })
    }
}
