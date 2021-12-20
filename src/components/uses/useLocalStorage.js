import { useState } from 'react'

export const useLocalStorage = (key, initValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)

			return item ? JSON.parse(item) : initValue;
		} catch (e) {
			return initValue
		}
	})

	const setValue = (value) => {
		try {
			setStoredValue(value)
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (e) {
			console.error(e)
		}
	}

	const removeItem = (key) => {
		try {
			window.localStorage.removeItem(key)
		} catch (e) {
			console.error(e)
		}
	}

	return [storedValue, setValue, removeItem]
}
