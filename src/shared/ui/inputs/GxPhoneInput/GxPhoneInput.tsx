import React, { useEffect, useRef, useState } from 'react';
import IMask from 'imask';
import './GxPhoneInput.css';

interface Country {
	iso: string;
	code: string;
	ru: string;
	icon: string;
	mask: {
		international: string;
		local: string;
	};
}

interface PhoneType {
	name: string;
	ru: string;
	icon: {
		small: string;
	};
}

interface PhoneInfo {
	base: string;
	formatted: {
		international: string;
		local: string;
	};
	type: PhoneType;
}

interface PhoneResponse {
	success: boolean;
	phone: PhoneInfo;
	country: Country;
	mask: {
		international: string;
		local: string;
	};
	isVerified?: boolean;
	err?: string;
}

interface GxPhoneInputProps {
	value?: string;
	onChange?: (value: string) => void;
	format?: 'international' | 'local';
	apiUrl?: string;
	floatingLabel?: boolean;
	requiredVerification?: boolean;
	placeholder?: string;
	className?: string;
}

export const GxPhoneInput: React.FC<GxPhoneInputProps> = ({
	value,
	onChange,
	format = 'international',
	apiUrl = 'https://phone.gexarus.com/api',
	floatingLabel = false,
	requiredVerification = false,
	placeholder = 'Введите номер телефона',
	className,
}) => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [defaultCountry, setDefaultCountry] = useState<Country | null>(null);
	const [currentIso, setCurrentIso] = useState<string>('');
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [phoneType, setPhoneType] = useState<PhoneType | null>(null);
	const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'success'>('none');
	const [verificationError, setVerificationError] = useState<string>('');
	const [verificationCode, setVerificationCode] = useState<string[]>(['','','','']);
	const [sessionKey, setSessionKey] = useState<string>('');
	const [isFocused, setIsFocused] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const maskRef = useRef<IMask.InputMask<any>>();
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadIMask = async () => {
			if (typeof IMask === 'undefined') {
				await import('imask');
			}
		};
		
		loadIMask();
		fetchCountries();
		loadDependencies();
		
		return () => {
			if (maskRef.current) {
				maskRef.current.destroy();
			}
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsSelectOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (verificationCode.join('').length === 4) {
			validateCode();
		}
	}, [verificationCode]);

	const loadDependencies = async () => {
		const styleUrl = '//phone.gexarus.com/cdn/style.css?v=0.004';
		if (!document.querySelector(`link[href="${styleUrl}"]`)) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = styleUrl;
			document.head.appendChild(link);
		}
	};

	const fetchCountries = async () => {
		try {
			const response = await fetch(`${apiUrl}/Country/list`);
			const data = await response.json();
			if (data.success) {
				setCountries(data.countries);
				setDefaultCountry(data.default);
				if (!currentIso) {
					setCurrentIso(data.default.iso);
					applyMask(data.default.mask[format]);
				}
			}
		} catch (error) {
			console.error('Error fetching countries:', error);
		}
	};

	const applyMask = (formatTemplate: string) => {
		if (maskRef.current) {
			maskRef.current.destroy();
		}
		if (inputRef.current) {
			const maskPattern = formatTemplate.replace(/X/g, '0');
			maskRef.current = IMask(inputRef.current, { mask: maskPattern });
		}
	};

	const handlePhoneChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const phoneNumber = e.target.value;
		if (phoneNumber.replace(/\D/g, '').length >= 6) {
			try {
				const response = await fetch(`${apiUrl}/Number/info`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						phone: phoneNumber,
						country: currentIso,
						verification: requiredVerification ? 1 : 0,
					}),
				});
				const data = await response.json();
				if (data.success) {
					updatePhoneInfo(data);
				}
			} catch (error) {
				console.error('Error processing phone:', error);
			}
		}
		onChange?.(phoneNumber);
	};

	const updatePhoneInfo = (data: any) => {
		const { phone, country, type } = data;
		setPhoneType(type);
		setCurrentIso(country.iso);
		
		if (requiredVerification && type?.name === 'mobile') {
			setVerificationStatus('pending');
			startVerification(phone.base);
		}
	};

	const startVerification = async (phone: string) => {
		try {
			const response = await fetch(`${apiUrl}/Verification/start`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ phone, country: currentIso }),
			});
			const data = await response.json();
			if (data.success) {
				setSessionKey(data.gxVerificationSessionKey);
			} else {
				setVerificationError(data.err || 'Verification error');
			}
		} catch (error) {
			setVerificationError('Verification error');
		}
	};

	const validateCode = async () => {
		const code = verificationCode.join('');
		if (code.length === 4) {
			try {
				const response = await fetch(`${apiUrl}/Verification/code`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ code, sessionKey }),
				});
				const data = await response.json();
				if (data.success) {
					setVerificationStatus('success');
				} else {
					setVerificationError(data.err || 'Invalid code');
					setVerificationCode(['','','','']);
				}
			} catch (error) {
				setVerificationError('Verification error');
			}
		}
	};

	return (
		<div 
		  ref={wrapperRef} 
		  className={`gx-phone-input ${floatingLabel ? 'floating-label' : ''} ${isFocused ? 'focused' : ''} ${className || ''}`}
		>
		  {floatingLabel && (
			<label className={`gx-floating-label ${value ? 'filled' : ''}`}>
			  {placeholder}
			</label>
		  )}
		  <div className="gx-country-selector" onClick={() => setIsSelectOpen(!isSelectOpen)}>
			{defaultCountry && (
			  <>
				<img src={defaultCountry.icon} alt={defaultCountry.ru} />
				<span>+{defaultCountry.code}</span>
			  </>
			)}
		  </div>
		  
		  <input
			ref={inputRef}
			type="tel"
			value={value}
			onChange={handlePhoneChange}
			placeholder={floatingLabel ? '' : placeholder}
			className="gx-phone-input-field"
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		  />

			{isSelectOpen && (
				<div className="gx-countries-select">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Поиск страны..."
					/>
					<ul className="gx-select-list">
						{countries
							.filter(country => 
								country.ru.toLowerCase().includes(searchTerm.toLowerCase())
							)
							.map(country => (
								<li
									key={country.iso}
									onClick={() => {
										setCurrentIso(country.iso);
										setIsSelectOpen(false);
										applyMask(country.mask[format]);
									}}
								>
									<img src={country.icon} alt={country.ru} />
									<span>{country.ru} (+{country.code})</span>
								</li>
							))
						}
					</ul>
				</div>
			)}

			{requiredVerification && verificationStatus === 'pending' && (
				<div className="gx-verification-container">
					<div className="gx-code-input-container">
						{verificationCode.map((digit, index) => (
							<input
								key={index}
								type="tel"
								maxLength={1}
								value={digit}
								onChange={(e) => {
									const newCode = [...verificationCode];
									newCode[index] = e.target.value;
									setVerificationCode(newCode);
									if (e.target.value && index < 3) {
										const nextInput = document.querySelector(`input[name=code-${index + 1}]`);
										if (nextInput) {
											(nextInput as HTMLInputElement).focus();
										}
									}
								}}
								name={`code-${index}`}
							/>
						))}
					</div>
					{verificationError && <div className="gx-verification-error">{verificationError}</div>}
				</div>
			)}
		</div>
	);
};