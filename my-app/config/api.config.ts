// API Configuration
// Update this file to change API endpoints

export const API_CONFIG = {
  // Local development - Web
  // Use 127.0.0.1 instead of localhost for better compatibility
  DEVELOPMENT_WEB: {
    BASE_URL: "http://127.0.0.1:5000",
    TIMEOUT: 30000,
  },

  // Local development - Mobile (use your machine IP)
  // Change 192.168.1.X to your actual machine IP
  DEVELOPMENT_MOBILE: {
    BASE_URL: "http://192.168.1.100:5000", // Change this to your machine's IP
    TIMEOUT: 30000,
  },

  // Production (update before deploying)
  PRODUCTION: {
    BASE_URL: "https://api.recallify.example.com",
    TIMEOUT: 30000,
  },

  // Staging
  STAGING: {
    BASE_URL: "https://staging-api.recallify.example.com",
    TIMEOUT: 30000,
  },
};

// Get current environment
export const getApiConfig = () => {
  // For web/local development, use 127.0.0.1
  // For mobile, you'll need to use your machine's actual IP address
  return API_CONFIG.DEVELOPMENT_WEB;
};

// Helper function to make API calls
export const callApi = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const config = getApiConfig();
  const url = `${config.BASE_URL}${endpoint}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};
