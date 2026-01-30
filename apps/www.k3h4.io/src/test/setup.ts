import '@testing-library/jest-dom';

if (!globalThis.localStorage ||
    typeof globalThis.localStorage.getItem !== 'function') {
  const storage: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
  } as Storage;
}

if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = () => '';
}

if (!window.URL.revokeObjectURL) {
  window.URL.revokeObjectURL = () => undefined;
}
