import { StyleSheet, Text, View } from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';
import { MOCK_TESTS } from '@/components/FieldTestingData';

export default function HistoryScreen() {
  return (
    <FieldTestingPage
      title="Test History"
      subtitle="Review your recent field testing activity."
      icon={{ ios: 'clock.fill', android: 'history', web: 'history' }}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryValue}>248</Text>
        <Text style={styles.summaryLabel}>Total tests recorded</Text>
        <View style={styles.summaryDivider} />
        <View style={styles.summarySplit}>
          <View>
            <Text style={styles.summarySmallValue}>239</Text>
            <Text style={styles.summarySmallLabel}>Negative</Text>
          </View>
          <View>
            <Text style={[styles.summarySmallValue, styles.positive]}>09</Text>
            <Text style={styles.summarySmallLabel}>Positive</Text>
          </View>
        </View>
      </View>
      <Text style={styles.listTitle}>Recent records</Text>
      <View style={styles.recordList}>
        {MOCK_TESTS.map((test) => (
          <View key={test.id} style={styles.recordRow}>
            <View style={styles.recordDetails}>
              <Text style={styles.recordId}>{test.id}</Text>
              <Text style={styles.recordMeta}>{test.dateTime}</Text>
              <Text style={styles.recordMeta}>{test.sampleType}</Text>
            </View>
            <View style={styles.recordResult}>
              <Text
                style={[
                  styles.result,
                  test.result === 'Positive' && styles.positive,
                  test.result === 'Pending' && styles.pending,
                ]}>
                {test.result}
              </Text>
              <Text style={styles.status}>{test.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </FieldTestingPage>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: 20,
    borderRadius: 19,
    backgroundColor: '#1D556B',
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
  },
  summaryLabel: {
    color: '#C4DADD',
    fontSize: 13,
    marginTop: 2,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 16,
  },
  summarySplit: {
    flexDirection: 'row',
    gap: 45,
  },
  summarySmallValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  summarySmallLabel: {
    color: '#C4DADD',
    fontSize: 11,
    marginTop: 3,
  },
  listTitle: {
    color: '#18384B',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 27,
    marginBottom: 12,
  },
  recordList: {
    gap: 10,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  recordDetails: {
    flex: 1,
  },
  recordId: {
    color: '#244657',
    fontSize: 13,
    fontWeight: '800',
  },
  recordMeta: {
    color: '#82939D',
    fontSize: 11,
    marginTop: 3,
  },
  recordResult: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  result: {
    color: '#4D8065',
    fontSize: 13,
    fontWeight: '800',
  },
  status: {
    color: '#647A84',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  positive: {
    color: '#B75B52',
  },
  pending: {
    color: '#A47735',
  },
});
