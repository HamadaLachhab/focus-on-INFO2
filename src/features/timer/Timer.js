import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { TextInput, ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { fontSizes, spacing } from '../../constants/sizes';
import { colors } from '../../constants/colors';

import { Timing } from './Timing';
import { RoundedButton } from '../../components/RoundedButton';
import { Countdown } from '../../components/Countdown';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onProgress = (progress) => setProgress(progress);
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setProgress(1);
    setIsStarted(false);
    setMinutes(min);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}> Focusing on: </Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>

      <View style={styles.clearSubject}>
          <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  task: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSizes.xl,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSubject: {
    paddingBottom: spacing.md,
    paddingLeft: spacing.md
  }
});
