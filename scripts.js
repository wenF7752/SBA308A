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
    }


    displayData(data) {
        console.log(data);

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
        const coinsListParams = {};
        const coinPrice = { fsyms: 'BTC,ETH', tsyms: 'USD,JPY,EUR' };
        const newsParams = { lang: 'EN' };
        const top10CoinsParams = { limit: 10, tsym: 'USD' };

        await this.model.fetchPrices(coinPrice);
        await this.model.fetchList();
        await this.model.fetchNews(newsParams);
        await this.model.fetchTop10(top10CoinsParams);

        this.view.displayData(this.model.getData());
    }
}

const app = new Controller(new Model(), new View());
app.loadInitialData();