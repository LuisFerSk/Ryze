import { useState } from 'react'
import { Alert, CircularProgress } from '@material-ui/core'

const useMensaje = () => {
    const [mensaje, setMensaje] = useState()

    const updateMensaje = (severity, label) => {
        if (!severity && !label) {
            setMensaje()
            return;
        }
        setMensaje(
            <Alert severity={severity} >
                {label}
            </Alert>
        )
    }

    const mensajeLoader = () => {
        setMensaje(<CircularProgress color='success' />)
    }

    return [
        mensaje,
        updateMensaje,
        mensajeLoader,
    ]
}

export default useMensaje;