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

export const validarCorreos = (email) => /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)

export const getDataForTable = (doc) => doc.map((row) => ({ ...row.data, id: row.id }))

export const createOptions = (label, icon, onClick) => ({ label, icon, onClick })

export const response = (status, result) => ({ status, result })