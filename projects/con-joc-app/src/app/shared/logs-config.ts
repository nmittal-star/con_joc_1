export const logFieldsArray = [
	{
		name: 'type',
		label: 'Type',
		type: 'select',
		options: [
			{ key: 'Option 1', value: 'option1' },
			{ key: 'Option 2', value: 'option2' }
		]
	},
	{
		name: 'internal',
		label: 'Internal',
		type: 'select',
		options: [
			{ key: 'Yes', value: 'yes' },
			{ key: 'No', value: 'no' }
		]
	},
	{
		name: 'note',
		label: 'Note',
		type: 'textarea'
	},
	{
		name: 'tickets',
		label: 'Tickets',
		type: 'number'
	}
];

export const logAvailableItems = [
	'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'
];
