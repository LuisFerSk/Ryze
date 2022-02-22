const useFormikFiledProps = ({ touched, errors, getFieldPropsFormik }) => {
    const getFieldHelperText = (filedName) => {
        if (touched[filedName] && errors[filedName]) {
            return String(errors[filedName])
        }
    }

    const getFiledError = (fieldName) => {
        return Boolean(touched[fieldName] && errors[fieldName])
    }

    const getFieldProps = (filedName) => {
        return {
            error: getFiledError(filedName),
            ...getFieldPropsFormik(filedName),
            helperText: getFieldHelperText(filedName)
        }
    }

    return [getFieldProps];
}

export default useFormikFiledProps;