const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password: string): boolean => password.length >= 6;

export { validateEmail, validatePassword };
