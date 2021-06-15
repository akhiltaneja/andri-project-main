import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserBlock as User, ConnectorId } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { injected, bsc, walletconnect } from 'connectors'

const UserBlock: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()

  return (
    <User
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
      active={1}
    />
  )
}

export default UserBlock
