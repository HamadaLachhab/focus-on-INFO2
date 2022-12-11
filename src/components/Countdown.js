import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../constants/sizes';
import { colors } from '../constants/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState();

  const closeTimer = () => {
    interval.current && clearInterval(interval.current);
    interval.current = null;
  };

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        closeTimer();
        return time;
      }

      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  const minutesLeft = Math.floor(millis / 1000 / 60) % 60;
  const secondsLeft = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    // report the progress
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) onEnd();
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      closeTimer();
      console.log(`isPaused: timer has ended --->`, interval.current);

      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => closeTimer();
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minutesLeft)}:{formatTime(secondsLeft)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
