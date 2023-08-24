type InputData = {
  username: string;
  password: string;
};

export function handleInputChange(
  event: React.ChangeEvent,
  inputText: string,
  setData: React.Dispatch<React.SetStateAction<InputData>>,
  inputData: InputData,
): void {
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    setData({ ...inputData, [inputText]: target.value });
  }
}
