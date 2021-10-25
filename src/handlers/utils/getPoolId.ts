import { MaybeCurrency, Token, forceToCurrencyIdName, createLPCurrencyName } from '@setheum.js/sdk-core'

export function getPoolId (tokenA: MaybeCurrency, tokenB: MaybeCurrency): [string, string, string] {
	const [token0, token1] = Token.sortTokenNames(forceToCurrencyIdName(tokenA), forceToCurrencyIdName(tokenB))

	return [createLPCurrencyName(token0, token1), token0, token1];
}