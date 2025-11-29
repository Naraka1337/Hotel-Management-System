// Simple test function to check backend connection
export const testBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:8000/');
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

