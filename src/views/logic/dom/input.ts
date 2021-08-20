export function selectInputValueOnFocus(event: FocusEvent): void {
  if (event.target !== null) {
    (event.target as HTMLInputElement).select();
  }
}
