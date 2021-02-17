import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../shared/firebase'

const AuthContext = React.createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
    const [ currentUser, setCurrentUser ] = useState()

    useEffect(() => {
        auth.onAuthStateChanged(user => setCurrentUser(user))
    }, [])

    const values = {
        currentUser, setCurrentUser
    }
    return (
        <AuthContext.Provider value={values}  >
            {children}
        </AuthContext.Provider>
    )
}