import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';

import { fontSizes, spacing } from './src/constants/sizes';
import { colors } from './src/constants/colors';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    const focusItem = { subject, status, key: String(focusHistory.length + 1) };

    console.log(`adding item: ${subject}`)
    if (focusHistory.find((item) => item.subject === subject)) {
      return;
    }

    setFocusHistory((previousHistory) => [...previousHistory, focusItem]);
  };

  const clearList = () => setFocusHistory([]);

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const onTimerEnd = () => {
    console.log('Timer ended');
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
    setFocusSubject(null);
  };

  const clearSubject = () => {
    console.log('Subject cleared');
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={onTimerEnd}
          clearSubject={clearSubject}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} focusHistory={focusHistory} />
          <FocusHistory focusHistory={focusHistory} onClear={clearList} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + spacing.md,
    backgroundColor: colors.darkBlue,
  },
});
