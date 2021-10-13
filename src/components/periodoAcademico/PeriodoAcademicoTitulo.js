import { forwardRef } from "react";
import MaskedInput from 'react-text-mask';

const TituloPeriodoAcademico = forwardRef((props, ref) => {
    const { ...other } = props;

    return <MaskedInput
        showMask
        {...other}
        placeholderChar={'\u2000'}
        mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
    />
});

export default TituloPeriodoAcademico;