import { createContext, useContext } from 'react';

// Empty defaults — no pre-filled data, user must enter everything
export const DEFAULT_BIRTH_DETAILS = {
  name: "",
  dateOfBirth: "",
  timeOfBirth: "",
  placeOfBirth: "",
};

// Context provides: birthDetails, setBirthDetails
export const BirthContext = createContext({
  birthDetails: DEFAULT_BIRTH_DETAILS,
  setBirthDetails: () => {},
});

export function useBirthDetails() {
  return useContext(BirthContext);
}