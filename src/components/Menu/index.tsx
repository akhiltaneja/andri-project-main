import React, { useContext } from 'react'
import { Menu as UikitMenu, ConnectorId } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'
import links from './config'

const Menu: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const pirceData = useGetPriceData()
  const windPriceUSD = pirceData ? Number(pirceData) : undefined

  console.log('pooh token price = ', windPriceUSD)

  const profile = {
    profileLink: '',
    noProfileLink: '',
    username: 'Wind',
    image: '/images/wind/Profile.png',
  }

  return (
    <UikitMenu
      links={links}
      priceLink="https://app.windswap.finance/#/swap?inputCurrency=0xd1587ee50e0333f0c4adcf261379a61b1486c5d2"
      account={account as string}
      login={(connectorId: ConnectorId) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={windPriceUSD}
      active={1}
      {...props}
    />
  )
}

export default Menu
