import callApi from '../api';
export const getTrips = () => (dispatch) => {
    console.log('vao get trip api');
    return callApi("/trips")
    .getItems()
    .then(trip=>{
        dispatch({
            type: "GET_TRIPS",
            payload:trip
        })
    })
}

export const postTrip = (trip) => (dispatch) => {
    return callApi("/trips")
    .createItem(trip)
    .then(trip=>{
        dispatch({
            type: "POST_TRIP",
            payload:trip
        })
        return Promise.resolve(trip)
    })
    .catch(err => Promise.reject(err.response.data))
}

export const deleteTrip = (id) => (dispatch) => {
    return callApi(`/trips/${id}`)
    .deleteItem()
        .then(() => {
            dispatch({
                type: "DELETE_TRIP",
                payload: id
            })
        })
        .catch(err => Promise.reject(err.response.data))

}

export const putTrip = (trip) => (dispatch) => {
    console.log("vao put trip api action");
    console.log(trip);
    return callApi(`/trips/${trip._id}`)
    .updateItem(trip)
    .then(()=>{
        dispatch({
            type: "UPDATE_TRIP",
            payload:trip
        })
    })
    .catch(err => Promise.reject(err.response.data))
}

export const resetTripStateWhenSwitch = () => (dispatch) => {
    dispatch({
        type: 'RESET_TRIP',
    })
}