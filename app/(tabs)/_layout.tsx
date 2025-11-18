import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { store } from '@/state/store';
import { Provider } from 'react-redux';

export default function TabLayout() {
  return (
    <Provider store={store}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: 'User',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="role"
          options={{
            title: 'Role',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
          }}
        />
      </Tabs>
    </Provider>
  );
}
