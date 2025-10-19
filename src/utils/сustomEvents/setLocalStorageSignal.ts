export const setLocalStorageSignal = (key: string, value: string) => {
  window.dispatchEvent(
    new CustomEvent("localstorage-signal", {
      detail: { key, value },
    })
  );
};
