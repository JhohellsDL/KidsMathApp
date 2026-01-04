import { useEffect, useState, useCallback } from 'react';
import { RewardedAd, AdEventType, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { getRewardedId, childSafeAdOptions } from './ads';

export const useRewardedAd = () => {
    const [rewarded, setRewarded] = useState<RewardedAd | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const ad = RewardedAd.createForAdRequest(
            getRewardedId(),
            childSafeAdOptions,
        );

        const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
            console.log('✅ Rewarded ad loaded');
        });

        const unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, (error) => {
            console.log('❌ Rewarded ad failed to load:', error);
            setLoaded(false);
        });

        ad.load();
        setRewarded(ad);

        return () => {
            unsubscribeLoaded();
            unsubscribeError();
        };
    }, []);

    /**
     * Shows the rewarded ad if loaded.
     * @param onReward Callback function executed when the user earns the reward.
     * @param onClose Callback function executed when the ad is closed.
     */
    const showRewardedAd = useCallback((onReward: () => void, onClose?: () => void) => {
        if (loaded && rewarded) {
            // Listener for reward earned
            const unsubscribeEarned = rewarded.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                (reward) => {
                    console.log('🎁 User earned reward:', reward);
                    onReward();
                },
            );

            // Listener for ad closed (cleanup and optional callback)
            const unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
                console.log('✅ Rewarded ad closed');
                unsubscribeEarned();
                unsubscribeClosed();
                setLoaded(false); // Ad is consumed
                rewarded.load(); // Load next ad
                if (onClose) onClose();
            });

            rewarded.show().catch((error) => {
                console.log('❌ Error showing rewarded ad:', error);
            });
        } else {
            console.log('⚠️ Rewarded ad not loaded');
        }
    }, [loaded, rewarded]);

    return { showRewardedAd, loaded };
};
