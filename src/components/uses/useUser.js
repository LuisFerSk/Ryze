import { useContext } from 'react'
import authContext from '../../provider/Auth/authContext'

const useUser = () => {
    const authsContext = useContext(authContext)
    return authsContext.user;
}

export default useUser