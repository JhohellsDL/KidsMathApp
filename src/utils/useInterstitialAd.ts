import {useEffect, useState, useCallback} from 'react';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import {getInterstitialId, childSafeAdOptions} from './ads';

export const useInterstitialAd = () => {
  const [interstitial, setInterstitial] = useState<InterstitialAd | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let ad = InterstitialAd.createForAdRequest(
      getInterstitialId(),
      childSafeAdOptions,
    );

    const unsubscribeLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      console.log('✅ Interstitial ad loaded');
    });

    const unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('❌ Interstitial ad failed to load:', error);
      setLoaded(false);
    });

    ad.load();
    setInterstitial(ad);

    return () => {
      unsubscribeLoaded();
      unsubscribeError();
      // We don't nullify interstitial here to avoid losing the reference if it's needed during unmount cleanup,
      // but purely strictly, we just unsubscribe events.
    };
  }, []);

  /**
   * Shows the interstitial ad if loaded.
   * @param onClose Callback function to execute after the ad is closed or if it fails to show.
   */
  const showAd = useCallback((onClose?: () => void) => {
    if (loaded && interstitial) {
      // Need to listen for close event to trigger the callback
      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('✅ Interstitial ad closed');
        unsubscribeClosed();
        if (onClose) onClose();
      });

      // Also handle potential errors during show (optional but good practice)
      // Note: usage of try-catch around .show() might be needed if the library throws, 
      // but usually errors are handled via listeners. 
      // However, safely we just show.
      
      try {
        interstitial.show();
      } catch (error) {
        console.log('❌ Error showing interstitial:', error);
        if (onClose) onClose();
      }
    } else {
      console.log('⚠️ Interstitial not loaded, skipping');
      if (onClose) onClose();
    }
  }, [loaded, interstitial]);

  return {showAd, loaded};
};
