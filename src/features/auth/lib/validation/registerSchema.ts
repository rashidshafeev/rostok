import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Имя обязательно к заполнению'),
  phone: z.string()
    .regex(/^\d{10}$/, 'Неверный формат телефона'),
  isPhoneVerified: z.boolean()
    .refine((val) => val === true, 'Номер телефона должен быть подтверждён'),
  password: z.string()
    .min(6, 'Минимальная длина пароля - 6 символов'),
  confirmPassword: z.string(),
  privacyPolicy: z.boolean()
    .refine((val) => val === true, 'Необходимо принять условия'),
  legalRepresentative: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});