export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface AddressObject {
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export const splitAddress = (addressComponents: AddressComponent[] = []): AddressObject => {
  return {
    streetNumber:
      addressComponents.find((component) => component.types.includes("street_number"))
        ?.long_name || "",
    streetName:
      addressComponents.find((component) => component.types.includes("route"))?.long_name ||
      "",
    city:
      addressComponents.find((component) => component.types.includes("locality"))?.long_name ||
      "",
    state:
      addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name || "",
    country:
      addressComponents.find((component) => component.types.includes("country"))?.long_name ||
      "",
    postcode:
      addressComponents.find((component) => component.types.includes("postal_code"))
        ?.long_name || "",
  };
};

