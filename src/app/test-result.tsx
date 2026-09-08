import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';

export default function TestResultScreen() {
  const [saved, setSaved] = useState(false);

  return (
    <FieldTestingPage
      title="Analysis Summary"
      subtitle="Review the mock findings before saving this test."
      headerTitle="Test Result"
      backRoute="/camera"
      backLabel="Go to Capture Test"
      icon={{ ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' }}>
      <View style={styles.summaryCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardEyebrow}>FIELD TEST SUMMARY</Text>
            <Text style={styles.cardTitle}>Test information</Text>
          </View>
          <View style={styles.summaryIcon}>
            <SymbolView
              name={{ ios: 'doc.text.fill', android: 'description', web: 'description' }}
              size={20}
              tintColor="#1D6877"
            />
          </View>
        </View>
        <View style={styles.summaryRows}>
          <DetailRow label="Test ID" value="FT-2025-0088" />
          <DetailRow label="Date and time" value="Today, 11:04 AM" />
          <DetailRow label="Test type" value="5-Panel Drug Screen" />
          <DetailRow label="Sample ID" value="SM-0088-UR" last />
        </View>
      </View>

      <View style={styles.resultCard}>
        <View style={styles.resultIcon}>
          <SymbolView
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            size={39}
            tintColor="#FFFFFF"
          />
        </View>
        <Text style={styles.resultEyebrow}>MOCK TEST RESULT</Text>
        <Text style={styles.resultValue}>NEGATIVE</Text>
        <Text style={styles.resultDescription}>
          No presumptive positive indicators were detected in this mock analysis.
        </Text>
        <View style={styles.verifiedBadge}>
          <View style={styles.verifiedDot} />
          <Text style={styles.verifiedText}>Ready for officer review</Text>
        </View>
      </View>

      <View style={styles.analysisCard}>
        <View style={styles.analysisHeader}>
          <Text style={styles.sectionTitle}>Analysis details</Text>
          <Text style={styles.mockLabel}>MOCK DATA</Text>
        </View>
        <AnalysisRow label="Reference card detected" value="Detected" />
        <AnalysisRow label="Test strip detected" value="Detected" />
        <AnalysisRow label="Image quality" value="Good" />
        <AnalysisRow label="Calibration status" value="Calibrated" />
        <AnalysisRow label="Analysis confidence" value="98.4%" last />
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setSaved(true)}
          style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: saved ? 'checkmark.circle.fill' : 'square.and.arrow.down.fill', android: saved ? 'check_circle' : 'save', web: saved ? 'check_circle' : 'save' }}
            size={19}
            tintColor="#FFFFFF"
          />
          <Text style={styles.saveButtonText}>Save Test Result</Text>
        </Pressable>
        {saved && <Text style={styles.savedText}>Test result saved locally</Text>}
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/camera')}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'arrow.counterclockwise', android: 'refresh', web: 'refresh' }}
            size={18}
            tintColor="#1D556B"
          />
          <Text style={styles.secondaryButtonText}>Retest</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/home')}
          style={({ pressed }) => [styles.homeButton, pressed && styles.pressed]}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </Pressable>
      </View>

      <View style={styles.disclaimerCard}>
        <SymbolView
          name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
          size={18}
          tintColor="#7C6A48"
        />
        <Text style={styles.disclaimerText}>
          This result is generated from the field testing workflow and should be verified according to applicable testing procedures.
        </Text>
      </View>
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

const styles = StyleSheet.create({
  summaryCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardEyebrow: {
    color: '#80929A',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  cardTitle: {
    color: '#18384B',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },
  summaryIcon: {
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E3F0F1',
  },
  summaryRows: {
    borderTopWidth: 1,
    borderTopColor: '#EDF1F2',
  },
  detailRow: {
    minHeight: 42,
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
    color: '#80929A',
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
    alignItems: 'center',
    padding: 23,
    marginTop: 14,
    borderRadius: 21,
    backgroundColor: '#1D556B',
  },
  resultIcon: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: '#4D8065',
    marginBottom: 14,
  },
  resultEyebrow: {
    color: '#BBD5D8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: 1.3,
    marginTop: 4,
  },
  resultDescription: {
    maxWidth: 300,
    color: '#C4DADD',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    textAlign: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginTop: 16,
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
  analysisCard: {
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 6,
    marginTop: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sectionTitle: {
    color: '#18384B',
    fontSize: 16,
    fontWeight: '800',
  },
  mockLabel: {
    color: '#9A7035',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  analysisRow: {
    minHeight: 42,
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
  actions: {
    gap: 10,
    marginTop: 18,
  },
  saveButton: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    backgroundColor: '#1D556B',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  savedText: {
    color: '#4D8065',
    fontSize: 11,
    fontWeight: '700',
    marginTop: -2,
    textAlign: 'center',
  },
  secondaryButton: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
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
  homeButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#E3F0F1',
  },
  homeButtonText: {
    color: '#1D6877',
    fontSize: 14,
    fontWeight: '800',
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    padding: 14,
    marginTop: 14,
    borderRadius: 15,
    backgroundColor: '#FFF9ED',
    borderWidth: 1,
    borderColor: '#F0DEB7',
  },
  disclaimerText: {
    flex: 1,
    color: '#7C6A48',
    fontSize: 11,
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.7,
  },
});
