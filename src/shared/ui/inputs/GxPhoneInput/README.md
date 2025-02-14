# GxPhoneInput Component

A React component for phone number input with country selection, formatting, and optional verification.

## Features

- Country selection with search
- Phone number formatting based on country
- Optional phone number verification
- Floating label support
- Customizable styling

## Installation

The component requires `imask` as a dependency:

```bash
npm install imask @types/imask
```

## Usage

Basic usage:

```tsx
import { GxPhoneInput } from './GxPhoneInput';

function MyForm() {
	const handlePhoneChange = (value: string) => {
		console.log('Phone number:', value);
	};

	return (
		<GxPhoneInput
			onChange={handlePhoneChange}
			placeholder="Enter phone number"
		/>
	);
}
```

With verification:

```tsx
<GxPhoneInput
	requiredVerification={true}
	onChange={handlePhoneChange}
	floatingLabel={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | undefined | Controlled input value |
| onChange | (value: string) => void | undefined | Change handler |
| format | 'international' \| 'local' | 'international' | Phone number format |
| apiUrl | string | 'https://phone.gexarus.com/api' | API endpoint for phone validation |
| floatingLabel | boolean | false | Enable floating label |
| requiredVerification | boolean | false | Enable phone verification |
| placeholder | string | 'Введите номер телефона' | Input placeholder |
| className | string | undefined | Additional CSS classes |

## Styling

The component uses the following CSS classes that can be customized:

- `gx-phone-input`: Main container
- `gx-country-selector`: Country selection button
- `gx-phone-input-field`: Phone number input
- `gx-countries-select`: Country dropdown
- `gx-select-list`: Country list
- `gx-verification-container`: Verification UI container
- `gx-code-input-container`: Verification code inputs
- `gx-verification-error`: Error message

## API Integration

The component integrates with the following API endpoints:

- `GET /Country/list`: Fetches country list
- `POST /Number/info`: Validates phone number
- `POST /Verification/start`: Starts verification process
- `POST /Verification/code`: Validates verification code