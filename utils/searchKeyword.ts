import { normalizeText } from './validators';

export const searchKeyword = (keywords: string[], text: string): boolean => {
    const normalizedText = normalizeText(text);
    return keywords.some(word => normalizedText.includes(normalizeText(word)));
};
