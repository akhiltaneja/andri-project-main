import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import styled, { ThemeContext } from 'styled-components'
import CardNav from 'components/CardNav'
import PageHeader from 'components/PageHeader'
import AppBody from '../AppBody'
import { isAddress } from '../../utils'
import Report from './Report'

const CheckerArea = styled.div`
  margin: auto;
  width: 100%;
`

const SwapCard = styled.div`
  background: #191b1f;
`

const TokenAddressInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
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

const RugChecker = () => {
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)

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

  // if (check) {
  return (
    <CheckerArea>
      <CardNav />
      <AppBody>
        <SwapCard>
          <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} />
          <CardBody>
            <TokenAddressInput
              type="text"
              id="token-address-input"
              placeholder="Input Token Address"
              value={tokenAddress}
              onChange={handleInput}
            />
            <Button disabled={false} onClick={checkToken} fullWidth>
              Check Now
            </Button>
          </CardBody>
        </SwapCard>
      </AppBody>
      {check && <Report tokenAddress={tokenAddress} />}
    </CheckerArea>
  )
  // }
}

export default RugChecker
