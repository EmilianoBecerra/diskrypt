
export function validatePassword(password) {
  const rules = [
    { test: password.length >= 12, msg: "Mínimo 12 caracteres" },
    { test: /[A-Z]/.test(password), msg: "Al menos una mayúscula" },
    { test: /[a-z]/.test(password), msg: "Al menos una minúscula" },
    { test: /[0-9]/.test(password), msg: "Al menos una número" },
    { test: /[^A-Za-z0-9]/.test(password), msg: "Al menos un carácter especial"}
  ];

  const errors = rules.filter(r => !r.test).map(r => r.msg);
  return { valid: errors.length === 0, errors };
}