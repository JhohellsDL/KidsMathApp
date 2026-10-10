import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface ProgressTabBarProps {
  activeTab: 'summary' | 'history';
  onTabChange: (tab: 'summary' | 'history') => void;
  sessionsCount: number;
}

export const ProgressTabBar: React.FC<ProgressTabBarProps> = ({
  activeTab,
  onTabChange,
  sessionsCount,
}) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'summary' && styles.tabActive]}
        onPress={() => onTabChange('summary')}
        activeOpacity={0.8}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'summary' && styles.tabTextActive,
          ]}>
          📈 Resumen
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'history' && styles.tabActive]}
        onPress={() => onTabChange('history')}
        activeOpacity={0.8}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'history' && styles.tabTextActive,
          ]}>
          🕒 Historial ({sessionsCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  tabActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
    borderBottomColor: COLORS.primaryDark,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.primaryDark,
    fontWeight: '800',
  },
});
