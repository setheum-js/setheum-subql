import {
  getLPCurrenciesFormName,
  isDexShare,
  forceToCurrencyIdName,
  MaybeCurrency
} from "@setheum.js/sdk-core";
import { SystemConsts, Token } from "../types/models";
import { getChainName } from "./system";

let tokenDecimalMap: Map<string, number>;

function getDecimal(token: string) {
  return tokenDecimalMap.get(token) || 10;
}

// get token 
export async function getToken(currency: MaybeCurrency) {
  const tokenName = forceToCurrencyIdName(currency);

  let token = await Token.get(tokenName);

  if (!token) {
    // create token if the token doesn't exits
    token = new Token(tokenName);

    // build the token decimal map
    if (!tokenDecimalMap) {
      const tokens = api.registry.chainTokens;
      const decimals = api.registry.chainDecimals;

      tokenDecimalMap = new Map<string, number>(
        tokens.map((item, index) => [item, decimals[index]])
      );
    }

    let decimal = 10;

    // TODO: handle erc20
    const isDexShareToken = isDexShare(tokenName);

    // trade dex share decimal as token0 decimal
    if (isDexShareToken) {
      const [token0] = getLPCurrenciesFormName(tokenName);
      const decimal0 = getDecimal(token0);

      decimal = decimal0;
    } else {
      decimal = getDecimal(tokenName);
    }

    token.decimal = decimal;
    token.name = tokenName;

    token.price = '0'

    token.issuance = '0'
    token.lockedInDex = '0'
    token.lockedInLoan = '0'
    token.volume = '0'
    token.volumeUSD = '0'
    token.txCount = BigInt(0)

    await token.save();
  }

  return token;
}

export async function initSystemTokens() {
  const tokens = api.registry.chainTokens;

  // ensure that all basic tokens are created
  await Promise.all(tokens.map((symbol) => getToken(symbol)));
}

export async function getNativeToken() {
  const chainName = await getChainName();

  const systemConsts = await SystemConsts.get(chainName);

  const token = await Token.get(systemConsts.nativeTokenId);

  return token;
}

export async function getStakingToken() {
  const chainName = await getChainName();

  const systemConsts = await SystemConsts.get(chainName);

  const token = await Token.get(systemConsts.stakignTokenId);

  return token;
}

export async function getLiquidToken() {
  const chainName = await getChainName();

  const systemConsts = await SystemConsts.get(chainName);

  const token = await Token.get(systemConsts.liquidTokenId);

  return token;
}

export async function getStableToken() {
  const chainName = await getChainName();

  const systemConsts = await SystemConsts.get(chainName);

  const token = await Token.get(systemConsts.stableTokenId);

  return token;
}
