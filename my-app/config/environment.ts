// Environment Configuration for Different Platforms

/**
 * API Configuration for different environments
 * Update API_BASE_URL based on where you're running:
 * 
 * WEB/LOCAL:    http://127.0.0.1:5000
 * PHONE/MOBILE: http://YOUR_MACHINE_IP:5000 (e.g., http://192.168.1.100:5000)
 * PRODUCTION:   https://your-api.example.com
 */

// ==============================================
// SET YOUR MACHINE IP HERE FOR PHONE TESTING
// ==============================================
export const MACHINE_IP = "172.25.124.156"; // Change this to your IP from ipconfig

// ==============================================
// API Configuration
// ==============================================

export const API_CONFIG = {
  // Web/Local development (127.0.0.1 works for web browser)
  WEB: {
    BASE_URL: "http://127.0.0.1:5000",
    TIMEOUT: 30000,
    DESCRIPTION: "Web/Local (browser)",
  },

  // Mobile/Physical device (use machine IP)
  MOBILE: {
    BASE_URL: `http://${MACHINE_IP}:5000`,
    TIMEOUT: 30000,
    DESCRIPTION: "Mobile/Expo Go",
  },

  // Production
  PRODUCTION: {
    BASE_URL: "https://api.recallify.example.com",
    TIMEOUT: 30000,
    DESCRIPTION: "Production",
  },
};

// ==============================================
// SELECT ACTIVE CONFIGURATION
// ==============================================
// Change this to switch between environments
export const ACTIVE_ENV = "MOBILE"; // "WEB", "MOBILE", or "PRODUCTION"

// Get current config based on active environment
export const getApiConfig = () => {
  const config = API_CONFIG[ACTIVE_ENV as keyof typeof API_CONFIG];
  if (!config) {
    throw new Error(`Unknown environment: ${ACTIVE_ENV}`);
  }
  console.log(`🔧 API Config: ${config.DESCRIPTION} - ${config.BASE_URL}`);
  return config;
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
