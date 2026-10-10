import { getBannerId, getRewardedId, childSafeAdOptions, initializeAds } from '../../src/utils/ads';
import mobileAds, { MaxAdContentRating, TestIds } from 'react-native-google-mobile-ads';

describe('Ad Utilities & Configuration', () => {
  it('should return valid test IDs in development mode', () => {
    expect(getBannerId()).toBe(TestIds.BANNER);
    expect(getRewardedId()).toBe(TestIds.REWARDED);
  });

  it('should enforce non-personalized child-safe options', () => {
    expect(childSafeAdOptions.requestNonPersonalizedAdsOnly).toBe(true);
    expect(childSafeAdOptions.keywords).toContain('education');
  });

  it('should call mobileAds setRequestConfiguration and initialize', async () => {
    await initializeAds();

    expect(mobileAds).toHaveBeenCalled();
    const instance = mobileAds();
    expect(instance.setRequestConfiguration).toHaveBeenCalledWith({
      maxAdContentRating: MaxAdContentRating.G,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    });
    expect(instance.initialize).toHaveBeenCalled();
  });
});
