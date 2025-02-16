
export function addCurrencyCommas(currency: string) {
	if (currency) {
		return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
}
