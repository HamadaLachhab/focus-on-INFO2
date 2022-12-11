import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../constants/sizes';
import { colors } from '../../constants/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item }) => (
  <View>
    <Text style={createHistoryItemStyle(item.status).historyItem}>
      {item.subject}
    </Text>
  </View>
);

export const FocusHistory = ({ focusHistory, onClear }) => {
  useEffect(() => {
    console.log(focusHistory);
  }, [focusHistory]);

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.heading}>Things we have focused on!</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                title="Clear"
                size={75}
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: fontSizes.lg,
    color: colors.white,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearContainer: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});

const createHistoryItemStyle = (status) =>
  StyleSheet.create({
    historyItem: {
      fontSize: fontSizes.lg,
      color: status > 1 ? 'red' : 'green',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
