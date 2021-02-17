import React, { useContext, useState } from 'react'

const AuthContext = React.createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
    const [ currentUser, setCurrentUser ] = useState()

    const values = {
        currentUser, setCurrentUser
    }
    return (
        <AuthContext.Provider value={values}  >
            {children}
        </AuthContext.Provider>
    )
}