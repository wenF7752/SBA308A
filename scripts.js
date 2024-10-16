import { fetchCoinsList, fetchNews, fetchTop10Coins, fetchPrice, fetchSignal } from './api.js';
// Model
class Model {
    #coinsList = {}
    #news = {}
    #top10Coins = {}
    #coinPrices = {};
    #signal = {};
    constructor() {
        this.#coinsList = {}
        this.#news = {}
        this.#top10Coins = {}
        this.#coinPrices = {};
        this.#signal = {};

    }

    getData() {
        return {
            coinsList: this.#coinsList,
            news: this.#news,
            top10Coins: this.#top10Coins,
            coinPrices: this.#coinPrices
        };
    }
    getSignal() {
        return this.#signal;
    }

    async fetchPrices(params) {
        try {
            const price = await fetchPrice(params);
            this.#coinPrices = price;
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    }
    async fetchList() {
        try {
            const data = await fetchCoinsList();
            this.#coinsList = data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async fetchNews(params) {
        try {
            const news = await fetchNews(params);
            this.#news = news;
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }
    async fetchTop10(params) {
        try {
            const top10Coins = await fetchTop10Coins(params);
            this.#top10Coins = top10Coins;
        } catch (error) {
            console.error('Error fetching top 10 coins:', error);
        }
    }

    async fetchSignalUser(params) {
        try {
            const signal = await fetchSignal(params);
            this.#signal = signal;
        } catch (error) {
            console.error('Error fetching signal:', error);
        }
    }

}

// View
class View {
    constructor() {
        this.app = document.getElementById('app');
        this.priceBoard = document.getElementById('price-board');
        this.coinsList = document.getElementById('coins-list');
        this.newsBoard = document.getElementById('news-board');
        this.top10CoinsTable = document.getElementById('top-10-coins');
        this.BTC_USD = document.getElementById('BTC-USD');
        this.BTC_JPY = document.getElementById('BTC-JPY');
        this.BTC_EUR = document.getElementById('BTC-EUR');
        this.ETH_USD = document.getElementById('ETH-USD');
        this.ETH_JPY = document.getElementById('ETH-JPY');
        this.ETH_EUR = document.getElementById('ETH-EUR');
        this.BNB_USD = document.getElementById('BNB-USD');
        this.BNB_JPY = document.getElementById('BNB-JPY');
        this.BNB_EUR = document.getElementById('BNB-EUR');
        this.table_rows = document.querySelector('tbody');
        this.news_container = document.getElementById('news-container');
        this.signalButton = document.getElementById('signal-button');
        this.inputBox = document.querySelector('input');
        this.signalTable = document.getElementById('signal-table');
    }

    displayData(data) {
        console.log(data);
        this.displayPriceBoard(data.coinPrices);
        this.displayNews(data.news);
        this.displayTop10Coins(data.top10Coins);
    }

    displayPriceBoard(data) {
        this.BTC_USD.textContent = `${data.BTC.USD.toLocaleString()}$`;
        this.BTC_EUR.textContent = `${data.BTC.EUR.toLocaleString()}€`;
        this.ETH_USD.textContent = `${data.ETH.USD.toLocaleString()}$`;
        this.ETH_EUR.textContent = `${data.ETH.EUR.toLocaleString()}€`;
        this.BNB_USD.textContent = `${data.BNB.USD.toLocaleString()}$`;
        this.BNB_EUR.textContent = `${data.BNB.EUR.toLocaleString()}€`;
    }

    displayNews(data) {
        data.Data.forEach((news) => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img src="${news.imageurl}" style="width: 100%; height: auto;" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${news.title}</h2>
                    <p class="truncate ...">${news.body}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary"
                        onclick="window.location.href='${news.url}'">
                        Read Now</button>
                    </div>
                </div>
            </div>`;
            this.news_container.appendChild(div);
        });
    }

    displayTop10Coins(data) {
        data.Data.forEach((coin) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
               <th>${coin.CoinInfo.Name}</th>
               <td>${coin.CoinInfo.FullName}</td>
               <td>
  ${coin.RAW && coin.RAW.USD && coin.RAW.USD.PRICE
                    ? coin.RAW.USD.PRICE.toLocaleString(undefined, {
                        minimumFractionDigits: 8,
                        maximumFractionDigits: 8
                    }) + ' $'
                    : 'No data available'}
</td>
               <td>${coin.RAW && coin.RAW.USD && coin.RAW.USD.VOLUME24HOURTO ? coin.RAW.USD.VOLUME24HOURTO.toLocaleString() + ' $' : 'No data available'}</td>`;

            this.table_rows.appendChild(tr);
        });


    }
    displaySignal(data) {

        this.signalTable.innerHTML = '';  // Clear the signal table or desired element

        const div = document.createElement('div');

        // Check if data or any key property is undefined
        if (!data || !data.symbol || !data.addressesNetGrowth || !data.concentrationVar || !data.inOutVar || !data.largetxsVar) {
            div.innerHTML = `<h2 class="text-lg">Symbol signals not available</h2>`;
        } else {
            const { addressesNetGrowth, concentrationVar, inOutVar, largetxsVar } = data;

            div.innerHTML = `
                <h2 class="text-lg">${data.symbol} Signal: </h2>
                <p>addressesNetGrowth: ${addressesNetGrowth.sentiment}</p>
                <p>concentrationVar: ${concentrationVar.sentiment}</p>
                <p>inOutVar: ${inOutVar.sentiment}</p>
                <p>largetxsVar: ${largetxsVar.sentiment}</p>
            `;
        }

        this.signalTable.appendChild(div);  // Append the div to the signal table or desired element
    }


}

// Controller
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.signalButton.addEventListener('click', this.handleSignalButton.bind(this));

    }



    async loadInitialData() {

        const coinPrice = { fsyms: 'BTC,ETH,BNB', tsyms: 'USD,JPY,EUR' };
        const newsParams = { lang: 'EN' };
        const top10CoinsParams = { limit: 20, tsym: 'USD' };

        await this.model.fetchPrices(coinPrice);
        await this.model.fetchList();
        await this.model.fetchNews(newsParams);
        await this.model.fetchTop10(top10CoinsParams);

        this.view.displayData(this.model.getData());
    }


    async handleSignalButton() {
        this.view.signalButton.addEventListener('click', async () => { // Make the event handler async
            const userInput = this.view.inputBox.value;
            const signalParams = { fsym: userInput.toUpperCase() };

            try {
                // Await the async operation (e.g., fetching data)
                await this.model.fetchSignalUser(signalParams);
                this.view.displaySignal(this.model.getSignal().Data);
            } catch (error) {
                console.error('Error during signal button operation:', error);
            }
        });
    }


}

const app = new Controller(new Model(), new View());
app.loadInitialData();