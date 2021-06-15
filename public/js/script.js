function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

function initOnReady() {
  var elem = document.getElementById('tv_chart_container')
  if (!elem) {
    console.log('there is no tv_chart_container')
    // window.setTimeout(initOnReady, 1000);
    return
  }
  if (elem.innerHTML != '') return
  var widget = (window.tvWidget = new TradingView.widget({
    // debug: true, // uncomment this line to see Library errors and warnings in the console
    width: '100%',
    height: 580,
    symbol: '0xB09FE1613fE03E7361319d2a43eDc17422f36B09-bsc',
    interval: '60',
    container_id: 'tv_chart_container',

    //	BEWARE: no trailing slash is expected in feed URL
    datafeed: new Datafeeds.UDFCompatibleDatafeed('https://api.dex.guru/v1/tradingview'),
    library_path: 'js/charting_library/',
    locale: getParameterByName('lang') || 'en',

    disabled_features: ['use_localstorage_for_settings'],
    enabled_features: ['study_templates'],
    charts_storage_url: 'https://saveload.tradingview.com',
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    // theme: getParameterByName('theme'),
    theme: 'Dark',
  }))
}

window.addEventListener('makeChart', function () {
  window.setTimeout(initOnReady, 1000)
})
