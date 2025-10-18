import { ISSUE_FILTER_OPTIONS, ISSUE_FILTER_LABELS } from '@/app/config';
import type { FilterOption } from '../ui/status-filter';

export const ISSUE_STATUS_FILTER_OPTIONS: FilterOption[] = [
    { label: ISSUE_FILTER_LABELS.OPEN, value: ISSUE_FILTER_OPTIONS.OPEN },
    { label: ISSUE_FILTER_LABELS.CLOSED, value: ISSUE_FILTER_OPTIONS.CLOSED },
    { label: ISSUE_FILTER_LABELS.ALL, value: ISSUE_FILTER_OPTIONS.ALL },
];
