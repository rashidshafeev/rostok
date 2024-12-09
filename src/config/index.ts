interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  features: {
    enableCart: boolean;
    enableComparison: boolean;
    enableFavorites: boolean;
    enableRecentItems: boolean;
  };
  storage: {
    tokenKey: string;
    cartKey: string;
    favoritesKey: string;
    comparisonKey: string;
    recentItemsKey: string;
  };
  pagination: {
    defaultPageSize: number;
    maxPageSize: number;
  };
  cache: {
    ttl: number;
    maxSize: number;
  };
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
}

const development: AppConfig = {
  api: {
    baseUrl: 'http://localhost:3000',
    timeout: 10000,
    retryAttempts: 3
  },
  features: {
    enableCart: true,
    enableComparison: true,
    enableFavorites: true,
    enableRecentItems: true
  },
  storage: {
    tokenKey: 'dev_rostok_token',
    cartKey: 'dev_rostok_cart',
    favoritesKey: 'dev_rostok_favorites',
    comparisonKey: 'dev_rostok_comparison',
    recentItemsKey: 'dev_rostok_recent'
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100
  },
  cache: {
    ttl: 300000, // 5 minutes
    maxSize: 100
  },
  analytics: {
    enabled: false
  }
};

const staging: AppConfig = {
  api: {
    baseUrl: 'https://staging.rosstok.ru',
    timeout: 10000,
    retryAttempts: 3
  },
  features: {
    enableCart: true,
    enableComparison: true,
    enableFavorites: true,
    enableRecentItems: true
  },
  storage: {
    tokenKey: 'staging_rostok_token',
    cartKey: 'staging_rostok_cart',
    favoritesKey: 'staging_rostok_favorites',
    comparisonKey: 'staging_rostok_comparison',
    recentItemsKey: 'staging_rostok_recent'
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100
  },
  cache: {
    ttl: 300000,
    maxSize: 100
  },
  analytics: {
    enabled: true,
    trackingId: 'STAGING-ID'
  }
};

const production: AppConfig = {
  api: {
    baseUrl: 'https://rosstok.ru',
    timeout: 5000,
    retryAttempts: 3
  },
  features: {
    enableCart: true,
    enableComparison: true,
    enableFavorites: true,
    enableRecentItems: true
  },
  storage: {
    tokenKey: 'rostok_token',
    cartKey: 'rostok_cart',
    favoritesKey: 'rostok_favorites',
    comparisonKey: 'rostok_comparison',
    recentItemsKey: 'rostok_recent'
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100
  },
  cache: {
    ttl: 600000, // 10 minutes
    maxSize: 200
  },
  analytics: {
    enabled: true,
    trackingId: 'PROD-ID'
  }
};

const configs = {
  development,
  staging, 
  production
};

export const config = configs[import.meta.env.VITE_APP_ENV || 'development'];
