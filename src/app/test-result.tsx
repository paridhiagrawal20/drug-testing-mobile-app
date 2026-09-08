import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';

export default function TestResultScreen() {
  return (
    <FieldTestingPage
      title="Test Result"
      subtitle="Mock analysis complete for this field test."
      icon={{ ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' }}>
      <View style={styles.resultCard}>
        <View style={styles.resultIcon}>
          <SymbolView
            name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
            size={44}
            tintColor="#FFFFFF"
          />
        </View>
        <Text style={styles.resultLabel}>TEST RESULT</Text>
        <Text style={styles.resultValue}>Negative</Text>
        <Text style={styles.resultDescription}>
          No presumptive positive indicators were detected in this mock analysis.
        </Text>
        <View style={styles.verifiedBadge}>
          <View style={styles.verifiedDot} />
          <Text style={styles.verifiedText}>Ready for officer review</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <DetailRow label="Test ID" value="FT-2025-0088" />
        <DetailRow label="Sample type" value="Urine" />
        <DetailRow label="Analyzed" value="Today, 11:04 AM" />
        <DetailRow label="Status" value="Mock result" />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/home')}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
        <Text style={styles.primaryButtonText}>Back to Home</Text>
        <SymbolView name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }} size={19} tintColor="#FFFFFF" />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/new-test')}
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
        <Text style={styles.secondaryButtonText}>Start Another Test</Text>
      </Pressable>
    </FieldTestingPage>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    alignItems: 'center',
    padding: 25,
    borderRadius: 22,
    backgroundColor: '#1D556B',
  },
  resultIcon: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 38,
    backgroundColor: '#4D8065',
    marginBottom: 16,
  },
  resultLabel: {
    color: '#BBD5D8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
    marginTop: 5,
  },
  resultDescription: {
    maxWidth: 290,
    color: '#C4DADD',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    textAlign: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginTop: 17,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  verifiedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A8E4C0',
  },
  verifiedText: {
    color: '#D2ECDB',
    fontSize: 11,
    fontWeight: '700',
  },
  detailsCard: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginTop: 15,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F2',
  },
  detailLabel: {
    color: '#82939D',
    fontSize: 12,
    fontWeight: '600',
  },
  detailValue: {
    color: '#244657',
    fontSize: 12,
    fontWeight: '800',
  },
  primaryButton: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: '#1D556B',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C6D9DD',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#1D556B',
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
});
