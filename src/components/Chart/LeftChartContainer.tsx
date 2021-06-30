import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import Web3 from 'web3'
import styled from 'styled-components'
import axios from 'axios'
import getCommaNumber from '../../utils/getCommaNumber'

const StyledTokenInfoArea = styled.div`
  text-align: center;
  border-radius: 8px;
  border: 1px solid #353547;
  width: 95%;
  margin-right: 10px;
  margin-left: 20px;
`

const StyledTokenLogo = styled(Image)`
  margin-top: 20px;
  margin-bottom: 20px;
`
const StyledTokenInfoItem = styled.div`
  padding: 10px 15px;
  text-align: left;
`

const StyledTitle = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-size: 22px;
  line-height: 22px;
`

const StyledDetail = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-size: 18px;
  line-height: 30px;
`

const StyledTokenPriceDetail = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  color: yellow;
  font-size: 18px;
  line-height: 30px;
`

const StyledChangeDetail = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-size: 18px;
  line-height: 30px;
  color: rgb(27, 200, 112);
`

interface TokenInfoProps {
  name: string | null
  address: string
  symbol: string | null
}

const TokenInfoContainer = ({ name, address, symbol }: TokenInfoProps) => {
  const token = sessionStorage.getItem('search_token')
  console.log('pooh, token = ', token)
  const tokenAddress = address

  const BaseUrl = 'https://dex-api.windswap.finance'

  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const [tokenPriceText, setTokenPriceText] = useState('N/A')
  const [priceChange24Hours, setPriceChange24Hours] = useState<number>(0)
  const [priceChange24HoursText, setPriceChange24HoursText] = useState('N/A')
  const [priceChange24HoursPercent, setPriceChange24HoursPercent] = useState<number>(0)
  const [priceChange24HoursPercentText, setPriceChange24HoursPercentText] = useState('N/A')
  const [PriceChange7Days, setPriceChange7Days] = useState<number>(0)
  const [PriceChange7DaysText, setPriceChange7DaysText] = useState('N/A')
  const [PriceChange7DaysPercent, setPriceChange7DaysPercent] = useState<number>(0)
  const [PriceChange7DaysPercentText, setPriceChange7DaysPercentText] = useState('N/A')
  const [liquidityV1, setLiquidityV1] = useState<number>(0)
  const [liquidityV1Text, setLiquidityV1Text] = useState('N/A')
  const [liquidityV2, setLiquidityV2] = useState<number>(0)
  const [liquidityV2Text, setLiquidityV2Text] = useState('N/A')
  const [marketCap, setMarketCap] = useState<number>(0)
  const [marketCapText, setMarketCapText] = useState('N/A')

  useEffect(() => {
    console.log('pooh, tokeninfo')
    window.sessionStorage.setItem('stretchText', 'normal')
    // get_token_details
    async function getTokenDetails(_address) {
      function convertNumberToFormattedString(input: number) {
        let formattedNumber = input.toPrecision(8)
        formattedNumber = getCommaNumber(formattedNumber)
        return formattedNumber
      }

      let _current_price
      await axios.post(`${BaseUrl}/api/v1/price`, { token: _address }).then((res) => {
        if (res.data.status === 200) {
          _current_price = res.data.data.data
          setTokenPrice(_current_price)
          setTokenPriceText(`$${convertNumberToFormattedString(_current_price)}`)
        }
      })
      if (!_current_price) return

      axios.post(`${BaseUrl}/api/v1/get_price_change_24h`, { token: _address }).then((res) => {
        if (res.data.status === 200) {
          const _price_change_24h = res.data.data.data
          const _price_change_24h_percent = (_price_change_24h / (_current_price - _price_change_24h)) * 100
          setPriceChange24Hours(_price_change_24h)
          if (_price_change_24h < 0)
            setPriceChange24HoursText(`-$${convertNumberToFormattedString(Math.abs(_price_change_24h))}`)
          else setPriceChange24HoursText(`$${convertNumberToFormattedString(_price_change_24h)}`)
          setPriceChange24HoursPercent(_price_change_24h_percent)
          setPriceChange24HoursPercentText(`${_price_change_24h_percent.toFixed(3)}%`)
        }
      })

      axios.post(`${BaseUrl}/api/v1/get_price_change_week`, { token: _address }).then((res) => {
        if (res.data.status === 200) {
          const _price_change_7d = res.data.data.data
          const _price_change_7d_percent = (_price_change_7d / (_current_price - _price_change_7d)) * 100
          setPriceChange7Days(_price_change_7d)
          if (_price_change_7d < 0)
            setPriceChange7DaysText(`-$${convertNumberToFormattedString(Math.abs(_price_change_7d))}`)
          else setPriceChange7DaysText(`$${convertNumberToFormattedString(_price_change_7d)}`)
          setPriceChange7DaysPercent(_price_change_7d_percent)
          if (_price_change_7d_percent) setPriceChange7DaysPercentText(`${_price_change_7d_percent.toFixed(3)}%`)
        }
      })

      axios.post(`${BaseUrl}/api/v1/liquidity_v1`, { token: _address }).then((res) => {
        if (res.data.status === 200) {
          const _liquidity_price_v1 = res.data.data.price
          setLiquidityV1(_liquidity_price_v1)
          if (_liquidity_price_v1) setLiquidityV1Text(`$${convertNumberToFormattedString(_liquidity_price_v1)}`)
        }
      })

      axios.post(`${BaseUrl}/api/v1/liquidity_v2`, { token: _address }).then((res) => {
        if (res.data.status === 200) {
          const _liquidity_price_v2 = res.data.data.price
          setLiquidityV2(_liquidity_price_v2)
          if (_liquidity_price_v2) setLiquidityV2Text(`$${convertNumberToFormattedString(_liquidity_price_v2)}`)
        }
      })

      axios.post(`${BaseUrl}/api/v1/circulating_supply`, { token: _address }).then((res) => {
        if (res.data.status === 200) {
          const _circulating_supply = res.data.data
          const _marketcap = _circulating_supply * _current_price
          setMarketCap(_marketcap)
          setMarketCapText(`$${getCommaNumber(Math.round(_marketcap).toString())}`)
        }
      })
    }
    getTokenDetails(tokenAddress)
  }, [tokenAddress])

  console.log('pooh, price = ', tokenPrice)

  console.log('pooh token logo = ', tokenLogo)

  function tokenLogo(_address: string) {
    const checksumAddress = Web3.utils.toChecksumAddress(_address)
    return `images/assets/${checksumAddress}/logo.png`
  }

  function removeImg(event) {
    event.preventDefault()
    event.stopPropagation()
    event.target.src = 'images/binance.png'
  }

  return (
    <StyledTokenInfoArea>
      <img
        src={tokenLogo(tokenAddress)}
        alt="logo"
        className="token-info-image"
        onError={(event) => removeImg(event)}
      />
      <StyledTokenInfoItem>
        <StyledTitle>Token</StyledTitle>
        <StyledDetail>{symbol}</StyledDetail>
      </StyledTokenInfoItem>
      <StyledTokenInfoItem>
        <StyledTitle>Price</StyledTitle>
        <StyledTokenPriceDetail>{tokenPriceText}</StyledTokenPriceDetail>
      </StyledTokenInfoItem>
      <StyledTokenInfoItem>
        <StyledTitle>24h Change (%)</StyledTitle>
        <StyledChangeDetail>{priceChange24HoursPercentText}</StyledChangeDetail>
      </StyledTokenInfoItem>
      <StyledTokenInfoItem>
        <StyledTitle>24h Price Change ($)</StyledTitle>
        <StyledDetail>{priceChange24HoursText}</StyledDetail>
      </StyledTokenInfoItem>
      <StyledTokenInfoItem>
        <StyledTitle>Liquidity</StyledTitle>
        <StyledDetail>{liquidityV2Text}</StyledDetail>
      </StyledTokenInfoItem>
      <StyledTokenInfoItem>
        <StyledTitle>Marketcap</StyledTitle>
        <StyledDetail>{marketCapText}</StyledDetail>
      </StyledTokenInfoItem>
    </StyledTokenInfoArea>
  )
}

export default TokenInfoContainer
