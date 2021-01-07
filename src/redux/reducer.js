const { 
    LOGIN, 
    LOGOUT, 
    GET_ALL_RESTAURANTS,
    GET_ALL_PHOTOGRAPHERS,
    GET_ALL_FLORIST,
    GET_ALL_BEAUTY,
    GET_COMMERCES 
 } = require ('./types');

const initialState = {
    user:{},
    restaurants: [],
    photographers: [],
    florist: [],
    beauty: [],
    commerces: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return{
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return{
                ...state,
                user: action.payload
            };
        case GET_ALL_RESTAURANTS:
            return{
                ...state,
                restaurants: action.payload
            };
        case GET_ALL_PHOTOGRAPHERS:
            return{
                ...state,
                photographers: action.payload
            };
        case GET_ALL_FLORIST:
            return{
                ...state,
                florist: action.payload
            };
        case GET_ALL_BEAUTY:
            return{
                ...state,
                beauty: action.payload
            };
        case GET_COMMERCES:
            return{
                ...state,
                commerces: action.payload
            };
        default:
            return state
    }
}

export default reducer;