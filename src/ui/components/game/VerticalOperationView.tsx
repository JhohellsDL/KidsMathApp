import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

interface VerticalOperationViewProps {
  operand1?: number;
  operand2?: number;
  operatorSymbol?: string;
  category: string;
}

export const VerticalOperationView: React.FC<VerticalOperationViewProps> = ({
  operand1 = 0,
  operand2 = 0,
  operatorSymbol = '+',
}) => {
  // Convierte número a string con dígitos espaciados uniformemente
  const formatDigits = (num: number) => {
    return num.toString().padStart(3, ' ');
  };

  const isThreeDigits = operand1 >= 100 || operand2 >= 100;

  return (
    <View style={styles.container}>
      {/* Badge instructivo para el niño */}
      <View style={styles.tipBadge}>
        <Text style={styles.tipIcon}>📝</Text>
        <Text style={styles.tipText}>Resuelve en tu libreta y marca la respuesta</Text>
      </View>

      {/* Tarjeta de pizarra escolar */}
      <View style={styles.board}>
        {/* Encabezado de columnas: C (Centena), D (Decena), U (Unidad) */}
        {isThreeDigits && (
          <View style={styles.columnsHeader}>
            <Text style={styles.columnLabel}>C</Text>
            <Text style={styles.columnLabel}>D</Text>
            <Text style={styles.columnLabel}>U</Text>
          </View>
        )}

        {/* Fila 1: Primer operando */}
        <View style={styles.row}>
          <View style={styles.operatorPlaceholder} />
          <Text style={styles.digits}>{formatDigits(operand1)}</Text>
        </View>

        {/* Fila 2: Operador + Segundo operando */}
        <View style={styles.row}>
          <Text style={styles.operator}>{operatorSymbol}</Text>
          <Text style={styles.digits}>{formatDigits(operand2)}</Text>
        </View>

        {/* Línea divisoria de cálculo escolar */}
        <View style={styles.divider} />

        {/* Fila 3: Resultado incógnita */}
        <View style={styles.resultRow}>
          <Text style={styles.questionMark}>❓</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 4,
  },
  tipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  tipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  board: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    minWidth: 220,
  },
  columnsHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 140,
    paddingRight: 6,
    marginBottom: 6,
    gap: 22,
  },
  columnLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 150,
  },
  operatorPlaceholder: {
    width: 32,
  },
  operator: {
    width: 32,
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  digits: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 10,
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
  },
  divider: {
    width: 160,
    height: 4,
    backgroundColor: COLORS.text,
    borderRadius: 2,
    marginVertical: 8,
  },
  resultRow: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  questionMark: {
    fontSize: 28,
  },
});
