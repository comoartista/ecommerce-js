export function saveToLocalStorage(key, data) {
  if (!key) {
    console.error("Invalid key for localStorage.");
    return;
  }

  try {
    // Convert data to JSON and store it in localStorage
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function getFromLocalStorage(key) {
  if (!key) {
    console.error("Invalid key for localStorage.");
    return null;
  }

  try {
    // Retrieve the stored JSON data
    const data = localStorage.getItem(key);

    // Parse and return the data, or return `null` if nothing is found
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}
