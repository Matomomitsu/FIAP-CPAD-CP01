import { LogBox } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// expo-notifications emite este aviso no Expo Go (SDK 53+) ao inicializar o módulo
// nativo, mesmo quando apenas notificações locais são utilizadas. O app não usa
// remote push notifications, portanto o aviso é inócuo e pode ser suprimido.
LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications (remote notifications)',
]);

import { CartProvider } from '../contexts/CartContext';
import { OrderProvider } from '../contexts/OrderContext';
import { UserProvider } from '../contexts/UserContext';
import { theme } from '../styles/theme';

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <OrderProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
            <Stack.Screen name="tabs/cardapio" />
            <Stack.Screen name="tabs/pagamento" />
            <Stack.Screen name="tabs/pedido-final" />
            <Stack.Screen name="tabs/conta" />
            <Stack.Screen name="tabs/historico" />
            <Stack.Screen name="tabs/detalhe-pedido" />
          </Stack>
        </OrderProvider>
      </CartProvider>
    </UserProvider>
  );
}
