export interface LedgerCounts {
  transactions: number;
  operations: number;
}

export interface LedgerCountDiscrepancy {
  entity: keyof LedgerCounts;
  expected: number;
  actual: number;
}

export function findLedgerCountDiscrepancies(
  expected: LedgerCounts,
  actual: LedgerCounts
): LedgerCountDiscrepancy[] {
  return (['transactions', 'operations'] as const)
    .filter(entity => expected[entity] !== actual[entity])
    .map(entity => ({ entity, expected: expected[entity], actual: actual[entity] }));
}