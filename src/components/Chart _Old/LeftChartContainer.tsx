import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import LeftChartItemGraph from "./LeftChartItemGraph";

const LeftChartContainer = (props) => {

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504");

  const [PriceChange24Hours, setPriceChange24Hours] = useState<number>(-0.1808)
  const [PriceChange24HoursText, setPriceChange24HoursText] = useState("$ -0.1808");

  const [PriceChange7Days, setPriceChange7Days] = useState<number>(2.491)
  const [PriceChange7DaysText, setPriceChange7DaysText] = useState("$ 2.491");

  const [Price24HoursLow, setPrice24HoursLow] = useState<number>(0.238)
  const [Price24HoursLowText, setPrice24HoursLowText] = useState("$ 0.238");

  const [Price24HoursHigh, setPrice24HoursHigh] = useState<number>(0.4293)
  const [Price24HoursHighText, setPrice24HoursHighText] = useState("$ 0.4293");

  const [Price7DaysLow, setPrice7DaysLow] = useState<number>(0.386053)
  const [Price7DaysLowText, setPrice7DaysLowText] = useState("$ 0.386053");

  const [Price7DaysHigh, setPrice7DaysHigh] = useState<number>(0.506566)
  const [Price7DaysHighText, setPrice7DaysHighText] = useState("$ 0.506566");

  const [PriceAllTimeLow, setPriceAllTimeLow] = useState<number>(0.220763)
  const [PriceAllTimeLowText, setPriceAllTimeLowText] = useState("$ 0.220763");

  const [PriceAllTimeHigh, setPriceAllTimeHigh] = useState<number>(0.883226)
  const [PriceAllTimeHighText, setPriceAllTimeHighText] = useState("$ 0.883226");

  const [PriceCirculatingSupply, setPriceCirculatingSupply] = useState<number>(0)
  const [PriceCirculatingSupplyText, setPriceCirculatingSupplyText] = useState("N/A");

  const [PriceMaxSupplyWindy, setPriceMaxSupplyWindy] = useState<number>(250000000)
  const [PriceMaxSupplyWindyText, setPriceMaxSupplyWindyText] = useState("25,000,000");

  const [PriceTotalSupply, setPriceTotalSupply] = useState<number>(18545542)
  const [PriceTotalSupplyText, setPriceTotalSupplyText] = useState("18,545,542");

  const [PriceMarketCap, setPriceMarketCap] = useState<number>(4906288)
  const [PriceMarketCapText, setPriceMarketCapText] = useState("$ 4,906,288");

  const [PriceMarketRank, setPriceMarketRank] = useState<number>(3283)
  const [PriceMarketRankText, setPriceMarketRankText] = useState("#3283");

  const [PriceMarketDominance, setPriceMarketDominance] = useState<number>(0)
  const [PriceMarketDominanceText, setPriceMarketDominanceText] = useState("N/A");

  return (<div>
    <div className="price-text-field-container-style-new">
      <TextField id="chart-windswap-price-standard-text" label="WindSwap Price" value={WindSwapPriceText} onChange={(e) => {
        setWindSwapPrice(parseFloat(e.target.value))
        if (e.target.value.indexOf('$') < 0) {
          console.log("yes")
          setWindSwapPriceText(`$ ${e.target.value}`);
        } else {
          console.log("no")
          setWindSwapPriceText(e.target.value);
        }
      }} />
    </div>

    <div>
      <Grid container
        justify="space-between"
        spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-24h-standard-text" label="Price Change(24h)" value={PriceChange24HoursText} onChange={(e) => {
              setPriceChange24Hours(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPriceChange24HoursText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPriceChange24HoursText(e.target.value);
              }
            }} />

            <div className="chart-price-change-24h-standard-text-under-small-description-container-style">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
              <span className="chart-price-change-24h-standard-text-under-small-description">40.86%</span>
            </div>

          </div>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-7d-standard-text" label="Price Change(7d)" value={PriceChange7DaysText} onChange={(e) => {
              setPriceChange7Days(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPriceChange7DaysText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPriceChange7DaysText(e.target.value);
              }
            }} />

            <div className="chart-price-change-24h-standard-text-under-small-description-container-style">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              <span className="chart-price-change-7d-standard-text-under-small-description">14.86%</span>
            </div>

          </div>
        </Grid>
      </Grid>
    </div>

    <LeftChartItemGraph />

    <div>
      <Grid container
        justify="space-between"
        spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="24h Low" value={Price24HoursLowText} onChange={(e) => {
              setPrice24HoursLow(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPrice24HoursLowText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPrice24HoursLowText(e.target.value);
              }
            }} />
          </div>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="24h High" value={Price24HoursHighText} onChange={(e) => {
              setPrice24HoursHigh(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPrice24HoursHighText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPrice24HoursHighText(e.target.value);
              }
            }} />
          </div>
        </Grid>
      </Grid>
    </div>

    <div>
      <Grid container
        justify="space-between"
        spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="7d Low" value={Price7DaysLowText} onChange={(e) => {
              setPrice7DaysLow(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPrice7DaysLowText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPrice7DaysLowText(e.target.value);
              }
            }} />
          </div>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="7d High" value={Price7DaysHighText} onChange={(e) => {
              setPrice7DaysHigh(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPrice7DaysHighText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPrice7DaysHighText(e.target.value);
              }
            }} />
          </div>
        </Grid>
      </Grid>
    </div>

    <div>
      <Grid container
        justify="space-between"
        spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="All-Time Low" value={PriceAllTimeLowText} onChange={(e) => {
              setPriceAllTimeLow(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPriceAllTimeLowText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPriceAllTimeLowText(e.target.value);
              }
            }} />
          </div>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="All-Time High" value={PriceAllTimeHighText} onChange={(e) => {
              setPriceAllTimeHigh(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPriceAllTimeHighText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPriceAllTimeHighText(e.target.value);
              }
            }} />
          </div>
        </Grid>
      </Grid>
    </div>

    <div>
      <Grid container
        justify="space-between"
        spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="Circulating Supply" value={PriceCirculatingSupply} onChange={(e) => {
              setPriceCirculatingSupply(parseFloat(e.target.value))
              // if (e.target.value.indexOf('$') < 0) {
              //   console.log("yes")
              //   setPriceCirculatingSupplyText(`$ ${e.target.value}`);
              // } else {
              //   console.log("no")
              //   setPriceCirculatingSupplyText(e.target.value);
              // }
            }} />
          </div>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="Max Supply(WINDY)" value={PriceMaxSupplyWindy} onChange={(e) => {
              setPriceMaxSupplyWindy(parseFloat(e.target.value))
              // if (e.target.value.indexOf('$') < 0) {
              //   console.log("yes")
              //   setPriceMaxSupplyWindyText(`$ ${e.target.value}`);
              // } else {
              //   console.log("no")
              //   setPriceMaxSupplyWindyText(e.target.value);
              // }
            }} />
          </div>
        </Grid>
      </Grid>
    </div>

    <div>
      <Grid container
        justify="space-between"
        spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="Total Supply" value={PriceTotalSupply} onChange={(e) => {
              setPriceTotalSupply(parseFloat(e.target.value))
              // if (e.target.value.indexOf('$') < 0) {
              //   console.log("yes")
              //   setPriceTotalSupplyText(`$ ${e.target.value}`);
              // } else {
              //   console.log("no")
              //   setPriceTotalSupplyText(e.target.value);
              // }
            }} />
          </div>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="Market Cap" value={PriceMarketCapText} onChange={(e) => {
              setPriceMarketCap(parseFloat(e.target.value))
              if (e.target.value.indexOf('$') < 0) {
                console.log("yes")
                setPriceMarketCapText(`$ ${e.target.value}`);
              } else {
                console.log("no")
                setPriceMarketCapText(e.target.value);
              }
            }} />
          </div>
        </Grid>
      </Grid>
    </div>

    <div>
      <Grid container
        justify="space-between"
        spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="Market Rank" value={PriceMarketRankText} onChange={(e) => {
              setPriceMarketRank(parseFloat(e.target.value))
              if (e.target.value.indexOf('#') < 0) {
                console.log("yes")
                setPriceMarketRankText(`# ${e.target.value}`);
              } else {
                console.log("no")
                setPriceMarketRankText(e.target.value);
              }
            }} />
          </div>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
          <div className="price-text-field-container-style-new">
            <TextField id="chart-price-change-general-textfield-standard-text" label="Market Dominance" value={PriceMarketDominance} onChange={(e) => {
              setPriceMarketDominance(parseFloat(e.target.value))
              // if (e.target.value.indexOf('$') < 0) {
              //   console.log("yes")
              //   setPriceMarketDominanceText(`$ ${e.target.value}`);
              // } else {
              //   console.log("no")
              //   setPriceMarketDominanceText(e.target.value);
              // }
            }} />
          </div>
        </Grid>
      </Grid>
    </div>

  </div>)
}

export default LeftChartContainer
