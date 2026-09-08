import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';

export default function ProfileScreen() {
  return (
    <FieldTestingPage
      title="Officer Profile"
      subtitle="Your secure field testing credentials."
      icon={{ ios: 'person.fill', android: 'person', web: 'person' }}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <SymbolView name={{ ios: 'person.fill', android: 'person', web: 'person' }} size={31} tintColor="#FFFFFF" />
        </View>
        <Text style={styles.name}>Officer James Carter</Text>
        <Text style={styles.role}>Field Testing Officer</Text>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Authorized personnel</Text>
        </View>
      </View>
      <View style={styles.detailsCard}>
        <DetailRow label="Officer ID" value="OF-10428" />
        <DetailRow label="Agency" value="Metro Public Safety" />
        <DetailRow label="Access level" value="Field operations" />
        <DetailRow label="Last active" value="Today, 10:42 AM" />
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/')}
        style={({ pressed }) => [styles.signOutButton, pressed && styles.pressed]}>
        <SymbolView name={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }} size={19} tintColor="#B75B52" />
        <Text style={styles.signOutText}>Sign out</Text>
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
  profileCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  avatar: {
    width: 73,
    height: 73,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    backgroundColor: '#1D556B',
    marginBottom: 14,
  },
  name: {
    color: '#18384B',
    fontSize: 19,
    fontWeight: '800',
  },
  role: {
    color: '#758790',
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: '#E6F1EB',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4D8065',
  },
  badgeText: {
    color: '#4D8065',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
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
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
    marginTop: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8C8C3',
    backgroundColor: '#FFF9F8',
  },
  signOutText: {
    color: '#B75B52',
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
});
