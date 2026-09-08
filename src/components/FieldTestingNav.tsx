import { router, usePathname } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AppRoute = '/home' | '/new-test' | '/history' | '/profile';

type NavigationItem = {
  label: string;
  route: AppRoute;
  icon: SymbolViewProps['name'];
};

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    route: '/home',
    icon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  {
    label: 'New Test',
    route: '/new-test',
    icon: { ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' },
  },
  {
    label: 'History',
    route: '/history',
    icon: { ios: 'clock.fill', android: 'history', web: 'history' },
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: { ios: 'person.fill', android: 'person', web: 'person' },
  },
];

export function FieldTestingNav() {
  const pathname = usePathname();

  return (
    <View style={styles.navigationBar}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.route;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Go to ${item.label}`}
            key={item.route}
            onPress={() => router.replace(item.route)}
            style={({ pressed }) => [styles.navigationItem, pressed && styles.pressed]}>
            <SymbolView
              name={item.icon}
              size={21}
              tintColor={isActive ? '#1D6877' : '#82939D'}
            />
            <Text style={[styles.navigationLabel, isActive && styles.navigationLabelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: 72,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 7,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DDE6E9',
  },
  navigationItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 66,
    minHeight: 54,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  navigationLabel: {
    color: '#82939D',
    fontSize: 11,
    fontWeight: '600',
  },
  navigationLabelActive: {
    color: '#1D6877',
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.65,
  },
});
