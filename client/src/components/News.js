import React, { useState } from "react";
import { ethers } from "ethers";
import '../bootstrap/bootstrap.min.css'
import solana from '../img/Solana.jpeg'
import harmony from '../img/Harmony-Horizon.png'
import cr7 from '../img/CR7-x-Binance.png'
import axie from '../img/ronin-axie.png'
import { Button } from 'semantic-ui-react';
import '../News.css'

const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
    } catch (err) {
    }
  };
  
  export default function News() {
    const [value, setValue] = useState('')
    const handleSubmit = async (e) => {
      e.preventDefault();
      await startPayment({    
        ether: value,
        addr: '0x2D61dC4D5b4A1f05Ef20016cF00334BF5D9039ea'
      });
    };


return (
    <div class="container format-new">
        <div class="row">
            <div class="col-sm">
                <h1 className='title-post'>Solana làm smartphone Web3, cửa hàng ứng dụng dApp</h1>
                <p className='post-date'>24/06/2022 - Nổi bật Altcoin - by Alise</p>
                <p className='title-2'>
                Solana Labs trình làng Solana Mobile Stack trên nền tảng di động Android và chuẩn bị ra mắt điện thoại thông minh Saga vào đầu năm 2023.
                </p>
                <img width={600} height={300} src={solana} alt=''></img>
                <p className='content'>
                    Solana Mobile Stack (SMS) là một layer crypto được xây dụng trên Android để làm cho trải nghiệm Web3 của người dùng được trở nên liền mạch hơn. Theo công ty, tính năng này sẽ hoạt động trên tất cả các thiết bị di động không chỉ riêng Android. Đây là bộ công cụ dành cho các nhà phát triển có nhu cầu tạo ứng dụng crypto mobile trên Solana và hiện SMS đã có sẵn để tải về.
                </p>
                    <input
                    name="bnb"
                    type="text"
                    className="donate"
                    placeholder="0.01"
                    onChange={event => setValue(event.target.value)}
                />
                    <Button onClick={handleSubmit}>Donate</Button>
            </div>
            <div class="col-sm">
                <h1 className='title-post'>Cristiano Ronaldo phát hành NFT cùng Binance</h1>
                <p className='post-date'>23/06/2022 - Nổi bật Altcoin - by Rich</p>
                <p className='title-2'>
                Tối 23/06, sàn giao dịch tiền mã hóa lớn nhất thế giới Binance cho biết sắp phát hành NFT cho ngôi sao bóng đá Cristiano Ronaldo.
                </p>
                <img width={600} height={300} src={cr7} alt=''></img>
                <p className='content'>
                Theo chi tiết được Binance công bố, tiền đạo của tuyển Bồ Đào Nha và CLB Manchester United sẽ phát hành một chuỗi các bộ sưu tập NFT trên nền tảng Binance NFT. Những người dùng Binance tại các quốc gia nhất định sẽ có thể tham gia mua NFT qua ứng dụng Binance Pay.
                </p>
                <input
                name="bnb"
                type="text"
                className="donate"
                placeholder="0.01"
                onChange={event => setValue(event.target.value)}
              />
                <Button onClick={handleSubmit}>Donate</Button>
            </div>
            
        </div>
        <div class="row row-2">
            <div class="col-sm">
                <h1 className='title-post'>Cầu nối Horizon của Harmony bị hack, thiệt hại ước tính 100 triệu USD</h1>
                <p className='post-date'>23/06/2022 - Nổi bật Altcoin - by Roll</p>
                <p className='title-2'>
                Các dự án cầu nối tiếp tục trở thành nạn nhân của các vụ hack, mới nhất là Horizon của Harmony với thiệt hại “9 chữ số”.
                </p>
                <img width={600} height={300} src={harmony} alt=''></img>
                <p className='content'>
                Sáng 24/06, cầu nối cross-chain Horizon của Harmony được xác nhận là đã bị hacker tấn công với thiệt hại ban đầu ước tính lên đến 100 triệu USD theo khẳng định của dự án.
                Theo ví của hacker được Harmony cung cấp, kẻ tấn công bòn rút hơn 13.100 ETH (trị giá 14,1 triệu USD), 592 WBTC (12,4 triệu USD), 9,9 triệu USDT, 41,2 triệu USDC, 6 triệu DAI, 5,5 triệu BUSD, 5,6 triệu FRAX, 84,6 triệu AAG (1,3 triệu USD), 110.000 FXS (607 nghìn USD), 415.000 SUSHI (518 nghìn USD), cùng nhiều token ERC-20 khác.
                </p>
                <input
                name="bnb"
                type="text"
                className="donate"
                placeholder="0.01"
                onChange={event => setValue(event.target.value)}
              />
                <Button onClick={handleSubmit}>Donate</Button>
            </div>
            <div class="col-sm">
                <h1 className='title-post'>Cầu nối Ronin của Axie Infinity sắp hoạt động trở lại</h1>
                <p className='post-date'>24/06/2022 - Nổi bật Altcoin - by T-SCAN</p>
                <p className='title-2'>
                Tin vui cho người dùng của Axie Infinity là cầu nối Ronin sẽ được mở lại vào ngày 28/06/2022.
                </p>
                <img width={600} height={300} src={axie} alt=''></img>
                <p className='content'>
                Như Coin68 đã đưa tin vào tháng 3, cầu nối Ronin của Axie Infinity bị hack 622 triệu USD, nghiêm trọng nhất lịch sử. Cụ thể, cầu nối giữa Ethereum và Axie Infinity là Ronin Network (RON) đã bị hacker cuỗm đi 173.600 ETH và 25,5 triệu USDC. Sau đó, đội ngũ dự án phải dừng hoạt động cả bridge Ronin lẫn sàn DEX Katana.
                </p>
                <input
                name="bnb"
                type="text"
                className="donate"
                placeholder="0.01"
                onChange={event => setValue(event.target.value)}
              />
                <Button onClick={handleSubmit}>Donate</Button>
            </div>
        </div>
    </div>
);
        }
