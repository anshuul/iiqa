import React, { useState, useEffect } from 'react'

export const AuthContext = React.createContext()
// export const useAuth = () => useContext(AuthContext)

// export default function AuthProvider({children}){
//     const [ currentUser, setCurrentUser ] = useState()

//     useEffect(() => {
//         auth.onAuthStateChanged(user => setCurrentUser(user))
//     }, [])

//     const values = {
//         currentUser, setCurrentUser
//     }
//     return (
//         <AuthContext.Provider value={values}  >
//             {children}
//         </AuthContext.Provider>
//     )
// }