export const indexTab = (index) => {
	return {
		id: `scrollable-force-tab-${index}`,
		"aria-controls": `scrollable-force-tabpanel-${index}`,
	};
};

export const createAccordion = (title, icon, content, subtitle = "") => {
	return { title, icon, content, subtitle };
};

export const createTab = (nameTab, iconTab, content) => {
	return { nameTab, iconTab, content };
};

export const validarCorreos = (email) => /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email);

