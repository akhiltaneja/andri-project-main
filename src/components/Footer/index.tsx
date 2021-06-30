import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { TelegramIcon, TwitterIcon, RedditIcon } from 'components/Svg'

const SytledFooter = styled.div`
  height: 60px;
  padding: 10px;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
`

const SytledSocialItems = styled.div`
  margin-right: 40px;
`

const SytledOtherDescription = styled.div`
  margin-right: 40px;
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
`

const Footer: React.FC = (props) => {
  return (
    <SytledFooter>
      <SytledSocialItems>
        <TelegramIcon />
        <TwitterIcon />
        <RedditIcon />
      </SytledSocialItems>
      <SytledOtherDescription>Copyright &copy; 2021 tokencharts.io | Version Beta 00033</SytledOtherDescription>
    </SytledFooter>
  )
}

export default Footer
