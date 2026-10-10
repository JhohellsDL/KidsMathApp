/* eslint-env jest */
const mockMobileAdsInstance = {
  setRequestConfiguration: jest.fn().mockResolvedValue(undefined),
  initialize: jest.fn().mockResolvedValue(undefined),
};

jest.mock('react-native-google-mobile-ads', () => {
  return {
    __esModule: true,
    default: jest.fn(() => mockMobileAdsInstance),
    BannerAd: () => null,
    BannerAdSize: {
      ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
      BANNER: 'BANNER',
    },
    TestIds: {
      BANNER: 'ca-app-pub-3940256099942544/6300978111',
      REWARDED: 'ca-app-pub-3940256099942544/5224354917',
      INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
    },
    MaxAdContentRating: { G: 'G' },
    RewardedAd: {
      createForAdRequest: jest.fn(() => ({
        addAdEventListener: jest.fn(() => jest.fn()),
        load: jest.fn(),
        show: jest.fn().mockResolvedValue(undefined),
      })),
    },
    RewardedAdEventType: {
      LOADED: 'loaded',
      EARNED_REWARD: 'earned_reward',
    },
    AdEventType: {
      LOADED: 'loaded',
      ERROR: 'error',
      CLOSED: 'closed',
    },
    useRewardedAd: jest.fn(() => ({
      status: 'loaded',
      earnedReward: false,
      reward: null,
      show: jest.fn(),
      load: jest.fn(),
    })),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    __esModule: true,
    NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
      reset: jest.fn(),
      replace: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    __esModule: true,
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: () => null,
    }),
  };
});

const mockAsyncStorageStore = new Map();

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(async (key, value) => {
      mockAsyncStorageStore.set(key, String(value));
    }),
    getItem: jest.fn(async key => {
      return mockAsyncStorageStore.get(key) ?? null;
    }),
    removeItem: jest.fn(async key => {
      mockAsyncStorageStore.delete(key);
    }),
    clear: jest.fn(async () => {
      mockAsyncStorageStore.clear();
    }),
    getAllKeys: jest.fn(async () => {
      return Array.from(mockAsyncStorageStore.keys());
    }),
  },
}));



