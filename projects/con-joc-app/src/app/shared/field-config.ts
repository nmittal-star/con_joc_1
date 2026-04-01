// Shared field configuration for accounts/general setting
export const accountFieldsArray = [
  { name: 'id', labels: 'ID', type: 'number' },
  { name: 'name', labels: 'Name', type: 'text' },
  { name: 'companyName', labels: 'Company Name', type: 'text'},
  { name: 'website', labels: 'Website', type: 'text' },
  { name: 'gmt', labels: 'Default GMT', type: 'select', options: [
    { key: 'GMT-5', value: 'gmt-5' },
    { key: 'GMT-6', value: 'gmt-6' },
    { key: 'GMT-7', value: 'gmt-7' }
  ] },
  { name: 'billing', labels: 'Billing Production', type: 'select', options: [
    { key: 'Production', value: 'prod' },
    { key: 'Test', value: 'test' }
  ] },
  { name: 'testAccount', labels: 'Test Account', type: 'select', options: [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' }
  ] },
  { name: 'provider', labels: 'VOIP Provider', type: 'select', options: [
    { key: 'Twilio', value: 'twilio' },
    { key: 'Plivo', value: 'plivo' },
    { key: 'Other', value: 'other' }
  ] },
  { name: 'salesRep', labels: 'Sales Representative', type: 'select', options: [
    { key: 'Alice', value: 'alice' },
    { key: 'Bob', value: 'bob' },
    { key: 'Carol', value: 'carol' }
  ] },
  { name: 'implementationManager', labels: 'Implementation Manager', type: 'select', options: [
    { key: 'Dave', value: 'dave' },
    { key: 'Eve', value: 'eve' }
  ] },
  { name: 'csmRepresentative', labels: 'CSM Representative', type: 'select', options: [
    { key: 'Frank', value: 'frank' },
    { key: 'Grace', value: 'grace' }
  ] },
  { name: 'csaRepresentative', labels: 'CSA Representative', type: 'select', options: [
    { key: 'Heidi', value: 'heidi' },
    { key: 'Ivan', value: 'ivan' }
  ] },
  { name: 'vosoCsm', labels: 'VOSO.ai CSM', type: 'select', options: [
    { key: 'Judy', value: 'judy' },
    { key: 'Mallory', value: 'mallory' }
  ] },
  { name: 'callerid', labels: 'DefaultCaller ID', type: 'number' },
  { name: 'accountStatus', labels: 'Account Status', type: 'select', options: [
    { key: 'Active', value: 'active' },
    { key: 'Inactive', value: 'inactive' }
  ] },
  { name: 'cluster', labels: 'Cluster', type: 'number' },
  { name: 'customerTier', labels: 'Customer Tier', type: 'number' },
  { name: 'gracePeriod', labels: 'Grace Period', type: 'select', options: [
    { key: 'None', value: 'none' },
    { key: '7 Days', value: '7d' },
    { key: '30 Days', value: '30d' }
  ] },
  { name: 'compliance', labels: 'Security Compliance', type: 'select', options: [
    { key: 'HIPAA', value: 'hipaa' },
    { key: 'GDPR', value: 'gdpr' },
    { key: 'None', value: 'none' }
  ] },
  { name: 'beta', labels: 'Beta Mode', type: 'select', options: [
    { key: 'Enabled', value: 'enabled' },
    { key: 'Disabled', value: 'disabled' }
  ] },
];
