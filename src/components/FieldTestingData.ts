export type TestRecord = {
  id: string;
  dateTime: string;
  sampleType: string;
  result: 'Negative' | 'Positive' | 'Pending';
  status: 'Verified' | 'Complete' | 'Pending review';
};

export const MOCK_TESTS: TestRecord[] = [
  {
    id: 'FT-2025-0087',
    dateTime: 'Today, 10:42 AM',
    sampleType: 'Oral Fluid',
    result: 'Negative',
    status: 'Verified',
  },
  {
    id: 'FT-2025-0086',
    dateTime: 'Today, 9:18 AM',
    sampleType: 'Urine Panel',
    result: 'Negative',
    status: 'Complete',
  },
  {
    id: 'FT-2025-0085',
    dateTime: 'Yesterday, 4:35 PM',
    sampleType: 'Oral Fluid',
    result: 'Positive',
    status: 'Verified',
  },
  {
    id: 'FT-2025-0084',
    dateTime: 'Yesterday, 1:07 PM',
    sampleType: 'Urine Panel',
    result: 'Pending',
    status: 'Pending review',
  },
];
