export const setSelectedStation = (station) => (dispatch) => {
    dispatch({
        type: "SET_SELECTED_STATION",
        payload: station
    })
}

export const setSelectedTrip = (trip) => (dispatch) => {
    dispatch({
        type: "SET_SELECTED_TRIP",
        payload: trip
    })
}

export const setSelectedTicket = (ticket) => (dispatch) => {
    dispatch({
        type: "SET_SELECTED_TICKET",
        payload: ticket
    })
}

export const setSelectedUser = (user) => (dispatch) => {
    dispatch({
        type: "SET_SELECTED_USER",
        payload: user
    })
}