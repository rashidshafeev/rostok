import React, { useState } from 'react';
import { GxPhoneInput } from './GxPhoneInput';

export const PhoneInputExample: React.FC = () => {
	const [phone, setPhone] = useState('');

	const handlePhoneChange = (value: string) => {
		setPhone(value);
		console.log('Phone number:', value);
	};

	return (
		<div style={{ maxWidth: '400px', margin: '20px auto' }}>
			<h2>Basic Usage</h2>
			<GxPhoneInput
				value={phone}
				onChange={handlePhoneChange}
				placeholder="Enter phone number"
			/>

			<h2 style={{ marginTop: '40px' }}>With Verification</h2>
			<GxPhoneInput
				requiredVerification={true}
				floatingLabel={true}
				placeholder="Phone number with verification"
			/>
		</div>
	);
};