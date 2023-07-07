import React from 'react'
import { AllFavoriteApis } from '../../api/internal';
import './FavoriteApi.css';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { getCrypto } from '../../api/external';


function FavoriteCoin() {
    const userid = useSelector((state) => { return (state.user._id) });
    const [favourite,setfavourite] = useState([]);
    const [loaded,setLoaded] = useState(false);

    console.log('this is user id'+userid);
    const data = {
        userid
    }
    useEffect(()=>{ 
        async function cryptoApiCall(){

            try{
            const response = await AllFavoriteApis(data);

            const uniqueArray = response.data.allApi.filter(
                (obj, index, self) =>
                  index === self.findIndex((o) => o.api === obj.api)
              );
             const responsecrypto = await getCrypto();

              const matchedObjects = responsecrypto.filter(obj2 => {
                return uniqueArray.some(obj1 => obj1.api === obj2.id);
              });
            
            setfavourite(matchedObjects);
            setLoaded(true);

        }
            catch(err){
                console.log(err);
            }
        };
        cryptoApiCall();
    },[]);
  
  return (
   <>
  {loaded? <>
    <div className="styles-header">
        Latest Articles
    </div>
    <div className="grid">
        {favourite.map((favourite)=>{
            return(
            <div className='card' key={favourite.id}>
            <div style={{height:'80px', width: '80px'}}><img src={favourite.image} className='frvt-img' alt="" /></div>
            <h5>{favourite.symbol}</h5>
            <h5> {favourite.current_price}</h5>
            <h4>{favourite.name}</h4>
           </div>
            )
        })}
    </div></> : <> <div style={{width:"fit-content",margin:"auto",textAlign:'center',justifyContent:'center',alignItems:'center'}}><TailSpin height={80} width={80} radius={1} color={'#800080'} /></div></>}
 </>
  )
}

export default FavoriteCoin;

