import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Image } from '@pancakeswap-libs/uikit'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import RedirectPathToChartOnly from './Redirect'
import Chart from './Chart'
import Tokens from './Tokens'
import Menu from '../components/Menu'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  min-height: calc(100vh - 152px);
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const TopRightFlex = styled(Flex)`
  position: absolute;
  right: 20px;
  top: 0px;

  ${({ theme }) => theme.mediaQueries.maxsm} {
    bottom: 0px;
    left: 20px;
    top: unset;
`

interface tokenObject {
  name: string
  symbol: string
  address: string
}

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Menu />
        <AppWrapper>
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <BodyWrapper>
                <Popups />
                <Web3ReactManager>
                  <Switch>
                    <Route path="/chart" component={Chart} />
                    <Route path="/tokens/:token" component={Tokens} />
                    <Route component={RedirectPathToChartOnly} />
                  </Switch>
                </Web3ReactManager>
                <Marginer />
              </BodyWrapper>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
