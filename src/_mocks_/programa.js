
const programa = [
  { titulo: "Ingienieria de sistema", facultad: "Ingienieria y tecnologia", estado: true },
  { titulo: "Ingienieria electronica", facultad: "Ingienieria y tecnologia", estado: false },
];

export const initPrograma = (value) => {
  return { titulo: value, facultad: value, estado: value }
}

export default programa;
