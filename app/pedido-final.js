import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../styles/theme';

export default function PedidoFinalScreen() {
  const params = useLocalSearchParams();

  const itens = params.itens ? JSON.parse(params.itens) : [];
  const total = params.total || '0.00';
  const formaPagamento = params.formaPagamento || '';
  const numeroPedido = params.numeroPedido || '---';

  const formas = {
    pix: 'PIX',
    cartao: 'Cartão de Crédito',
    saldo: 'Saldo na Carteira',
  };

  return (
    <ScreenContainer showFooter currentRoute="/pedido-final">

      {/* Senha */}
      <View style={styles.ticketCard}>
        <Text style={styles.ticketLabel}>Senha de retirada</Text>
        <Text style={styles.ticketValue}>#{numeroPedido}</Text>
      </View>

      {/* Mensagem */}
      <Text style={styles.mensagem}>
        Retire seu pedido no balcão quando o número for chamado
      </Text>

      {/* Resumo do pedido */}
      <View style={styles.card}>
        {itens.map((item, index) => (
          <View key={item.id}>
            <View style={styles.itemRow}>
              <Text style={styles.itemNome}>
                {item.quantidade}x {item.nome}
              </Text>
              <Text style={styles.itemPreco}>
                R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
              </Text>
            </View>

            {index < itens.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}

        <View style={styles.dividerStrong} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total pago</Text>
          <Text style={styles.totalValor}>
            R$ {Number(total).toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <Text style={styles.pagamento}>
          Forma de pagamento: {formas[formaPagamento] || formaPagamento}
        </Text>
      </View>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  // Ticket
  ticketCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.xl,
  },
  ticketLabel: {
    color: theme.colors.textMuted,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  ticketValue: {
    color: theme.colors.primary,
    fontSize: 42,
    fontWeight: '800',
    marginTop: theme.spacing.sm,
  },

  // Mensagem
  mensagem: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    marginVertical: theme.spacing.md,
  },

  // Card resumo
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  itemNome: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  itemPreco: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
  dividerStrong: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 4,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: theme.colors.textMuted,
  },
  totalValor: {
    color: theme.colors.primary,
    fontWeight: '800',
  },

  pagamento: {
    marginTop: 4,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
});