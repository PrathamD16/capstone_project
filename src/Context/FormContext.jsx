import React, { createContext, useState } from 'react'


export const BookingContext = createContext({
    bookingList: [],
    addBooking: () => {},
    deleteBooking: () => {}
})

const FormContext = ({children}) => {

    const [list, setList] = useState([])
    const addBooking = (passenger) => {
        list.push(passenger)
    }

    const deleteBooking = (id) => {
        setList(list.filter((booking) => booking.bid !== id))
    }


  return (
    <BookingContext.Provider value={{bookingList: list, addBooking, deleteBooking}}>
        {children}
    </BookingContext.Provider>
  )
}

export default FormContext
