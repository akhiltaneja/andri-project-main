/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
// import ConnectWalletChartHeaderPlace from "components/ConnectWalletButton/ConnectWalletChartHeaderPlace";
import MenuIcon from '@material-ui/icons/Menu'
import axios from 'axios'
// import { Config } from 'utils/api_protocals';
// import io from 'socket.io-client'
import Web3 from 'web3'

import App_logo from '../../assets/images/WindLogo.png'
import USDT_icon from '../../assets/images/new/USDT_icon.png'
import windy_icon from '../../assets/images/new/windy_icon.webp'
import BSC_LOGO from '../../assets/images/new/BSC_LOGO.png'

// const socket = io(`http://localhost:3007`)

const BaseUrl = 'https://dex-api.windswap.finance' // "http://localhost:5000"; // "http://168.119.111.227:3007";

interface tokenObject {
  name: string
  symbol: string
  address: string
}

function ChartHeader(props: tokenObject) {
  const { isDark, toggleTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState(false)
  const [searchTokens, setSearchTokens] = useState<tokenObject[]>([])
  const { name, address, symbol } = props
  const tokenName = name
  const tokenAddress = address
  const tokenSymbol = symbol
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const [tokenPriceChange24h, setTokenPriceChange24h] = useState<number>(0)
  const [searchTokenValue, setSearchTokenValue] = useState('')

  useEffect(() => {
    setTokenPrice(0)
    setTokenPriceChange24h(0)
    axios.post(`${BaseUrl}/api/v1/price`, { token: tokenAddress }).then((res) => {
      if (res.data.status === 200) {
        const _tokenAddress = res.data.data.address
        if (_tokenAddress !== tokenAddress) return
        const price = res.data.data.price
        setTokenPrice(price)
      }
    })
    axios.post(`${BaseUrl}/api/v1/get_price_change_24h`, { token: tokenAddress }).then((res) => {
      if (res.data.status === 200) {
        const _tokenAddress = res.data.data.address
        if (_tokenAddress !== tokenAddress) return
        const priceChange = res.data.data.data
        setTokenPriceChange24h(priceChange)
      }
    })
    const timer = window.setInterval(() => {
      axios.post(`${BaseUrl}/api/v1/price`, { token: tokenAddress }).then((res) => {
        if (res.data.status === 200) {
          const _tokenAddress = res.data.data.address
          if (_tokenAddress !== tokenAddress) return
          const price = res.data.data.price
          setTokenPrice(price)
        }
      })
      axios.post(`${BaseUrl}/api/v1/get_price_change_24h`, { token: tokenAddress }).then((res) => {
        if (res.data.status === 200) {
          const _tokenAddress = res.data.data.address
          if (_tokenAddress !== tokenAddress) return
          const priceChange = res.data.data.data
          setTokenPriceChange24h(priceChange)
        }
      })
    }, 60000)
    return () => {
      window.clearInterval(timer)
    }
  }, [tokenAddress])

  function searchToken(token) {
    setSearchTokenValue(token)
    axios.post(`${BaseUrl}/api/v1/search_token`, { index: token }).then((res) => {
      if (res.data.status === 200) {
        const tokenList = res.data.data
        console.log(tokenList)
        setSearchTokens(tokenList)
      } else setSearchTokens([])
    })
  }

  function tokenLogo(_address: string) {
    const checksumAddress = Web3.utils.toChecksumAddress(_address)
    return `images/assets/${checksumAddress}/logo.png`
  }
  const priceChange24hPercent = (tokenPriceChange24h / (tokenPrice - tokenPriceChange24h)) * 100

  function removeImg(event) {
    event.preventDefault()
    event.stopPropagation()
    event.target.src = 'images/binance.png'
  }

  function convertToComma(_input: string) {
    let input = _input
    if (input.length > 9) input = Number.parseFloat(input).toExponential()
    const inputArray = input.split('.')
    const formattedArray = new Array<string>()
    while (true) {
      if (inputArray[0].length > 3) {
        const each = inputArray[0].slice(-3)
        inputArray[0] = inputArray[0].slice(0, -3)
        formattedArray.unshift(`,${each}`)
      } else {
        if (inputArray[0].length) formattedArray.unshift(inputArray[0])
        break
      }
    }
    let formattedInteger = formattedArray.join('')
    if (inputArray.length > 1) formattedInteger = formattedInteger.concat('.', inputArray[1])
    return formattedInteger
  }

  return (
    <>
      <div className="new-chart-mobile-view-design-laptop-layout-show">
        {isDark === true && (
          <div className="chart-page-fixed-header-container-styl-new">
            <div className="pading-some-px-style chart-header-center-search-container-style-top-mobile-hidden">
              <div className="chart-header-center-search-container-style-nng">
                <div className="chart-header-image-drop-down-top-container-style">
                  <div className="chart-header-center-drop-icon-container-style">
                    <img
                      src={tokenLogo(tokenAddress)}
                      alt="logo"
                      className="chart-bottom-image-dropdown-content-desc-image-style"
                      onError={(event) => removeImg(event)}
                    />
                    <div className="chart-bottom-image-dropdown-content-desc">{tokenSymbol}</div>
                    <div className="right-border-1px-white-line-style">&nbsp;</div>
                  </div>
                </div>

                <div className="align-center-just-center-style">
                  <div className="chart-page-token-search-container-style">
                    <input
                      type="text"
                      className="chart-header-search-input-field-style"
                      placeholder="Click here to search the market or paste the address"
                      onChange={(e) => searchToken(e.target.value)}
                      value={searchTokenValue}
                    />
                    {searchTokens.length ? (
                      <div className="chart-page-token-search-result-conreianer-style">
                        {searchTokens.map((tokenItem) => {
                          return (
                            <Link
                              to={`/tokens/${tokenItem.address}`}
                              onClick={() => {
                                sessionStorage.clear()
                                sessionStorage.setItem('search_token_name', tokenItem.name)
                                sessionStorage.setItem('search_token_symbol', tokenItem.symbol)
                                sessionStorage.setItem('search_token', tokenItem.address)
                                setSearchTokens([])
                                setSearchTokenValue('')
                              }}
                            >
                              <div className="chart-page-search-result-token-list-item-container-style">
                                <div className="chart-page-search-result-toekn-logo-name-container-style">
                                  <img
                                    src={tokenLogo(tokenItem.address)}
                                    alt="logo"
                                    className="chart-page-search-token-logo-style"
                                    onError={(event) => removeImg(event)}
                                  />
                                  <span className="token-drop-down-list-token-name-text-style">
                                    {tokenItem.name} ({tokenItem.symbol})
                                  </span>
                                </div>
                                <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <a
                    className="buy-button"
                    href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${tokenAddress}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    BUY
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {isDark === false && (
          <div className="chart-page-fixed-header-container-styl-new-light-mode">
            <div className="pading-some-px-style chart-header-center-search-container-style-top-mobile-hidden">
              <div className="chart-header-center-search-container-style-nng-light-mode">
                <div className="chart-header-image-drop-down-top-container-style">
                  <div className="chart-header-center-drop-icon-container-style">
                    <img
                      src={tokenLogo(tokenAddress)}
                      alt="logo"
                      className="chart-bottom-image-dropdown-content-desc-image-style"
                      onError={(e) => removeImg(e)}
                    />
                    <div className="chart-bottom-image-dropdown-content-desc-light-mode">{tokenSymbol}</div>
                    <div className="right-border-1px-white-line-style-light-mode">&nbsp;</div>
                  </div>
                </div>

                <div className="align-center-just-center-style">
                  <div className="chart-page-token-search-container-style">
                    <input
                      type="text"
                      className="chart-header-search-input-field-style-light-mode"
                      placeholder="Click here to search the market or paste the address"
                      onChange={(e) => searchToken(e.target.value)}
                      value={searchTokenValue}
                    />
                    {searchTokens.length ? (
                      <div className="chart-page-token-search-result-conreianer-style">
                        {searchTokens.map((tokenItem) => {
                          return (
                            <Link
                              to={`/tokens/${tokenItem.address}`}
                              onClick={() => {
                                sessionStorage.clear()
                                sessionStorage.setItem('search_token_name', tokenItem.name)
                                sessionStorage.setItem('search_token_symbol', tokenItem.symbol)
                                sessionStorage.setItem('search_token', tokenItem.address)
                                setSearchTokens([])
                                setSearchTokenValue('')
                              }}
                            >
                              <div className="chart-page-search-result-token-list-item-container-style">
                                <div className="chart-page-search-result-toekn-logo-name-container-style">
                                  <img
                                    src={tokenLogo(tokenItem.address)}
                                    alt="logo"
                                    className="chart-page-search-token-logo-style"
                                    onError={(event) => removeImg(event)}
                                  />
                                  <span className="token-drop-down-list-token-name-text-style">
                                    {tokenItem.name} ({tokenItem.symbol})
                                  </span>
                                </div>
                                <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <a
                  className="buy-button"
                  href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${tokenAddress}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  BUY
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {isDark ? (
        <div className="new-chart-mobile-view-design-mobile-layout-show">
          <div className="align-center-just-center-style" style={{ margin: '10px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <div className="chart-page-token-search-container-style">
              <input
                type="text"
                className="chart-header-search-input-field-style"
                placeholder="Click here to search the market or paste the address"
                onChange={(e) => searchToken(e.target.value)}
                value={searchTokenValue}
              />
              {searchTokens.length ? (
                <div className="chart-page-token-search-result-conreianer-style">
                  {searchTokens.map((tokenItem) => {
                    return (
                      <Link
                        to={`/tokens/${tokenItem.address}`}
                        onClick={() => {
                          sessionStorage.clear()
                          sessionStorage.setItem('search_token_name', tokenItem.name)
                          sessionStorage.setItem('search_token_symbol', tokenItem.symbol)
                          sessionStorage.setItem('search_token', tokenItem.address)
                          setSearchTokens([])
                          setSearchTokenValue('')
                        }}
                      >
                        <div className="chart-page-search-result-token-list-item-container-style">
                          <div className="chart-page-search-result-toekn-logo-name-container-style">
                            <img
                              src={tokenLogo(tokenItem.address)}
                              alt="logo"
                              className="chart-page-search-token-logo-style"
                              onError={(event) => removeImg(event)}
                            />
                            <span className="token-drop-down-list-token-name-text-style">
                              {tokenItem.name} ({tokenItem.symbol})
                            </span>
                          </div>
                          <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="new-chart-mobile-view-design-mobile-layout-show">
          <div className="align-center-just-center-style" style={{ margin: '10px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <div className="chart-page-token-search-container-style">
              <input
                type="text"
                className="chart-header-search-input-field-style"
                placeholder="Click here to search the market or paste the address"
                onChange={(e) => searchToken(e.target.value)}
                value={searchTokenValue}
              />
              {searchTokens.length ? (
                <div className="chart-page-token-search-result-conreianer-style">
                  {searchTokens.map((tokenItem) => {
                    return (
                      <Link
                        to={`/tokens/${tokenItem.address}`}
                        onClick={() => {
                          sessionStorage.clear()
                          sessionStorage.setItem('search_token_name', tokenItem.name)
                          sessionStorage.setItem('search_token_symbol', tokenItem.symbol)
                          sessionStorage.setItem('search_token', tokenItem.address)
                          setSearchTokens([])
                          setSearchTokenValue('')
                        }}
                      >
                        <div className="chart-page-search-result-token-list-item-container-style">
                          <div className="chart-page-search-result-toekn-logo-name-container-style">
                            <img
                              src={tokenLogo(tokenItem.address)}
                              alt="logo"
                              className="chart-page-search-token-logo-style"
                              onError={(event) => removeImg(event)}
                            />
                            <span className="token-drop-down-list-token-name-text-style">
                              {tokenItem.name} ({tokenItem.symbol})
                            </span>
                          </div>
                          <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChartHeader
