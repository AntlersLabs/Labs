import axios from 'axios';

async function getBitcoinPrice(): Promise<void> {
    try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

        const response = await axios.get(url);

        const bitcoinPrice = response.data.bitcoin.usd;

        console.log(`The current price of Bitcoin is $${bitcoinPrice}`);
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
}

getBitcoinPrice();