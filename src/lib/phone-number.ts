export const unmaskPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, "");
};
