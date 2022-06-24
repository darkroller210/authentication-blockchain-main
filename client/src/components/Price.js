import React, { useState, useEffect} from 'react';
import '../Price.css';
import Coin from './Coins'
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function News(){
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const link = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=';
    const link2= '&sparkline=false&price_change_percentage=0.05h';
    const page = 1


    const reload = () => {
      window.location.reload()
    }
    
  useEffect(() => {
    axios
      .get(
        link+page+link2
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      <Button className='reload' onClick={reload}>Reload</Button>
      <div className='format-title-coin'>
            <span className='Icon'>Icoin</span>
            <span className='Name'>Name</span>
            <span className='Symbol'>Symbol</span>
            <span className='Price'>Price</span>
            <span className='Marketcap'>Marketcap</span>
            <span className='Price-change-24h'>24h Change</span>
            <span className='Volume'>Volume</span>
        </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
      <div>
        <Button >Preive</Button>
        <Button >Next</Button>
      </div>
    </div>
  );
}

export default News;
