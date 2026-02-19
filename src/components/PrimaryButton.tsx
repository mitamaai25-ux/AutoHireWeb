import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from 'react-native';

type Props = { title: string; onPress?: (e: GestureResponderEvent)=>void; disabled?: boolean };

export const PrimaryButton: React.FC<Props> = ({ title, onPress, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    disabled={disabled}
    style={[styles.button, disabled && styles.disabled]}
    accessibilityRole="button"
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3A6FF8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
  disabled: { opacity: 0.5 },
});
