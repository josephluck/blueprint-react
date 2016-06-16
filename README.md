## Introduction

A tool for front-end developers to mock API endpoints easily.

## Features

- Define resources (collection of models)
- Define models (with keys of different types)
- Generate random data for each model depending on configuration
- Access resources over a simple RESTful API
- GET, POST, PUT and DELETE requests are permitted

## Example

Define a `/users` endpoint that has the following resource description:

`type`: collection (makes this an array of models)
`name`: users (makes it available on the `/users` endpoint for GET, POST, PUT, DELETE)
`length`: 2 (number of randomly generated users)

Each user has the following description:

`first_name`: random first name
`last_name`: random last name
`date_of_birth`: random date between 1980 and 1995
`address_line_1`: random number between 1 and 230
`address_line_2`: random street name
`town`: random town name
`county`: random county
`postcode`: random postcode
`deleted`: random boolean

Making a GET request to `/users` returns the following:

```
[
  {
    "first_name": "Maurine",
    "last_name": "Jackson",
    "address_line_1": 10,
    "address_line_2": "Bartoletti Ways",
    "town": "Borders",
    "county": "Arkansas",
    "postcode": "70121-2298",
    "country": "Pitcairn Islands",
    "date_of_birth": "2015-09-01T08:59:30.636Z",
    "deleted": true,
    "id": 1
  },
  {
    "first_name": "Kaley",
    "last_name": "Mittie",
    "address_line_1": 18,
    "address_line_2": "Camren Mount",
    "town": "Borders",
    "county": "Michigan",
    "postcode": "12199-8508",
    "country": "Iran",
    "date_of_birth": "2015-10-07T06:29:02.414Z",
    "deleted": true,
    "id": 2
  }
]
```

