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
