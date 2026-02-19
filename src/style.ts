import { StyleSheet } from 'react-native';
import { colors, spacing, radii } from './theme/tokens';

export const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor: colors.bg },
  container: { padding: spacing.md },
  h1: { fontSize: 22, fontWeight: '600', color: colors.textPrimary }
});
