import { Percent } from '@pancakeswap-libs/sdk-v2'
import React from 'react'
import useTheme from 'hooks/useTheme'
import { ONE_BIPS } from '../../constants'
import { warningSeverity } from '../../utils/prices'
import { ErrorText } from './styleds'

/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  const { isDark, toggleTheme } = useTheme()
  return (<>
    {isDark === true && <ErrorText fontSize="14px" severity={warningSeverity(priceImpact)} style={{ color: "white" }}>
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </ErrorText>}
    {isDark === false && <ErrorText fontSize="14px" severity={warningSeverity(priceImpact)} style={{ color: "#6269b6" }}>
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </ErrorText>}
  </>
  )
}
