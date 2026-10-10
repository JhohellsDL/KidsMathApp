import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useProgressStore } from '../../state/progressStore';
import {
  ProgressHeader,
  ProgressTabBar,
  MetricsOverview,
  SessionCard,
  EmptyProgress,
  ClearHistoryModal,
} from '../../ui/components';
import { COLORS } from '../../ui/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Progress'>;

export const ProgressScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const sessions = useProgressStore(state => state.sessions);
  const clearHistory = useProgressStore(state => state.clearHistory);
  const summary = useProgressStore(state => state.getSummary)();

  const [activeTab, setActiveTab] = useState<'summary' | 'history'>('summary');
  const [isClearModalVisible, setIsClearModalVisible] = useState(false);

  const handleConfirmClear = () => {
    setIsClearModalVisible(false);
    clearHistory();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}>
      <ProgressHeader
        onBack={() => navigation.goBack()}
        onClear={() => setIsClearModalVisible(true)}
        hasSessions={sessions.length > 0}
      />

      <ProgressTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sessionsCount={sessions.length}
      />

      {activeTab === 'summary' ? (
        <MetricsOverview summary={summary} />
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <SessionCard session={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyProgress onStartPractice={() => navigation.navigate('Home')} />
          }
        />
      )}

      <ClearHistoryModal
        visible={isClearModalVisible}
        onConfirm={handleConfirmClear}
        onCancel={() => setIsClearModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 20,
    gap: 12,
  },
});
