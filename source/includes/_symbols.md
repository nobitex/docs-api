<template id="market-symbols">
BTCIRT، ETHIRT، LTCIRT، XRPIRT، BCHIRT، BNBIRT، EOSIRT، XLMIRT، ETCIRT، TRXIRT، DOGEIRT، UNIIRT، DAIIRT، LINKIRT، DOTIRT، AAVEIRT، ADAIRT، SHIBIRT، USDTIRT، BTCUSDT، ETHUSDT، LTCUSDT، XRPUSDT، BCHUSDT، BNBUSDT، EOSUSDT، XLMUSDT، ETCUSDT، TRXUSDT، PMNUSDT، DOGEUSDT، UNIUSDT، DAIUSDT، LINKUSDT، DOTUSDT، AAVEUSDT، ADAUSDT، SHIBUSDT
</template>

<template id="currency-symbols">
rls, btc, eth, ltc, usdt, xrp, bch, bnb, eos, xlm, etc, trx, pmn, doge, uni, dai, link, dot, aave, ada, shib
</template>


<script>
const templates = document.getElementsByTagName('template');
for (i = 0; i < templates.length; i++) {
  const uses = document.getElementsByClassName(templates[i].id);
  for (j = 0; j < uses.length; j++) {
    uses[j].innerHTML = templates[i].innerHTML;
  }
}
</script>
