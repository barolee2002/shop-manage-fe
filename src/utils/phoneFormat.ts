export const formatPhoneNumber = (phone: string): string => {
  const cleaned = ('' + phone).replace(/\D/g, ''); // Remove all non-digit characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Match the cleaned number
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`; // Format as 000-000-0000
  }
  return phone; // Return original phone if it doesn't match the pattern
};
