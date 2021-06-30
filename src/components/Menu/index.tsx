/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu as UikitMenu, Button, ConnectorId } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'

import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'
import links from './config'

import App_logo from '../../assets/images/logo.png'
import App_logo_light from '../../assets/images/new_WindLogo_light.webp'
import Mobile_App_logo from '../../assets/images/new_MobileWindLogo.webp'

import BottomWalletButton from 'components/BottomWalletButton'
import ConnectWalletButtonMobileWhiteMode from 'components/ConnectWalletButton/ConnectWalletButtonMobileWhiteMode'
import ConnectWalletButtonMobile from 'components/ConnectWalletButton/ConnectWalletButtonMobile'
import MenuIcon from '@material-ui/icons/Menu'

const Menu: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const pirceData = useGetPriceData()
  const windPriceUSD = pirceData ? Number(pirceData) : undefined
  const [openMenu, setOpenMenu] = useState(false)

  console.log('pooh token price = ', windPriceUSD)

  const profile = {
    profileLink: '',
    noProfileLink: '',
    username: 'Wind',
    image: '/images/wind/Profile.png',
  }

  useEffect(() => {
    console.log('log: ', isDark, pirceData)
    console.log('toggleTheme: ', toggleTheme)
    sessionStorage.setItem('isDark', isDark.toString())
  })

  return (
    <div
    // className="swap-new-menu-container-style"
    >
      {isDark == true && (
        <div className="dark-mode-new-menu-for-all-device-container-style">
          <a href="https://www.tokencharts.io/">
            <img src={App_logo} alt="app logo" className="laptop-app-logo" />
            <img src={Mobile_App_logo} alt="mobile app logo" className="mobile-app-logo" />
          </a>

          <div className="chart-page-mobile-new-design-menu-items-container-style">
            <Link
              to="/"
              className="swap-new-menu-link-style"
              onClick={() => {
                setOpenMenu(false)
              }}
            >
              <span className="chart-page-mobile-new-design-menu-items-style">Home</span>
            </Link>
            <Link
              to="/chart"
              className="swap-new-menu-link-style"
              onClick={() => {
                setOpenMenu(false)
              }}
            >
              <span className="chart-page-mobile-new-design-menu-items-style">Chart</span>
            </Link>
            <Link
              to="/telegram"
              className="swap-new-menu-link-style"
              onClick={() => {
                setOpenMenu(false)
              }}
            >
              <span className="chart-page-mobile-new-design-menu-items-style">Telegram</span>
            </Link>
            <Link
              to="/blog"
              className="swap-new-menu-link-style"
              onClick={() => {
                setOpenMenu(false)
              }}
            >
              <span className="chart-page-mobile-new-design-menu-items-style">Blog</span>
            </Link>
          </div>

          <div className="white-mode-wallet-dark-button-container-style chart-header-center-search-container-style-top-mobile-hidden">
            <ConnectWalletButtonMobile className="dark-mode-header-button-mobile-hide-style" />
          </div>
          <div className="new-chart-mobile-view-design-mobile-layout-show">
            {openMenu === false && (
              <div className="chart-page-fixed-header-new-mobile-version-container-styl-new">
                <a href="https://www.tokencharts.io/">
                  <img src={App_logo} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(true)
                  }}
                  className="chart-page-mobile-new-design-header-menu-icon-button-style-closed"
                >
                  <MenuIcon />
                </button>
              </div>
            )}

            {openMenu === true && (
              <div>
                <div className="chart-page-fixed-header-new-mobile-version-container-styl-new-open-menu-here">
                  <div className="chart-page-mobile-new-design-top-header-logo-container-style">
                    <a href="https://www.tokencharts.io/">
                      <img src={App_logo} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(false)
                      }}
                      className="chart-page-mobile-new-design-header-menu-icon-button-style-opended"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isDark == false && (
        <div className="swap-new-sub-menu-container-style">
          <a href="https://www.tokencharts.io/">
            <img src={App_logo} alt="app logo" className="laptop-app-logo" />
            <img src={Mobile_App_logo} alt="mobile app logo" className="mobile-app-logo" />
          </a>

          <div className="white-mode-wallet-dark-button-container-style chart-header-center-search-container-style-top-mobile-hidden">
            <ConnectWalletButtonMobileWhiteMode />
          </div>
          <div className="new-chart-mobile-view-design-mobile-layout-show">
            {openMenu === false && (
              <div className="chart-page-fixed-header-new-mobile-version-container-styl-new-light-mode">
                <a href="https://www.tokencharts.io/">
                  <img src={App_logo_light} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(true)
                  }}
                  className="chart-page-mobile-new-design-header-menu-icon-button-style-closed-light-mode"
                >
                  <MenuIcon />
                </button>
              </div>
            )}

            {openMenu === true && (
              <div>
                <div className="chart-page-fixed-header-new-mobile-version-container-styl-new-open-menu-here-light-mode">
                  <div className="chart-page-mobile-new-design-top-header-logo-container-style">
                    <a href="https://www.tokencharts.io/">
                      <img src={App_logo_light} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(false)
                      }}
                      className="chart-page-mobile-new-design-header-menu-icon-button-style-opended"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* <div className="swap-fixed-bottom-footer-container">
        <button className="swap-new-connect-wallet-button-style">Connect to a wallet</button>
        <BottomWalletButton />
      </div> */}
    </div>
  )
}

export default Menu
