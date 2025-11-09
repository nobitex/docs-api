import React, { useState, useEffect } from 'react'
import CustomSearch from '@site/src/components/CustomSearch'

export default function Root({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Existing search shortcut logic
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
      if (event.key === 'Escape' && isSearchOpen) {
        event.preventDefault()
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchOpen])

  // New useEffect for market/currency/network symbols
  useEffect(() => {
    const templates = [
      {
        id: 'market-symbols',
        value:
          'BTCIRT, ETHIRT, LTCIRT, USDTIRT, XRPIRT, BCHIRT, BNBIRT, EOSIRT, XLMIRT, ETCIRT, TRXIRT, DOGEIRT, UNIIRT, DAIIRT, LINKIRT, DOTIRT, AAVEIRT, ADAIRT, SHIBIRT, FTMIRT, MATICIRT, AXSIRT, MANAIRT, SANDIRT, AVAXIRT, MKRIRT, GMTIRT, USDCIRT, BTCUSDT, ETHUSDT, LTCUSDT, XRPUSDT, BCHUSDT, BNBUSDT, EOSUSDT, XLMUSDT, ETCUSDT, TRXUSDT, PMNUSDT, DOGEUSDT, UNIUSDT, DAIUSDT, LINKUSDT, DOTUSDT, AAVEUSDT, ADAUSDT, SHIBUSDT, FTMUSDT, MATICUSDT, AXSUSDT, MANAUSDT, SANDUSDT, AVAXUSDT, MKRUSDT, GMTUSDT, USDCUSDT, CHZIRT, GRTIRT, CRVIRT, BANDUSDT, COMPUSDT, EGLDIRT, HBARUSDT, GALIRT, HBARIRT, WBTCUSDT, IMXIRT, WBTCIRT, ONEIRT, GLMUSDT, ENSIRT, 1M_BTTIRT, SUSHIIRT, LDOIRT, ATOMUSDT, ZROIRT, STORJIRT, ANTIRT, AEVOUSDT, 100K_FLOKIIRT, RSRUSDT, API3USDT, GLMIRT, XMRIRT, ENSUSDT, OMIRT, RDNTIRT, MAGICUSDT, TIRT, ATOMIRT, NOTIRT, CVXIRT, XTZIRT, FILIRT, UMAIRT, 1B_BABYDOGEIRT, BANDIRT, SSVIRT, DAOIRT, BLURIRT, ONEUSDT, EGALAUSDT, GMXIRT, XTZUSDT, FLOWUSDT, GALUSDT, WIRT, CVCUSDT, NMRUSDT, SKLIRT, SNTIRT, BATUSDT, TRBUSDT, NMRIRT, RDNTUSDT, API3IRT, CVCIRT, WLDIRT, YFIUSDT, SOLIRT, TUSDT, QNTUSDT, IMXUSDT, AEVOIRT, GMXUSDT, ETHFIUSDT, QNTIRT, GRTUSDT, WLDUSDT, FETIRT, AGIXIRT, NOTUSDT, LPTIRT, SLPIRT, MEMEUSDT, SOLUSDT, BALUSDT, DAOUSDT, COMPIRT, MEMEIRT, TONUSDT, BATIRT, SNXIRT, TRBIRT, 1INCHUSDT, OMUSDT, RSRIRT, RNDRIRT, SLPUSDT, SSVUSDT, RNDRUSDT, AGLDIRT, NEARUSDT, WOOUSDT, YFIIRT, MDTIRT, CRVUSDT, MDTUSDT, EGLDUSDT, LRCIRT, LPTUSDT, BICOUSDT, 1M_PEPEIRT, BICOIRT, MAGICIRT, ETHFIIRT, ANTUSDT, 1INCHIRT, APEUSDT, 1M_NFTIRT, ARBIRT, LRCUSDT, WUSDT, BLURUSDT, CELRUSDT, DYDXIRT, CVXUSDT, BALIRT, TONIRT, 100K_FLOKIUSDT, JSTUSDT, ZROUSDT, ARBUSDT, APTIRT, 1M_NFTUSDT, CELRIRT, UMAUSDT, SKLUSDT, ZRXUSDT, AGLDUSDT, ALGOIRT, NEARIRT, APTUSDT, ZRXIRT, SUSHIUSDT, FETUSDT, ALGOUSDT, 1M_PEPEUSDT, MASKIRT, EGALAIRT, FLOWIRT, 1B_BABYDOGEUSDT, MASKUSDT, 1M_BTTUSDT, STORJUSDT, XMRUSDT, OMGIRT, SNTUSDT, APEIRT, FILUSDT, ENJUSDT, OMGUSDT, WOOIRT, CHZUSDT, ENJIRT, DYDXUSDT, AGIXUSDT, JSTIRT, LDOUSDT, SNXUSDT'
      },
      {
        id: 'currency-symbols',
        value:
          'rls, btc, eth, ltc, usdt, xrp, bch, bnb, eos, xlm, etc, trx, pmn, doge, uni, dai, link, dot, aave, ada, shib, ftm, matic, axs, mana, sand, avax, mkr, gmt, atom, uma, w, rsr, wld, 1m_nft, flow, agld, ton, mask, snt, agix, algo, ssv, band, omg, comp, zrx, rdnt, imx, 1inch, mdt, sushi, bico, gmx, zro, bal, dao, gal, not, nmr, xmr, enj, apt, lrc, dydx, grt, near, cvx, 100k_floki, fil, sol, ldo, crv, aevo, qnt, om, woo, storj, ant, 1m_btt, magic, ape, rndr, hbar, lpt, glm, blur, wbtc, meme, ethfi, egala, arb, fet, skl, cvc, snx, jst, ens, trb, chz, xtz, api3, slp, t, bat, 1b_babydoge, celr, yfi, egld, one, 1m_pepe, usdc',
      },
      {
        id: 'network-symbols',
        value:
          'FIAT_MONEY, ETH, BSC, ADA, ALGO, APT, ARB, BCH, BNB, BTC, BTCLN, DOGE, DOT, EOS, ETC, LTC, PMN, TRX, OMNI, ZTRX, XLM, XMR, XRP, ATOM, EGLD, FIL, FLR, FLOW, FTM, MATIC, AVAX, HBAR, NEAR, TON, SOL, XTZ, ONE',
      },
      {
        id: 'tag-required-networks',
        value: 'BNB, EOS, PMN, XLM, XRP',
      },
    ]

    const updateElements = () => {
      templates.forEach((tpl) => {
        document.querySelectorAll(`.${tpl.id}`).forEach((el) => {
          el.textContent = tpl.value
        })
      })
    }

    // Run once after hydration
    setTimeout(updateElements, 300)

    // Also run on Docusaurus route changes (client-side navigation)
    window.addEventListener('docusaurus.routeDidUpdate', updateElements)

    return () => {
      window.removeEventListener('docusaurus.routeDidUpdate', updateElements)
    }
  }, [])

  return (
    <>
      {children}
      <CustomSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}
