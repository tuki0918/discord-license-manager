import { customAlphabet } from "nanoid";

// generate a key from hexadecimal (0-9, A-F)
const hexAlphabet = "0123456789ABCDEF";

export function generateLicenseKey(): string {
	const nanoid = customAlphabet(hexAlphabet, 8);
	return `${nanoid()}-${nanoid()}-${nanoid()}-${nanoid()}`;
}
