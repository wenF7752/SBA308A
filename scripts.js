import { fetchCoinsList, fetchNews, fetchTop10Coins, fetchPrice } from './api.js';
// Model
class Model {
    #coinsList = {}
    #news = {}
    #top10Coins = {}
    #coinPrices = {};

    constructor() {
        this.#coinsList = {}
        this.#news = {}
        this.#top10Coins = {}
        this.#coinPrices = {};

    }
    addData(item) {
        // This is an example of adding data (you can adjust it to your needs)
        this.#coinsList[item.id] = item;
    }
    getData() {
        return {
            coinsList: this.#coinsList,
            news: this.#news,
            top10Coins: this.#top10Coins,
            coinPrices: this.#coinPrices
        };
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
            <img
              src="${news.imageurl}"
              style="width: 100%; height: auto;"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${news.title} </h2>
            <p class="truncate ...">${news.body}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary"
              onclick="window.location.href='${news.url}} '"
              >Read Now</button>
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
               <tr>
                <th>${coin.CoinInfo.Name}</th>
                <td>${coin.CoinInfo.FullName}</td>
                <td>${coin.RAW && coin.RAW.USD && coin.RAW.USD.PRICE ? coin.RAW.USD.PRICE.toLocaleString() + ' $' : 'No data available'}</td>
                <td>${coin.RAW && coin.RAW.USD && coin.RAW.USD.VOLUME24HOURTO ?
                    coin.RAW.USD.VOLUME24HOURTO.toLocaleString() + ' $' : 'No data available'}
                 </td>
              </tr>
            `;
            this.table_rows.appendChild(tr);

        });
    }
}

// Controller
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;


    }

    async handleAddItem(event) {
        event.preventDefault();

        const item = this.view.input.value;
        if (item) {
            this.model.addData(item);
            this.view.displayData(this.model.getData());
            this.view.input.value = '';
        }
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
}

const app = new Controller(new Model(), new View());
app.loadInitialData();