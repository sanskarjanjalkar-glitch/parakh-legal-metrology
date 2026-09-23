import { InspectionRecord } from '../types/compliance';

const STORAGE_KEY = 'parakh_audit_records_v1';
const QUEUE_KEY = 'parakh_pending_sync_v1';

export function getStoredRecords(): InspectionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load local audit records:', e);
    return [];
  }
}

export function saveInspectionRecord(record: InspectionRecord): void {
  try {
    const records = getStoredRecords();
    const updated = [record, ...records.filter(r => r.id !== record.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (!navigator.onLine) {
      const pending = getPendingSync();
      localStorage.setItem(QUEUE_KEY, JSON.stringify([...pending, record.id]));
    }
  } catch (e) {
    console.error('Failed to save record locally:', e);
  }
}

export function getPendingSync(): string[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearSyncQueue(): void {
  localStorage.removeItem(QUEUE_KEY);
}
