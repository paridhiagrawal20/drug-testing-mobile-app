import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';

export default function NewTestScreen() {
  return (
    <FieldTestingPage
      title="New Field Test"
      subtitle="Capture a sample and start a secure analysis."
      icon={{ ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' }}>
      <View style={styles.card}>
        <View style={styles.cardIcon}>
          <SymbolView
            name={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}
            size={27}
            tintColor="#1D6877"
          />
        </View>
        <Text style={styles.cardTitle}>Ready to begin?</Text>
        <Text style={styles.cardDescription}>
          Follow the guided steps to capture the test details and securely record your field sample.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/home')}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Begin Test</Text>
          <SymbolView
            name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
            size={19}
            tintColor="#FFFFFF"
          />
        </Pressable>
      </View>
      <View style={styles.infoCard}>
        <InfoRow icon="person" title="Identify subject" description="Record subject and case details." />
        <InfoRow icon="beaker" title="Capture sample" description="Select sample type and capture the result." />
        <InfoRow icon="check" title="Review and submit" description="Verify details before secure submission." />
      </View>
    </FieldTestingPage>
  );
}

type InfoRowProps = {
  icon: 'person' | 'beaker' | 'check';
  title: string;
  description: string;
};

function InfoRow({ icon, title, description }: InfoRowProps) {
  const icons = {
    person: { ios: 'person.fill', android: 'person', web: 'person' },
    beaker: { ios: 'testtube.2', android: 'science', web: 'science' },
    check: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  } as const;

  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <SymbolView name={icons[icon]} size={18} tintColor="#1D6877" />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 25,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  cardIcon: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#E3F0F1',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#18384B',
    fontSize: 20,
    fontWeight: '800',
  },
  cardDescription: {
    maxWidth: 300,
    color: '#72848D',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    textAlign: 'center',
  },
  primaryButton: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'stretch',
    marginTop: 22,
    borderRadius: 14,
    backgroundColor: '#1D556B',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  infoCard: {
    gap: 2,
    padding: 18,
    marginTop: 15,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIcon: {
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E3F0F1',
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    color: '#244657',
    fontSize: 14,
    fontWeight: '800',
  },
  infoDescription: {
    color: '#82939D',
    fontSize: 12,
    marginTop: 3,
  },
  pressed: {
    opacity: 0.7,
  },
});
