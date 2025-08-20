export const isValidPhNumber = (
  countryCode: number,
  phoneNumber: number,
): boolean => {
  switch (countryCode) {
    case 91:
      const regex = /^[6789]\d{9}$/;
      return regex.test(`${phoneNumber}`);

    default:
      return false;
  }
};
