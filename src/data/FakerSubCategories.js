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
			params: [
				{
					name: 'Min value',
					param: 'min',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Max value',
					param: 'max',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Decimal places',
					param: 'dec',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Symbol',
					param: 'symbol',
					type: 'input'
				}
			]
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
			params: [
				{
					name: 'From',
					param: 'from',
					type: 'input',
					inputType: 'date'
				},
				{
					name: 'To',
					param: 'to',
					type: 'input',
					inputType: 'date'
				}
			]
		},
		{
			name: 'Future',
			value: 'future',
			params: [
				{
					name: 'Number of years',
					param: 'years',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'From date',
					param: 'refDate',
					type: 'input',
					inputType: 'date'
				}
			]
		},
		{
			name: 'Month',
			value: 'month',
			params: []
		},
		{
			name: 'Past',
			value: 'past',
			params: [
				{
					name: 'Number of years',
					param: 'years',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'From date',
					param: 'refDate',
					type: 'input',
					inputType: 'date'
				}
			]
		},
		{
			name: 'Recent',
			value: 'recent',
			params: [
				{
					name: 'Number of days',
					param: 'days',
					type: 'input',
					inputType: 'number'
				}
			]
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
			params: [
				{
					name: 'Min value',
					param: 'min',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Max value',
					param: 'max',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Decimal places',
					param: 'dec',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Symbol',
					param: 'symbol',
					type: 'input'
				}
			]
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
			params: [
				{
					name: 'Length of number',
					param: 'min',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Wrap in parenthesis?',
					param: 'parens',
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
				},
				{
					name: 'Include an ellipsis?',
					param: 'ellipsis',
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
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Animals',
			value: 'animals',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Avatar',
			value: 'avatar',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Business',
			value: 'business',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Cats',
			value: 'cats',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'City',
			value: 'city',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Fashion',
			value: 'fashion',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Food',
			value: 'food',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Image',
			value: 'image',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Nature',
			value: 'nature',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Nightlife',
			value: 'nightlife',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'People',
			value: 'people',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Sports',
			value: 'sports',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Technics',
			value: 'technics',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Transport',
			value: 'transport',
			params: [
				{
					name: 'Width',
					param: 'width',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Height',
					param: 'height',
					type: 'input',
					inputType: 'number'
				}
			]
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
			params: [
				{
					name: 'First name',
					param: 'firstName',
					type: 'input'
				},
				{
					name: 'Last',
					param: 'lastName',
					type: 'input'
				},
				{
					name: 'Provider',
					param: 'provider',
					type: 'input'
				}
			]
		},
		{
			name: 'Example email',
			value: 'exampleEmail',
			params: [
				{
					name: 'First name',
					param: 'firstName',
					type: 'input'
				},
				{
					name: 'Last',
					param: 'lastName',
					type: 'input'
				}
			]
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
			params: [
				{
					name: 'Length of password',
					param: 'length',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Memorable password?',
					param: 'memorable',
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
			params: [
				{
					name: 'First name',
					param: 'firstName',
					type: 'input'
				},
				{
					name: 'Last name',
					param: 'lastName',
					type: 'input'
				}
			]
		}
	],
	lorem: [
		{
			name: 'Lines',
			value: 'lines',
			params: [
				{
					name: 'Number of lines',
					param: 'lines',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Paragraphs',
			value: 'paragraphs',
			params: [
				{
					name: 'Number of paragraphs',
					param: 'paragraphsCount',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Sentence',
			value: 'sentence',
			params: [
				{
					name: 'Number of words',
					param: 'wordCount',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Sentences',
			value: 'sentences',
			params: [
				{
					name: 'Number of sentances',
					param: 'sentancesCount',
					type: 'input',
					inputType: 'number'
				},
				{
					name: 'Separator',
					param: 'seperator',
					type: 'input'
				}
			]
		},
		{
			name: 'Text',
			value: 'text',
			params: [
				{
					name: 'Number of times',
					param: 'times',
					type: 'input',
					inputType: 'number'
				}
			]
		},
		{
			name: 'Word',
			value: 'word',
			params: []
		},
		{
			name: 'Words',
			value: 'words',
			params: [
				{
					name: 'Number of words',
					param: 'words',
					type: 'input',
					inputType: 'number'
				}
			]
		}
	],
	name: [
		{
			name: 'First name',
			value: 'firstName',
			params: [
				{
					name: 'Gender',
					param: 'gender',
					type: 'select',
					options: [
						{
							description: 'Either',
							value: ''
						},
						{
							description: 'Male',
							value: 'male'
						},
						{
							description: 'Female',
							value: 'female'
						}
					]
				}
			]
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
			params: [
				{
					name: 'Gender',
					param: 'gender',
					type: 'select',
					options: [
						{
							description: 'Either',
							value: ''
						},
						{
							description: 'Male',
							value: 'male'
						},
						{
							description: 'Female',
							value: 'female'
						}
					]
				}
			]
		},
		{
			name: 'Prefix',
			value: 'prefix',
			params: [
				{
					name: 'Gender',
					param: 'gender',
					type: 'select',
					options: [
						{
							description: 'Either',
							value: ''
						},
						{
							description: 'Male',
							value: 'male'
						},
						{
							description: 'Female',
							value: 'female'
						}
					]
				}
			]
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
			params: [
				{
					name: 'Array',
					param: 'json',
					type: 'editor'
				}
			]
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
			params: [
				{
					name: 'Array',
					param: 'json',
					type: 'editor'
				}
			]
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
