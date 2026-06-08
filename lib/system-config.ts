export const PI_NETWORK_CONFIG = {
  SDK_URL: "https://sdk.minepi.com/pi-sdk.js",
  SANDBOX: true,
} as const;

export const BACKEND_CONFIG = {
  BASE_URL: "",
  BLOCKCHAIN_BASE_URL: "https://api.testnet.minepi.com",
} as const;

export const BACKEND_URLS = {
  LOGIN: `/api/signin`,
  LOGIN_PREVIEW: `/api/signin`,
  GET_PRODUCTS: (appId: string) => `/api/products`,
  GET_PAYMENT: (paymentId: string) => `/api/payments/get?paymentId=${paymentId}`,
  APPROVE_PAYMENT: (paymentId: string) => `/api/payments/approve`,
  COMPLETE_PAYMENT: (paymentId: string) => `/api/payments/complete`,
} as const;

export const PI_PLATFORM_URLS = {} as const;

export const PI_BLOCKCHAIN_URLS = {
  GET_TRANSACTION: (txid: string) =>
    `${BACKEND_CONFIG.BLOCKCHAIN_BASE_URL}/transactions/${txid}/effects`,
} as const;
