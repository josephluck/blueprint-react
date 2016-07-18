const categories = {
	address: [
		{
			name: 'City prefix',
			value: 'cityPrefix',
			params: []
		},
		{
			name: 'City suffix',
			value: 'citySuffix',
			params: []
		},
		{
			name: 'Country',
			value: 'country',
			params: []
		},
		{
			name: 'Country code',
			value: 'countryCode',
			params: []
		},
		{
			name: 'County',
			value: 'county',
			params: []
		},
		{
			name: 'Latitude',
			value: 'latitude',
			params: []
		},
		{
			name: 'Longitude',
			value: 'longitude',
			params: []
		},
		{
			name: 'Secondary address',
			value: 'secondaryAddress',
			params: []
		},
		{
			name: 'State',
			value: 'state',
			params: []
		},
		{
			name: 'State abbreviation',
			value: 'stateAbbr',
			params: []
		},
		{
			name: 'Street address',
			value: 'streetAddress',
			params: [
				{
					name: 'Use full address',
					param: 'useFullAddress',
					type: 'select',
					options: [
						{
							description: 'Yes',
							value: true
						},
						{
							description: 'No',
							value: false
						}
					]
				}
			]
		},
		{
			name: 'Street name',
			value: 'streetName',
			params: []
		},
		{
			name: 'Street prefix',
			value: 'streetPrefix',
			params: []
		},
		{
			name: 'Street suffix',
			value: 'streetSuffix',
			params: []
		},
		{
			name: 'Zip code',
			value: 'zipCode',
			params: []
		}
	],
	commerce: [
		{
			name: 'Color',
			value: 'color',
			params: []
		},
		{
			name: 'Department',
			value: 'department',
			params: []
		},
		{
			name: 'Price',
			value: 'price',
			params: []
		},
		{
			name: 'Product',
			value: 'product',
			params: []
		},
		{
			name: 'Product adjective',
			value: 'productAdjective',
			params: []
		},
		{
			name: 'Product material',
			value: 'productMaterial',
			params: []
		},
		{
			name: 'Product name',
			value: 'productName',
			params: []
		}
	],
	company: [
		{
			name: 'Bullshit',
			value: 'bs',
			params: []
		},
		{
			name: 'Bullshit adjective',
			value: 'bsAdjective',
			params: []
		},
		{
			name: 'Bullshit buzz',
			value: 'bsBuzz',
			params: []
		},
		{
			name: 'Bullshit noun',
			value: 'bsNoun',
			params: []
		},
		{
			name: 'Catch phrase',
			value: 'catchPrase',
			params: []
		},
		{
			name: 'Catch phrase adjective',
			value: 'catchPraseAdjective',
			params: []
		},
		{
			name: 'Catch phrase descriptor',
			value: 'catchPraseDescriptor',
			params: []
		},
		{
			name: 'Catch phrase noun',
			value: 'catchPraseNoun',
			params: []
		},
		{
			name: 'Company name',
			value: 'companyName',
			params: []
		}
	],
	date: [
		{
			name: 'Between',
			value: 'between',
			params: []
		},
		{
			name: 'Future',
			value: 'future',
			params: []
		},
		{
			name: 'Month',
			value: 'month',
			params: []
		},
		{
			name: 'Past',
			value: 'past',
			params: []
		},
		{
			name: 'Recent',
			value: 'recent',
			params: []
		}
	],
	finance: [
		{
			name: 'Account number',
			value: 'account',
			params: []
		},
		{
			name: 'Account name',
			value: 'accountName',
			params: []
		},
		{
			name: 'Amount',
			value: 'amount',
			params: []
		},
		{
			name: 'Bitcoin address',
			value: 'bitcoinAddress',
			params: []
		},
		{
			name: 'Currency code',
			value: 'currencyCode',
			params: []
		},
		{
			name: 'Currency name',
			value: 'currencyName',
			params: []
		},
		{
			name: 'Currency symbol',
			value: 'currencySymbol',
			params: []
		},
		{
			name: 'Masked number (i.e. account number)',
			value: 'mask',
			params: []
		},
		{
			name: 'Transaction type',
			value: 'transactionType',
			params: []
		}
	],
	hacker: [
		{
			name: 'Abbreviation',
			value: 'abbreviation',
			params: []
		},
		{
			name: 'Adjective',
			value: 'adjective',
			params: []
		},
		{
			name: 'Ingverb',
			value: 'ingverb',
			params: []
		},
		{
			name: 'Noun',
			value: 'noun',
			params: []
		},
		{
			name: 'Phrase',
			value: 'phrase',
			params: []
		},
		{
			name: 'Verb',
			value: 'verb',
			params: []
		}
	],
	image: [
		{
			name: 'Abstract',
			value: 'abstract',
			params: []
		},
		{
			name: 'Animals',
			value: 'animals',
			params: []
		},
		{
			name: 'Avatar',
			value: 'avatar',
			params: []
		},
		{
			name: 'Business',
			value: 'business',
			params: []
		},
		{
			name: 'Cats',
			value: 'cats',
			params: []
		},
		{
			name: 'City',
			value: 'city',
			params: []
		},
		{
			name: 'Fashion',
			value: 'fashion',
			params: []
		},
		{
			name: 'Food',
			value: 'food',
			params: []
		},
		{
			name: 'Image',
			value: 'image',
			params: []
		},
		{
			name: 'Nature',
			value: 'nature',
			params: []
		},
		{
			name: 'Nightlife',
			value: 'nightlife',
			params: []
		},
		{
			name: 'People',
			value: 'people',
			params: []
		},
		{
			name: 'Sports',
			value: 'sports',
			params: []
		},
		{
			name: 'Technics',
			value: 'technics',
			params: []
		},
		{
			name: 'Transport',
			value: 'transport',
			params: []
		}
	],
	internet: [
		{
			name: 'Avatar',
			value: 'avatar',
			params: []
		},
		{
			name: 'Color',
			value: 'color',
			params: []
		},
		{
			name: 'Domain name',
			value: 'domainName',
			params: []
		},
		{
			name: 'Domain word',
			value: 'domainWord',
			params: []
		},
		{
			name: 'Email',
			value: 'email',
			params: []
		},
		{
			name: 'Example email',
			value: 'exampleEmail',
			params: []
		},
		{
			name: 'IP address',
			value: 'ip',
			params: []
		},
		{
			name: 'Mac address',
			value: 'mac',
			params: []
		},
		{
			name: 'Password',
			value: 'password',
			params: []
		},
		{
			name: 'Protocol',
			value: 'protocol',
			params: []
		},
		{
			name: 'Url',
			value: 'url',
			params: []
		},
		{
			name: 'User agent',
			value: 'userAgent',
			params: []
		},
		{
			name: 'Username',
			value: 'userName',
			params: []
		}
	],
	lorem: [
		{
			name: 'Lines',
			value: 'lines',
			params: []
		},
		{
			name: 'Paragraphs',
			value: 'paragraphs',
			params: []
		},
		{
			name: 'Sentence',
			value: 'sentence',
			params: []
		},
		{
			name: 'Sentences',
			value: 'sentences',
			params: []
		},
		{
			name: 'Text',
			value: 'text',
			params: []
		},
		{
			name: 'Word',
			value: 'word',
			params: []
		},
		{
			name: 'Words',
			value: 'words',
			params: []
		}
	],
	name: [
		{
			name: 'First name',
			value: 'firstName',
			params: []
		},
		{
			name: 'Job area',
			value: 'jobArea',
			params: []
		},
		{
			name: 'Job descriptor',
			value: 'jobDescriptor',
			params: []
		},
		{
			name: 'Job title',
			value: 'jobTitle',
			params: []
		},
		{
			name: 'Job type',
			value: 'jobType',
			params: []
		},
		{
			name: 'Last name',
			value: 'lastName',
			params: []
		},
		{
			name: 'Prefix',
			value: 'prefix',
			params: []
		},
		{
			name: 'Suffix',
			value: 'suffix',
			params: []
		},
		{
			name: 'Title',
			value: 'title',
			params: []
		}
	],
	phone: [
		{
			name: 'Phone formats',
			value: 'phoneFormats',
			params: []
		},
		{
			name: 'Phone number',
			value: 'phoneNumber',
			params: []
		}
	],
	random: [
		{
			name: 'Alpha numeric',
			value: 'alphaNumeric',
			params: []
		},
		{
			name: 'Array element',
			value: 'arrayElement',
			params: []
		},
		{
			name: 'Boolean',
			value: 'boolean',
			params: []
		},
		{
			name: 'Image',
			value: 'image',
			params: []
		},
		{
			name: 'Locale',
			value: 'locale',
			params: []
		},
		{
			name: 'Number',
			value: 'number',
			params: []
		},
		{
			name: 'Object element',
			value: 'objectElement',
			params: []
		},
		{
			name: 'UUID',
			value: 'uuid',
			params: []
		}
	],
	system: []
};

export default categories;
