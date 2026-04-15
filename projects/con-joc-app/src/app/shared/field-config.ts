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

export const miscellaneousFieldsArray = [
  { name: 'showDisclaimerOnAgentApp', labels: 'Show Disclaimer on Agent App', type: 'select', options: [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ]},
  { name: 'disclaimer', labels: 'Disclaimer', type: 'textarea' },
  { name: 'enableSmsTesting', labels: 'Enable SMS Testing (VOIP & Landline)', type: 'select', options: [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ]},
  { name: 'enableIvaReactUi', labels: 'Enable IVA React UI', type: 'select', options: [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ]},
  { name: 'campaignRegistryStagingEnv', labels: 'Switch to Campaign Registry Staging Environment', type: 'select', options: [
    { key: 'ON', value: 'on' },
    { key: 'OFF', value: 'off' },
  ]},
  { name: 'smsInboundRedirect', labels: 'SMS Inbound Redirect', type: 'select', options: [
    { key: "-- Don't redirect --", value: 'none' },
    { key: 'Redirect', value: 'redirect' },
  ]},
  { name: 'enableDedicatedSms', labels: 'Enable Dedicated SMS', type: 'select', options: [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ]},
  { name: 'enableDebounceSms', labels: 'Enable Debounce SMS', type: 'select', options: [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ]},
  { name: 'enableOverlayMatching', labels: 'Enable Overlay Matching', type: 'select', options: [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ]},
  { name: 'monthlyAccountValue', labels: 'Monthly Account Value ($)', type: 'text' },
  { name: 'totalCallRecordingStorage', labels: 'Total Call Recording Storage in TB', type: 'number' },
  { name: 'talkdeskAccountId', labels: 'Talkdesk Account ID', type: 'text' },
  { name: 'didLimitationPerLicense', labels: 'DID Limitation per License', type: 'number' },
];

export const miscellaneousDefaultValues: Record<string, any> = {
  showDisclaimerOnAgentApp: 'no',
  disclaimer: '',
  enableSmsTesting: 'no',
  enableIvaReactUi: 'no',
  campaignRegistryStagingEnv: 'off',
  smsInboundRedirect: 'none',
  enableDedicatedSms: 'no',
  enableDebounceSms: 'yes',
  enableOverlayMatching: 'no',
  monthlyAccountValue: '',
  totalCallRecordingStorage: 0,
  talkdeskAccountId: '',
  didLimitationPerLicense: 100,
};
