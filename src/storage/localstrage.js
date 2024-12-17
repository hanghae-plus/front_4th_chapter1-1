const createStorage = () => {
  const safeParse = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.warn("Failed to parse JSON:", e.message);
      return null;
    }
  };

  return {
    setItem(key, value) {
      if (!key) throw new Error("Key is required");
      localStorage.setItem(key, JSON.stringify(value));
    },

    getItem(key) {
      if (!key) throw new Error("Key is required");
      const data = localStorage.getItem(key);
      return data ? safeParse(data) : null;
    },

    removeItem(key) {
      if (!key) throw new Error("Key is required");
      localStorage.removeItem(key);
    },

    clear() {
      localStorage.clear();
    },
  };
};

export const storage = createStorage();
