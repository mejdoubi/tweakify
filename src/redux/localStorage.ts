export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e: any) {
    return undefined;
  }
};

export const saveState = (key: string, state: any) => {
  try {
    const oldState = loadState(key);
    const serializedState = JSON.stringify({
      ...oldState,
      ...state,
    });
    localStorage.setItem(key, serializedState);
  } catch (e: any) {
    // ignore write errors
  }
};
