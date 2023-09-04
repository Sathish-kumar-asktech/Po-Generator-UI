import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

function Logout() {
    const  history = useHistory()
    useEffect(() => {
     localStorage.clear()
        history.push('/')
       
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default Logout
