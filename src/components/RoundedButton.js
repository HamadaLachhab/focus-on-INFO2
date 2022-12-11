import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  const styles = useMemo(() => createStyles(size), [size]);

  return (
    <TouchableOpacity style={[styles.radius, style]} onPress={props.onPress}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'white',
      borderWidth: 2,
    },
    text: { color: 'white', fontSize: size / 3 },
  });
