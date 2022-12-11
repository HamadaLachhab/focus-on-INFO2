import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../constants/sizes';
import { colors } from '../../constants/colors';

export const Focus = ({ addSubject }) => {
  const [tempSubject, setTempSubject] = useState(null);

  const onSubmitEditing = ({ nativeEvent }) => setTempSubject(nativeEvent.text);
  const onButtonClicked = () => addSubject(tempSubject);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on? </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onSubmitEditing={onSubmitEditing} />
          <RoundedButton size={50} title="+" onPress={onButtonClicked} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
  },
  inputContainer: {
    paddingTop: spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
