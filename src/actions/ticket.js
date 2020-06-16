import callApi from '../api';
export const getTickets = () => (dispatch) => {
    return callApi("/tickets")
        .getItems()
        .then(ticket => {
            dispatch({
                type: "GET_TICKETS",
                payload: ticket
            })
        })
        .catch(err => Promise.reject(err.response.data))
}

export const postTicket = (ticket) => (dispatch) => {
    return callApi("/tickets")
        .createItem(ticket)
        .then(ticket => {
            dispatch({
                type: "POST_TICKET",
                payload: ticket
            })
            return Promise.resolve(ticket)
        })
        .catch(err => Promise.reject(err.response.data))
}

export const deleteTicket = (id) => (dispatch) => {
    return callApi(`/tickets/${id}`)
        .deleteItem()
        .then(() => {
            dispatch({
                type: "DELETE_TICKET",
                payload: id
            })
        })
        .catch(err => Promise.reject(err))

}



export const putTicket = (ticket) => (dispatch) => {
    return callApi(`/tickets/${ticket._id}`)
        .updateItem(ticket)
        .then(() => {
            dispatch({
                type: "UPDATE_TICKET",
                payload: ticket
            })
        })
        .catch(err => Promise.reject(err))
}