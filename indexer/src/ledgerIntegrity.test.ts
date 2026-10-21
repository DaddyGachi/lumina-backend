import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findLedgerCountDiscrepancies } from './ledgerIntegrity';

test('reports a transaction row removed from an indexed ledger', () => {
  assert.deepEqual(
    findLedgerCountDiscrepancies(
      { transactions: 4, operations: 9 },
      { transactions: 3, operations: 9 }
    ),
    [{ entity: 'transactions', expected: 4, actual: 3 }]
  );
});

test('reports a missing operation row and ignores matching counts', () => {
  assert.deepEqual(
    findLedgerCountDiscrepancies(
      { transactions: 4, operations: 9 },
      { transactions: 4, operations: 8 }
    ),
    [{ entity: 'operations', expected: 9, actual: 8 }]
  );
  assert.deepEqual(
    findLedgerCountDiscrepancies(
      { transactions: 4, operations: 9 },
      { transactions: 4, operations: 9 }
    ),
    []
  );
});