export const splitAddress = (addressComponents) => {
	let addressObject = {}

	addressObject.streetNumber =
		addressComponents?.find(
			(component) => component.types[0] === 'street_number'
		) || ''

	addressObject.streetName =
		addressComponents?.find((component) => component.types[0] === 'route') || ''

	addressObject.city =
		addressComponents?.find((component) => component.types[0] === 'locality') ||
		''
	addressObject.state =
		addressComponents?.find(
			(component) => component.types[0] === 'administrative_area_level_1'
		) || ''
	addressObject.country =
		addressComponents?.find((component) => component.types[0] === 'country') || ''
	addressObject.postcode =
		addressComponents?.find(
			(component) => component.types[0] === 'postal_code'
		) || ''

	return addressObject
}
