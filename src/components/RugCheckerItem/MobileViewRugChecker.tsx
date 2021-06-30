import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Grid } from '@material-ui/core';
import useTheme from 'hooks/useTheme'
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import styled, { ThemeContext } from 'styled-components'
import CardNav from 'components/CardNav'
import RugCheckerItem from 'components/RugCheckerItem'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import PageHeader from 'components/PageHeader'
import LanguageIcon from '@material-ui/icons/Language';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import FaceIcon from '@material-ui/icons/Face';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SmsIcon from '@material-ui/icons/Sms';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import BookIcon from '@material-ui/icons/Book';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import config from './config'

const CheckerArea = styled.div`
  margin: auto;
  width: 100%;
`

const SwapCard = styled.div`
  background: #191b1f;
`

const Card = styled.div`
  width: 100%;
  border: 1px solid #2a2d3c;
  margin-bottom: 10px;
`

const CardHeader = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #2a2d3c;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: Poppins;
`

const CardContent = styled.div`
  width: 100%;
  padding: 15px;
`

interface ReportProps {
    tokenAddress: string
}

interface RugInfo {
    token_score: number
    social_score: number
    critical_count: number
    warning_count: number
    social_count: number
    messages: {
        critical: never[]
        warning: {
            message: string
            tooltip: string
        }[]
    }
    holders_distribution: {
        top10_percentage: number
        top10_contracts: number
        top50_percentage: number
        top50_contracts: number
        top100_percentage: number
        top100_contracts: number
    }
    tokenName: string
    symbol: string
    decimals: string
    price: string
    blueCheckmark: string
    description: string
    // socials: {
    //     website: string
    //     email: string
    //     blog: string
    //     reddit: string
    //     slack: string
    //     facebook: string
    //     twitter: string
    //     bitcointalk: string
    //     github: string
    //     telegram: string
    //     wechat: string
    //     linkedin: string
    //     discord: string
    //     whitepaper: string
    // }
    ownership_renounced: boolean
    mintable: boolean
    lp_balance_v1: number
    lp_balance_v2: number
}

const MobileViewRugChecker = ({ tokenAddress }: ReportProps) => {
    const [rug, setRug] = useState<RugInfo>(config)
    const { isDark, toggleTheme } = useTheme()
    const [ holders, setHolders ] = useState("0")

    const percentage = 78;

    useEffect(() => {
        async function getHolders() {
            const totalHolderApi = `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${tokenAddress}&page=1&offset=1000&apikey=DDHBRYBMZ6JYWBYBMSZB44CNJUHM5S79IK`;

            const holderResponse = await fetch(totalHolderApi);
            const holderRes = await holderResponse.json();
            if(holderRes.result.length > 0) setHolders(holderRes.result.length.toString());
            // else setHolders(holderRes.result.length.toString());
        }
        const checkToken = async () => {
            const api = 'https://rugchecker.windswap.finance/rug/'.concat(tokenAddress)

            console.log('pooh, token address = ', api)

            try {
                const response = await fetch(api)
                const res = await response.json()

                setRug(res)

                getHolders();

                console.log('pooh, data = ', res)
            } catch (error) {
                console.error('Unable to fetch data:', error)
            }
        }
        checkToken()
    }, [tokenAddress])

    const title = 'Report - $'.concat(rug.symbol)

    return (<div>

        <div className="rug-page-new-mobile-layout-scores-card-style">
            <p className="rug-page-circle-socres-title-text-style">Scores</p>
            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 5 }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.token_score}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#0b5bd4`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.token_score}</p>
                                <div >
                                    <p>Token Score</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.critical_count + 1}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#abff00`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.critical_count}</p>
                                <div >
                                    <p>Cirtical Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.warning_count + 1}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#6096ff`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.warning_count}</p>
                                <div >
                                    <p>Warning Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Token Score</span>
                                <span className="font-size-13px">{rug.token_score}</span>
                            </div>
                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Critical Count</span>
                                <span className="font-size-13px">{rug.critical_count}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Warning Count</span>
                                <span className="font-size-13px">{rug.warning_count}</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>

        <div className="rug-new-mobile-layout-holder-style">
            <p className="rug-page-circle-socres-title-text-style">Holders Distribution</p>
            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 20, justifyContent: "start" }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 10 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top10_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 50 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top50_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 100 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top100_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 10 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top10_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 50 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top50_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 100 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top100_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Token Name</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.tokenName}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Symbol</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.symbol}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Price ($)</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.price}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Decimals</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.decimals}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Lp Balance V1</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.lp_balance_v1}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Lp Balance V2</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.lp_balance_v2}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Mintable</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.mintable ? rug.mintable : "false"}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Blue Checkmark</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.blueCheckmark}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Ownership Renounced</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.ownership_renounced ? rug.ownership_renounced : "false"}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Disclamier</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.token_score}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Holders</span>
                            <span className="rug-page-holder-card-below-value-text-style">{holders}</span>
                        </div>
                    </Grid>

                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Description</span>
                            <span className="rug-page-holder-place-descirtion-text-style-here">{rug.description}</span>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        <div className="rug-new-mobile-layout-holder-style">
            <div className="rug-page-right-bottom-card-container-style">
                <p className="rug-page-circle-socres-title-text-style">Messages</p>
                <textarea className="rug-checker-page-right-colum-message-card-container-style" placeholder="Ownership not renounced." />
            </div>
        </div>

    </div>)
}

export default MobileViewRugChecker
