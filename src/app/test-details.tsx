import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MOCK_TESTS } from '@/components/FieldTestingData';
import { FieldTestingPage } from '@/components/FieldTestingPage';

export default function TestDetailsScreen() {
  const { testId } = useLocalSearchParams<{ testId?: string }>();
  const test = MOCK_TESTS.find((record) => record.id === testId) ?? MOCK_TESTS[0];
  const resultColor = test.result === 'Positive' ? '#B75B52' : test.result === 'Pending' ? '#A47735' : '#4D8065';

  return (
    <FieldTestingPage
      title="Record overview"
      subtitle="Mock details for the selected field test."
      headerTitle="Test Details"
      backRoute="/history"
      backLabel="Go to Test History"
      icon={{ ios: 'doc.text.fill', android: 'description', web: 'description' }}>
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <SymbolView
            name={{ ios: 'doc.text.fill', android: 'description', web: 'description' }}
            size={25}
            tintColor="#1D6877"
          />
        </View>
        <View style={styles.heroText}>
          <Text style={styles.heroId}>{test.id}</Text>
          <Text style={styles.heroSample}>Sample ID: {test.sampleId}</Text>
        </View>
        <View style={[styles.resultBadge, { backgroundColor: `${resultColor}18` }]}>
          <Text style={[styles.resultText, { color: resultColor }]}>{test.result}</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Test information</Text>
        <DetailRow label="Test ID" value={test.id} />
        <DetailRow label="Sample ID" value={test.sampleId} />
        <DetailRow label="Date/time" value={test.dateTime} />
        <DetailRow label="Test type" value={test.testType} />
        <DetailRow label="Sample type" value={test.sampleType} />
        <DetailRow label="Location" value={test.location} />
        <DetailRow label="Status" value={test.status} last />
      </View>

      <View style={styles.resultCard}>
        <View style={styles.resultCardHeader}>
          <Text style={styles.sectionTitle}>Result</Text>
          <View style={styles.mockLabel}>
            <Text style={styles.mockLabelText}>MOCK RESULT</Text>
          </View>
        </View>
        <View style={styles.resultRow}>
          <View style={[styles.resultDot, { backgroundColor: resultColor }]} />
          <Text style={[styles.resultValue, { color: resultColor }]}>{test.result.toUpperCase()}</Text>
        </View>
        <Text style={styles.resultDescription}>
          This record is for interface preview only and has not been connected to a backend.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/history')}
        style={({ pressed }) => [styles.historyButton, pressed && styles.pressed]}>
        <SymbolView name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }} size={18} tintColor="#1D556B" />
        <Text style={styles.historyButtonText}>Back to History</Text>
      </Pressable>
    </FieldTestingPage>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
  last?: boolean;
};

function DetailRow({ label, value, last = false }: DetailRowProps) {
  return (
    <View style={[styles.detailRow, last && styles.detailRowLast]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  heroIcon: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#E3F0F1',
  },
  heroText: {
    flex: 1,
    marginLeft: 11,
  },
  heroId: {
    color: '#244657',
    fontSize: 15,
    fontWeight: '800',
  },
  heroSample: {
    color: '#82939D',
    fontSize: 11,
    marginTop: 4,
  },
  resultBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },
  resultText: {
    fontSize: 11,
    fontWeight: '800',
  },
  detailsCard: {
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 6,
    marginTop: 14,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  sectionTitle: {
    color: '#18384B',
    fontSize: 16,
    fontWeight: '800',
  },
  detailRow: {
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F2',
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    color: '#82939D',
    fontSize: 12,
    fontWeight: '600',
  },
  detailValue: {
    flexShrink: 1,
    color: '#244657',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
  },
  resultCard: {
    padding: 18,
    marginTop: 14,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  resultCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mockLabel: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#FFF3DA',
  },
  mockLabelText: {
    color: '#A47735',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 17,
  },
  resultDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  resultDescription: {
    color: '#82939D',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  historyButton: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 17,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C6D9DD',
    backgroundColor: '#FFFFFF',
  },
  historyButtonText: {
    color: '#1D556B',
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
});
