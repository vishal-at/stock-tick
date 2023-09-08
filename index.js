const { TradingViewAPI } = require('tradingview-scraper');

const instrumentSymbol = 'ZOMATO';
const tv = new TradingViewAPI();

process.stdout.write('Loading...');

tv.setup().then(() => {
  tv.getTicker(instrumentSymbol).then(ticker => {
    let last = 0;
    let lastTime = new Date();
    ticker.on('update', data => {
      if (data.lp && data.lp !== last) {
        // process.stdout.clearLine(0);
        // process.stdout.cursorTo(0);
        time = new Date();
        console.log(
          `[${instrumentSymbol}] ${last > data.lp ? '-' : '+'} ${data.lp.toFixed(2)}  ${time - lastTime }`
        );
        last = data.lp;
        lastTime = time;
      }
    });
  });
});
