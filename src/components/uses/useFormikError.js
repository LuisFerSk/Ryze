const useFormikError = (touched, errors) => {
    const getHelperTextField = (filedName) => {
        if (touched[filedName] && errors[filedName]) {
            return String(errors[filedName])
        }
    }

    const getErrorFiled = (fieldName) => {
        return Boolean(touched[fieldName] && errors[fieldName])
    }

    return [getHelperTextField, getErrorFiled];
}

export default useFormikError;