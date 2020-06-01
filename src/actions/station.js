import callApi from "../api";

export const getStations = () => (dispatch) => {
    return callApi("/stations")
        .getItems()
        .then(station => {
            dispatch({
                type: "GET_STATIONS",
                payload: station
            })
        })

}

export const getStation = () => dispatch => {
    return callApi().getItem("").then(station => {
        dispatch({
            type: 'GET_STATION',
            payload: station
        })
    })
}


export const postStation = (station) => (dispatch) => {
    return callApi("/stations")
        .createItem(station)
        .then(station => {
            dispatch({
                type: "POST_STATION",
                payload: station
            })
            return Promise.resolve(station)
        })
        .catch(err => Promise.reject(err))
}

export const deleteStation = (id) => (dispatch) => {
    return callApi(`/stations/${id}`)
        .deleteItem()
        .then(() => {
            dispatch({
                type: "DELETE_STATION",
                payload: id
            })
        })
        .catch(err => Promise.reject(err))

}


export const putStation = (station) => (dispatch) => {
    
    return callApi(`/stations/${station._id}`)
        .updateItem(station)
        .then(() => {
            dispatch({
                type: "UPDATE_STATION",
                payload: station
            })
        })
        .catch(err => Promise.reject(err))

}

export const createAvatar = (data,stationId) => (dispatch) => {
   
    return callApi(`/stations/${stationId}/avatar`)
        .createImage(data)
        .then(() => {
            dispatch({
                type: "CREATE_AVATAR",
                payload: data
            })
        })
        .catch(err => Promise.reject(err))

}