import { FixedPointNumber, MaybeCurrency, forceToCurrencyIdName } from '@setheum.js/sdk-core' 
import { getPool } from '../dex/pool';
import { getToken } from '../tokens';

async function getPriceFromDexPool (tokenA: string, tokenB: string) {
	const pool = await getPool(tokenA, tokenB)

	if (!pool) return FixedPointNumber.ZERO

	const token0 = await getToken(pool.token0Id)
	const token1 = await getToken(pool.token1Id)

	const amount0 = FixedPointNumber.fromInner(pool.token0Amount || '0', token0.decimal)
	const amount1 = FixedPointNumber.fromInner(pool.token1Amount || '0', token1.decimal)

	if (amount0.isZero()) return FixedPointNumber.ZERO

	return pool.token0Id === tokenA ? amount1.div(amount0) : amount0.div(amount1)
}

export async function getSETMPrice () {
	return getPriceFromDexPool('SETM', 'SETUSD')
}

export async function getSERPPrice () {
	return getPriceFromDexPool('SERP', 'SETUSD')
}

export async function getDNARPrice () {
	return getPriceFromDexPool('DNAR', 'SETUSD')
}

// get SETR price as $2
export function getSETRPrice () {
	return new FixedPointNumber(2, 18)
}

// get SETUSD price as $1
export function getSETUSDPrice () {
	return new FixedPointNumber(1, 18)
}

export async function getPrice (name: MaybeCurrency) {
	const _name = forceToCurrencyIdName(name)

	if (_name === 'SETUSD') return getSETUSDPrice()

	if (_name === 'SETR') return getSETRPrice()

	if(_name === 'SETM') return getSETMPrice()

	if (_name === 'SERP') return getSERPPrice()

	if (_name === 'DNAR') return getDNARPrice()

	return getPriceFromDexPool(_name, 'SETUSD')
}
