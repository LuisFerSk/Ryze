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
    return [...arrayDocs.filter(row => row.id !== id), { id, data: newData }]
}

export const addDataInDocumentArray = (arrayDocs, data) => {
    return [...arrayDocs, data]
}

export const deleteDataInDocumentArray = (arrayDocs, id) => {
    return [...arrayDocs.filter(row => row.id !== id)]
}

export const isObject = (value) => {
    return value && typeof value === 'object'
}

export const isBoolean = (value) => {
    return typeof value === 'boolean'
}

export const isString = (value) => {
    return value && typeof value === 'string'
}