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
      subtitle="Complete information for the selected test."
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
        <DetailRow label="Test type" value={test.testType} />
        <DetailRow label="Date and time" value={test.dateTime} />
        <DetailRow label="Location" value={test.location} />
        <DetailRow label="Test result" value={test.result} valueColor={resultColor} />
        <DetailRow label="Status" value={test.status} last />
      </View>

      <View style={styles.analysisCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Analysis details</Text>
          <Text style={styles.mockLabel}>MOCK VALUES</Text>
        </View>
        <AnalysisRow label="Analysis confidence" value="98.4%" />
        <AnalysisRow label="Calibration status" value="Calibrated" />
        <AnalysisRow label="Image quality" value="Good" last />
      </View>

      <View style={styles.operatorCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Operator information</Text>
          <View style={styles.operatorIcon}>
            <SymbolView name={{ ios: 'person.fill', android: 'person', web: 'person' }} size={17} tintColor="#1D6877" />
          </View>
        </View>
        <DetailRow label="Officer" value="Officer James Carter" />
        <DetailRow label="Officer ID" value="OF-10428" />
        <DetailRow label="Agency" value="Metro Public Safety" last />
      </View>

      <View style={styles.imageCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Test image</Text>
          <Text style={styles.mockLabel}>PLACEHOLDER</Text>
        </View>
        <View style={styles.imagePlaceholder}>
          <View style={styles.imagePlaceholderIcon}>
            <SymbolView
              name={{ ios: 'photo.fill', android: 'image', web: 'image' }}
              size={28}
              tintColor="#7A9199"
            />
          </View>
          <Text style={styles.imageTitle}>Test capture preview</Text>
          <Text style={styles.imageDescription}>The captured test image will appear here.</Text>
        </View>
      </View>

      <View style={styles.integrityCard}>
        <View style={styles.cardHeader}>
          <View style={styles.integrityTitleWrap}>
            <SymbolView
              name={{ ios: 'lock.shield.fill', android: 'verified_user', web: 'verified_user' }}
              size={20}
              tintColor="#4D8065"
            />
            <Text style={styles.sectionTitle}>Record Integrity</Text>
          </View>
          <Text style={styles.mockLabel}>MOCK</Text>
        </View>
        <IntegrityRow label="SHA-256 Hash" value="a8f3...9d21" />
        <IntegrityRow label="Digital Signature" value="Verified" />
        <IntegrityRow label="Tamper Status" value="No changes detected" last />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => undefined}
        style={({ pressed }) => [styles.reportButton, pressed && styles.pressed]}>
        <SymbolView
          name={{ ios: 'square.and.arrow.up', android: 'share', web: 'share' }}
          size={19}
          tintColor="#1D556B"
        />
        <Text style={styles.reportButtonText}>Download/Share Report</Text>
      </Pressable>

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
  valueColor?: string;
};

function DetailRow({ label, value, last = false, valueColor }: DetailRowProps) {
  return (
    <View style={[styles.detailRow, last && styles.detailRowLast]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, valueColor && { color: valueColor }]}>{value}</Text>
    </View>
  );
}

type AnalysisRowProps = {
  label: string;
  value: string;
  last?: boolean;
};

function AnalysisRow({ label, value, last = false }: AnalysisRowProps) {
  return (
    <View style={[styles.analysisRow, last && styles.analysisRowLast]}>
      <View style={styles.analysisLabelWrap}>
        <View style={styles.analysisDot} />
        <Text style={styles.analysisLabel}>{label}</Text>
      </View>
      <Text style={styles.analysisValue}>{value}</Text>
    </View>
  );
}

type IntegrityRowProps = {
  label: string;
  value: string;
  last?: boolean;
};

function IntegrityRow({ label, value, last = false }: IntegrityRowProps) {
  return (
    <View style={[styles.integrityRow, last && styles.integrityRowLast]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.integrityValueWrap}>
        <View style={styles.integrityDot} />
        <Text style={styles.integrityValue}>{value}</Text>
      </View>
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
  analysisCard: {
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 6,
    marginTop: 14,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  mockLabel: {
    color: '#A47735',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  analysisRow: {
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F2',
  },
  analysisRowLast: {
    borderBottomWidth: 0,
  },
  analysisLabelWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  analysisDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4D8065',
  },
  analysisLabel: {
    color: '#526B77',
    fontSize: 12,
    fontWeight: '600',
  },
  analysisValue: {
    color: '#4D8065',
    fontSize: 12,
    fontWeight: '800',
  },
  operatorCard: {
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 6,
    marginTop: 14,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  operatorIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#E3F0F1',
  },
  imageCard: {
    padding: 18,
    marginTop: 14,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  imagePlaceholder: {
    minHeight: 190,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#B9CDD1',
    borderStyle: 'dashed',
    backgroundColor: '#F4F8F8',
  },
  imagePlaceholderIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#DFEAEC',
  },
  imageTitle: {
    color: '#526B77',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 12,
  },
  imageDescription: {
    color: '#82939D',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  integrityCard: {
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 6,
    marginTop: 14,
    borderRadius: 19,
    backgroundColor: '#F6FBF8',
    borderWidth: 1,
    borderColor: '#CFE3D5',
  },
  integrityTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  integrityRow: {
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DFEDE2',
  },
  integrityRowLast: {
    borderBottomWidth: 0,
  },
  integrityValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  integrityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4D8065',
  },
  integrityValue: {
    color: '#4D8065',
    fontSize: 12,
    fontWeight: '800',
  },
  reportButton: {
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C6D9DD',
    backgroundColor: '#FFFFFF',
  },
  reportButtonText: {
    color: '#1D556B',
    fontSize: 14,
    fontWeight: '800',
  },
  historyButton: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: '#E3F0F1',
  },
  historyButtonText: {
    color: '#1D6877',
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
});
