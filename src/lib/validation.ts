export const cleanText = (value: string, max = 80) => value.trim().replace(/\s+/g, " ").slice(0, max);

export const digitsOnly = (value: string, max = 10) => value.replace(/\D/g, "").slice(0, max);

export const isTenDigitPhone = (value: string) => /^\d{10}$/.test(value);

export const parsePositiveNumber = (value: string, max = 1000000) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= max ? parsed : null;
};

export const parsePositiveInteger = (value: string, max = 10000) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= max ? parsed : null;
};

export const todayLabel = () =>
  new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date());
