import 'react-native-get-random-values';
import { v7 as uuidv7 } from 'uuid';

// Duração do estágio "preparando" antes do pedido ficar "pronto para retirada".
// Compartilhado pela tela de pedido final (transição de status) e pela tela de
// pagamento (agendamento das notificações locais).
export const ORDER_PREP_DURATION_MS = 20000;
export const ORDER_PREPARING_NOTIFICATION_OFFSET_MS = 5000;

export const ORDER_STATUS = {
  IN_PROGRESS: 'em_andamento',
  COMPLETED: 'finalizado',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.IN_PROGRESS]: 'Em andamento',
  [ORDER_STATUS.COMPLETED]: 'Finalizado',
};

export const PAYMENT_METHOD_LABELS = {
  pix: 'PIX',
  cartao: 'Cartão de Crédito',
  saldo: 'Saldo na Carteira',
};

function generatePickupCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function createOrderRecord({ itens, total, formaPagamento }) {
  const createdAt = new Date().toISOString();
  const senha = generatePickupCode();

  return {
    id: uuidv7(),
    itens,
    total,
    formaPagamento,
    senha,
    status: ORDER_STATUS.IN_PROGRESS,
    createdAt,
    finalizedAt: null,
  };
}

export function finalizeOrderRecord(order, finalizedAt = new Date().toISOString()) {
  if (!order) {
    return null;
  }

  return {
    ...order,
    status: ORDER_STATUS.COMPLETED,
    finalizedAt,
  };
}

export function formatOrderDateTime(value) {
  if (!value) {
    return '--';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '--';
  }

  const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: deviceTimeZone,
  }).format(date);
}

export function buildCartFromOrder(order) {
  const nextCart = {};

  for (const { item, quantity } of order?.itens ?? []) {
    nextCart[item.title] = {
      item,
      quantity,
    };
  }

  return nextCart;
}
