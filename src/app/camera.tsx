import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';

export default function CameraScreen() {
  return (
    <FieldTestingPage
      title="Camera / Test"
      subtitle="The test capture step will be available here."
      icon={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}>
      <View style={styles.previewCard}>
        <View style={styles.cameraFrame}>
          <SymbolView
            name={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}
            size={38}
            tintColor="#8BA1A8"
          />
          <Text style={styles.previewTitle}>Camera setup coming next</Text>
          <Text style={styles.previewDescription}>
            Your test details are ready. Camera capture will be added in the next step.
          </Text>
        </View>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Test information saved locally</Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/new-test')}
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
        <SymbolView name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }} size={19} tintColor="#1D556B" />
        <Text style={styles.secondaryButtonText}>Back to Test Details</Text>
      </Pressable>
    </FieldTestingPage>
  );
}

const styles = StyleSheet.create({
  previewCard: {
    padding: 16,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  cameraFrame: {
    minHeight: 290,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#B9CDD1',
    borderStyle: 'dashed',
    backgroundColor: '#F4F8F8',
  },
  previewTitle: {
    color: '#244657',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 17,
    textAlign: 'center',
  },
  previewDescription: {
    maxWidth: 260,
    color: '#788C94',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 15,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4D8065',
  },
  statusText: {
    color: '#5E776A',
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 16,
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
