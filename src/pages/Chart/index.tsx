import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { isAddress } from '../../utils'
import { Input as NumericalInput } from '../../components/NumericalInput'

const TokenAddressInput = styled.input`
  position: relative;
  display: flex;
  padding: 10px;
  align-items: center;
  width: 85%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`

const StyledDataArea = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  margin: 10px;
`

const StyledTokenInfoArea = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  width: 15%;
  margin-right: 10px;
`

const StyledChartArea = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  width: 60%;
`

const StyledADArea = styled.div`
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  width: 24%;
  padding: 15px;
`

const StyledTradingHistoryArea = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  width: 100%;
  padding: 15px;
`

const StyledSearchBar = styled.div`
  width: 40%;
  display: flex;
  flex-flow: row;
  margin-bottom: 20px;
`
const StyledTokenInfoItem = styled.div`
  padding: 10px 15px;
`

const StyledButton = styled(Button)`
  margin-left: 10px;
  width: 15%;
`

const StyledTitle = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
`

const StyledDetail = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-size: 24px;
  line-height: 30px;
`

const StyledTradingHistoryTitle = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 15px;
`

const StyledChangeDetail = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-size: 24px;
  line-height: 30px;
  color: rgb(27, 200, 112);
`

const StyledTokenLogo = styled(Image)`
  margin-top: 20px;
  margin-bottom: 20px;
`

const StyledTable = styled.table`
  width: 100%;
  color: #fff;
`
const StyledThead = styled.thead`
  padding: 5px;
  border-bottom: 2px solid white;
`

const StyledTH = styled.th`
  padding-bottom: 10px;
  color: #868686;
  font-weight: 200;
  font-size: 18px;
  text-align: left;
`

const StyledTD = styled.td`
  border-bottom: 1px solid #ffffff;
  padding: 10px;
  padding-left: 0px;
`

const StyledBuyItem = styled.tr`
  color: #22d49f;
`

const StyledSellItem = styled.tr`
  color: #ff646d;
`

const Chart = () => {
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)

  useEffect(() => {
    if (document.createEvent) {
      const event = document.createEvent('HTMLEvents') // The custom event that will be created
      event.initEvent('makeChart', true, true)
      window.dispatchEvent(event)
    }
  }, [])

  const handleInput = useCallback((event) => {
    setCheck(false)
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setTokenAddress(checksummedInput || input)
  }, [])

  const checkToken = async () => {
    const api = 'https://rugchecker.windswap.finance/rug/'.concat(tokenAddress)
    try {
      const response = await fetch(api)
      const res = await response.json()
      if (res.error) {
        setCheck(false)
      } else {
        setCheck(true)
      }
    } catch (error) {
      console.error('Unable to fetch data:', error)
      setCheck(false)
    }
  }

  return (
    <>
      <StyledSearchBar>
        <TokenAddressInput
          type="text"
          id="token-address-input"
          placeholder="Input Token Address"
          value={tokenAddress}
          onChange={handleInput}
        />
        <StyledButton disabled={false} onClick={checkToken} fullWidth>
          Search
        </StyledButton>
      </StyledSearchBar>
      <StyledDataArea>
        <StyledTokenInfoArea>
          <StyledTokenLogo src="images/bog.png" width={80} height={80} />
          <StyledTokenInfoItem>
            <StyledTitle>Token</StyledTitle>
            <StyledDetail>BOG</StyledDetail>
          </StyledTokenInfoItem>
          <StyledTokenInfoItem>
            <StyledTitle>Price</StyledTitle>
            <StyledDetail>$1.28267</StyledDetail>
          </StyledTokenInfoItem>
          <StyledTokenInfoItem>
            <StyledTitle>24h Change</StyledTitle>
            <StyledChangeDetail>3.04%</StyledChangeDetail>
          </StyledTokenInfoItem>
          <StyledTokenInfoItem>
            <StyledTitle>24h Volume</StyledTitle>
            <StyledDetail>$452,668</StyledDetail>
          </StyledTokenInfoItem>
          <StyledTokenInfoItem>
            <StyledTitle>Liquidity</StyledTitle>
            <StyledDetail>$6,926,747</StyledDetail>
          </StyledTokenInfoItem>
          <StyledTokenInfoItem>
            <StyledTitle>Marketcap</StyledTitle>
            <StyledDetail>$18,928,786</StyledDetail>
          </StyledTokenInfoItem>
        </StyledTokenInfoArea>
        <StyledChartArea id="tv_chart_container" />
        <StyledADArea>
          <Image src="images/Background.png" width={350} height={580} responsive />
        </StyledADArea>
      </StyledDataArea>
      <StyledTradingHistoryArea>
        <StyledTradingHistoryTitle>Trading History</StyledTradingHistoryTitle>
        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTH>Time</StyledTH>
              <StyledTH>Traded</StyledTH>
              <StyledTH>Token Price</StyledTH>
              <StyledTH>Value</StyledTH>
            </tr>
          </StyledThead>
          <tbody>
            <StyledBuyItem>
              <StyledTD>5m ago</StyledTD>
              <StyledTD>10419.14 BOG</StyledTD>
              <StyledTD>1.260 USD</StyledTD>
              <StyledTD>$13,132.068</StyledTD>
            </StyledBuyItem>
            <StyledSellItem>
              <StyledTD>15m ago</StyledTD>
              <StyledTD>213.12 BOG</StyledTD>
              <StyledTD>0.21 USD</StyledTD>
              <StyledTD>$123.12</StyledTD>
            </StyledSellItem>
            <StyledBuyItem>
              <StyledTD>20m ago</StyledTD>
              <StyledTD>10564.14 BOG</StyledTD>
              <StyledTD>1.390 USD</StyledTD>
              <StyledTD>$14.895.15</StyledTD>
            </StyledBuyItem>
          </tbody>
        </StyledTable>
      </StyledTradingHistoryArea>
    </>
  )
}
export default Chart
