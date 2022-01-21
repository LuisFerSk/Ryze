import { useContext } from 'react'
import authContext from '../../provider/Auth/authContext'

const useContextUser = () => {
    const authsContext = useContext(authContext)
    return authsContext.user;
}

export default useContextUser