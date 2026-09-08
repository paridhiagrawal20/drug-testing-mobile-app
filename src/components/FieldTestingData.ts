export type TestRecord = {
  id: string;
  sampleId: string;
  dateTime: string;
  testType: string;
  sampleType: string;
  location: string;
  result: 'Negative' | 'Positive' | 'Pending';
  status: 'Verified' | 'Complete' | 'Pending review';
};

export const MOCK_TESTS: TestRecord[] = [
  {
    id: 'FT-2025-0087',
    sampleId: 'SM-0087-OF',
    dateTime: 'Today, 10:42 AM',
    testType: '5-Panel Drug Screen',
    sampleType: 'Oral Fluid',
    location: 'North Field Office',
    result: 'Negative',
    status: 'Verified',
  },
  {
    id: 'FT-2025-0086',
    sampleId: 'SM-0086-UR',
    dateTime: 'Today, 9:18 AM',
    testType: '10-Panel Drug Screen',
    sampleType: 'Urine',
    location: 'Central Processing',
    result: 'Negative',
    status: 'Complete',
  },
  {
    id: 'FT-2025-0085',
    sampleId: 'SM-0085-OF',
    dateTime: 'Yesterday, 4:35 PM',
    testType: '5-Panel Drug Screen',
    sampleType: 'Oral Fluid',
    location: 'West Precinct',
    result: 'Positive',
    status: 'Verified',
  },
  {
    id: 'FT-2025-0084',
    sampleId: 'SM-0084-UR',
    dateTime: 'Yesterday, 1:07 PM',
    testType: 'Alcohol Screening',
    sampleType: 'Urine',
    location: 'South Patrol Area',
    result: 'Pending',
    status: 'Pending review',
  },
];
