import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  color: string;
}

interface CategoryCardProps {
  category: CategoryItem;
  isSelected: boolean;
  onSelect: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && {
          borderColor: category.color,
          borderBottomColor: category.color,
          backgroundColor: '#FFFFFF',
        },
      ]}
      onPress={onSelect}
      activeOpacity={0.85}>
      <View
        style={[
          styles.iconBox,
          { backgroundColor: isSelected ? `${category.color}15` : '#F1F5F9' },
        ]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, isSelected && { color: category.color }]}>
            {category.title}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{category.badge}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{category.subtitle}</Text>
      </View>

      <View
        style={[
          styles.radio,
          isSelected && {
            borderColor: category.color,
            backgroundColor: category.color,
          },
        ]}>
        {isSelected && <Text style={styles.check}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingRight: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  check: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

