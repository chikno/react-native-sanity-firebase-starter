import { getItem, removeItem, setItem } from '@/core/storage';
const TOKEN = 'user';

export type TokenType = any;

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
