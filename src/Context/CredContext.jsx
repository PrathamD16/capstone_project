import React, { createContext, useState } from 'react'

export const UserEmailContext = createContext({
  signedIn: false,
  updateSignIn: (pre) => {},
  byEmail:'',
  updateEmail: (email) => {},
  date:'',
  updateDate:(newdate) => {},
  isAdmin: false,
  setAdmin:(val) => {},
  username: '',
  setUserName: () => {}

})

const CredContext = ({children}) => {
  const [byEmail, setByEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [signedIn, setSignIn] = useState(false)
  const [username, setUsername] = useState('')

  const updateSignIn = (pre) => {
    setSignIn(pre)
  }

  const updateDate = (newdate) => {
    setDate(newdate)
  }

  const updateEmail = (email) => {
    setByEmail(email)
  }

  const setAdmin = (value) => {
    setIsAdmin(value)
  }

  const setUserName = (new_name) => {
    setUsername(new_name)
  }

  return (
    <UserEmailContext.Provider value={{byEmail, updateEmail, date, updateDate, isAdmin, setAdmin, signedIn, updateSignIn, username, setUserName}}>
      {children}
    </UserEmailContext.Provider>
  )
}

export default CredContext
