import { filter } from 'lodash'

export const indexTab = (index) => {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    }
}

export const createAccordion = (title, icon, content, subtitle = '') => {
    return { title, icon, content, subtitle }
}

export const createTab = (nameTab, iconTab, content) => {
    return { nameTab, iconTab, content }
}

export const getDataForTable = (doc) => {
    return doc.map((row) => ({ ...row.data, id: row.id }))
}

export const createOptions = (label, icon, onClick) => {
    return { label, icon, onClick }
}

export const response = (status, result) => {
    return { status, result }
}

export const updateDataInDocumentArray = (arrayDocs, id, newData) => {
    const data = deleteDataInDocumentArray(arrayDocs, id)
    const newDoc = { id, data: newData }

    return addInArray(data, newDoc)
}

export const addInArray = (arrayDocs, data) => {
    return [...arrayDocs, data]
}

export const deleteDataInDocumentArray = (arrayDocs, id) => {
    return filter(arrayDocs, row => row.id !== id)
}

export const isObject = (value) => {
    return typeof value === 'object'
}

export const isBoolean = (value) => {
    return typeof value === 'boolean'
}

export const isString = (value) => {
    return typeof value === 'string'
}