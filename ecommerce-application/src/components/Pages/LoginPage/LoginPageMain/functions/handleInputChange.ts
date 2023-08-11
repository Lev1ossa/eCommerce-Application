type Data = {
  username: string;
  password: string;
};

export function handleInputChange(
  event: React.ChangeEvent,
  text: string,
  setData: React.Dispatch<React.SetStateAction<Data>>,
  data: Data,
): void {
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    setData({ ...data, [text]: target.value });
  }
}
