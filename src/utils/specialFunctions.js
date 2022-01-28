export const indexTab = (index) =>
({
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
})

export const createAccordion = (title, icon, content, subtitle = '') => ({ title, icon, content, subtitle })

export const createTab = (nameTab, iconTab, content) => ({ nameTab, iconTab, content })

export const validarCorreos = (email) => /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)

export const getDataForTable = (doc) => doc.map((row) => ({ ...row.data, id: row.id }))

export const createOptions = (label, icon, onClick) => ({ label, icon, onClick })

export const response = (status, result) => ({ status, result })

export const isObject = (value) => value && typeof value === 'object'

export const updateDataInDocumentArray = (arrayDocs, id, newData) => [...arrayDocs.filter(row => row.id !== id), { id, data: newData }]

export const addDataInDocumentArray = (arrayDocs, data) => [...arrayDocs, data]

export const deleteDataInDocumentArray = (arrayDocs, id) => [...arrayDocs.filter(row => row.id !== id)]