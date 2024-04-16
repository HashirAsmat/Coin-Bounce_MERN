import React from 'react'
import { useState,useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { getCrypto } from '../../api/external';
import { useSelector } from 'react-redux';
import { FavoriteApi } from '../../api/internal';
import { useNavigate } from 'react-router-dom';
import './Crypto.css';

function Crypto() {
    const [data,setData] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const navigate = useNavigate();
    const userid = useSelector((state) => { return (state.user._id) });

    const favoriteCurrency = async (api)=>{
        const data = {
            user:userid,
            api
        }
       console.log(userid,api);
       const response = await FavoriteApi(data);
       console.log(response);

      if(response.status ===201){
        navigate("cryptofavorite");
      }
    }

    useEffect(()=>{
        //IEFE: immediately envoke fucntion expression
        setLoaded(false);
        (async function cryptoApiCall(){
            try{
            const response = await getCrypto();
            console.log(response);
            
            setLoaded(true);
            setData(response);
        }
            catch(err){
                console.log(err);
            }
        })();
    },[]);

const negativeStyle = {
    color:'#ea3943'
}
const positiveStyle = {
    color:'green'
}
  return (
   <>
   {loaded ?
    <><table className='table'>
    <thead>
        <tr className='head'>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h</th>
        </tr>
    </thead>
    <tbody>
       {data && data.map((coin)=>{
        return(
            <tr id={coin.id}  className='tableRow' onClick={()=>favoriteCurrency(coin.id)}>
                <td>{coin.market_cap_rank}</td>
                <td>
                    <div className='logo'>
                        <img src={coin.image} height={40} width={40} alt="" /> {coin.name}
                    </div>
                </td>
                <td>
                    <div className='symbol'>{coin.symbol}</div>
                </td>
                <td>
                    {coin.current_price}
                </td>
                <td style={coin.price_change_percentage_24h < 0 ? negativeStyle : positiveStyle}>
                    {coin.price_change_percentage_24h}
                </td>
            </tr>
        )
       })}
    </tbody>
    </table></> : <><div style={{display:'flex', justifyContent:'center',alignItems:'center',textAlign:'center', marginTop:'10px'}}><div>Loading CryptoPage</div><TailSpin height={80} width={80} radius={1} color={'#800080'} /></div></>}
   </>
  )
}

export default Crypto;