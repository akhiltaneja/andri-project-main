import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import axios from 'axios'
import ChartHeader from 'components/Chart/ChartHeader'
import LeftChartContainer from 'components/Chart/LeftChartContainer'
import BottomCenterChartContainer from 'components/Chart/BottomCenterChartContainer'
import BottomCenterChartContainerLightMode from 'components/Chart/BottomCenterChartContainerLightMode'
import Footer from 'components/Footer'

const StyledADArea = styled.div`
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  width: 90%;
  padding: 15px;
`

const StyledADSection = styled(Image)`
  min-height: 530px;
`

const props = {
  name: 'PancakeSwap Token',
  address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  symbol: 'CAKE',
}

const Chart = () => {
  useEffect(() => {
    sessionStorage.clear()
    sessionStorage.setItem('search_token_name', props.name)
    sessionStorage.setItem('search_token_symbol', props.symbol)
    sessionStorage.setItem('search_token', props.address)
  }, [])

  const [pageToggleButton, setPageToggleButton] = useState('Chart')
  const Wrapper = styled.div`
    width: 100%;
  `
  const { isDark, toggleTheme } = useTheme()

  let event // The custom event that will be created
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents')
    if (isDark) {
      event.initEvent('makeChart', true, true)
      event.eventName = 'makeChart'
      window.dispatchEvent(event)
    } else {
      event.initEvent('makeChart_light_mode', true, true)
      event.eventName = 'makeChart_light_mode'
      window.dispatchEvent(event)
    }
  }

  return (
    <>
      {isDark === true && (
        <div className="chart-page-three-colum-top-container-style-new-3">
          <ChartHeader {...props} />
          <Grid container justify="space-between" spacing={3} style={{ marginTop: 5 }}>
            <Grid item lg={3} sm={3} xl={3} xs={12}>
              <LeftChartContainer {...props} />
            </Grid>

            <Grid item lg={7} sm={7} xl={7} xs={12}>
              <Wrapper id="tv_chart_container" />
            </Grid>

            <Grid item lg={2} sm={2} xl={2} xs={12} className="new-chart-mobile-view-design-laptop-layout-show">
              <StyledADArea>
                <StyledADSection src="images/Background.png" width={350} height={530} responsive />
              </StyledADArea>
            </Grid>
          </Grid>
          <BottomCenterChartContainer {...props} />
          <Footer />
        </div>
      )}

      {isDark === false && (
        <div className="chart-page-three-colum-top-container-style-new-3-light-mode">
          <ChartHeader {...props} />
          <Grid container justify="space-between" spacing={3} style={{ marginTop: 5 }}>
            <Grid item lg={3} sm={3} xl={3} xs={12}>
              <LeftChartContainer {...props} />
            </Grid>

            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <Wrapper id="tv_chart_container" />
            </Grid>

            <Grid item lg={3} sm={3} xl={3} xs={12} className="new-chart-mobile-view-design-laptop-layout-show">
              <StyledADArea>
                <StyledADSection src="images/Background.png" width={350} height={530} responsive />
              </StyledADArea>
            </Grid>
          </Grid>
          <BottomCenterChartContainerLightMode {...props} />
          <Footer />
        </div>
      )}
    </>
  )
}
export default Chart
