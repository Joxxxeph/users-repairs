import z from 'zod'
import { extractValidationData } from '../../common/utils/extract-error-data.js'

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),

  email: z.string().email({ message: 'Invalid email' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),

  role: z.enum([ 'client', 'employee']),

});

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export function validateUser(data) {
  const result = registerSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

export function validatePartialUser(data) {
  const result = registerSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

export function validateLogin(data) {
  const result = loginSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

