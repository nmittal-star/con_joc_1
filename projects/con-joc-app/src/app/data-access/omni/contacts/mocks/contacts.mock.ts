import { Contact } from '../contacts.interface';

export const contacts: Contact[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    title: 'Account Manager',
    email: 'alice.johnson@example.com',
    officePhone: '+1-800-555-0101',
    mobilePhone: '+1-555-0201',
    comment: 'Primary contact for billing inquiries.',
    notify: true,
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Martinez',
    title: 'Technical Lead',
    email: 'bob.martinez@example.com',
    officePhone: '+1-800-555-0102',
    mobilePhone: '+1-555-0202',
    comment: 'Handles escalations and SIP trunk issues.',
    notify: false,
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Chen',
    title: 'Finance Director',
    email: 'carol.chen@example.com',
    officePhone: '+1-800-555-0103',
    mobilePhone: '+1-555-0203',
    comment: 'Approves invoices over $10,000.',
    notify: true,
  },
];
