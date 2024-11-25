import React, { useEffect, useState } from 'react';
import img from './Assets/global-battleIconWhiteStroke.png'
import money from './Assets/global-rupeeIcon.png'
import vs from './Assets/versus.png'
import profile from './Assets/Avatar2.png'
import loader from './Assets/download.gif'
import { IoMdInformationCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { betAccept, betAcceptList, betDelete, betList, userBet } from '../store/reducer/gameReducer';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getUser } from '../store/reducer/authReducer';

const LiteMood = () => {
  const [amount, setAmount] = useState();
  const { betlists, loader, successMessage, errorMessage,betInfoList } = useSelector((state) => state.bet);
  const { userDetail } = useSelector((state) => state.auth);
const navigate=useNavigate()
  const dispatch = useDispatch()

  const handleAddBattle = () => {
    if (amount && !isNaN(amount )) {
      setAmount('');
             dispatch(userBet(amount)).then((response) => {
          // Ensure betList is called after userBet
          dispatch(betList());

          if (response.payload.success) {
            dispatch(getUser());
            alert(response.payload.message);
          }else{
            alert(response.payload.message);
          }
        })   
      
    
      if (!loader) {
        dispatch(betList())
      }
    }
  };

  // const handleDeleteBattle = (id) => {
  //   setBattles(battles.filter((battle) => battle.id !== id));
  // };
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(betList());
      dispatch(betAcceptList());
    }, 2000);

    return () => clearInterval(intervalId);
  }, [userDetail, betlists?.length])

  const handleAccept = (id) => {
    dispatch(betAccept(id)).then((response) => {
 
      // Ensure betList is called after userBet
      dispatch(betList())
      dispatch(betAcceptList())
      if (response.payload.success) {
        dispatch(getUser());
        alert(response.payload.message);
        navigate(`/view-battle/${id}`)
      }else{
        alert(response.payload.message);
      }
    })
   
  }

  const handleDelete = (id) => {
    dispatch(betDelete(id)).then(()=>{
      dispatch(betList())
      dispatch(betAcceptList())
      dispatch(getUser());
    })
  
    if (successMessage == "bet accepted") {
      dispatch(betList())
      dispatch(betAcceptList())
    }
  }
  return (
    <div>
      <div className="p-4 space-y-4 mt-[60px]">
        <h2 className="text-center text-[gray] text-[1rem]">Create a battle</h2>
        <div className="flex items-center space-x-2">
          <input
            min="100"
            max="500"
            type="number"
            placeholder="Amount"
            className="border border-zinc-300 rounded p-2 flex-grow"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleAddBattle} className="bg-[#3a86ff] text-white px-4 py-2 rounded">
            SET
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img src={img} className="w-[20px]" alt="" />
            <h2 className="text-lg font-semibold text-foreground">Open Battles</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">RULES</span>
            <IoMdInformationCircle />
          </div>
        </div>
        {/* {battles.map((battle) => ( */}
        {Array.isArray(betlists) && betlists?.map((battle) => (
          <div key={battle.id} className="bg-[#fcf7ff] border-[#e3b3ff] rounded shadow">

            <div className="bg-secondary rounded space-y-1">
              <div className="flex justify-between items-center border-b-2 py-1 px-3">
                <span className="text-muted-foreground text-[0.8rem]">
                  CHALLENGE FROM <span className="text-destructive">{battle.name}</span>
                </span>

                {userDetail?.phone == battle?.phone ? (
                  <div className='flex items-center'>
                    <button className="bg-green-500 text-white text-[0.8rem] mr-1 text-destructive-foreground px-2 py-1 rounded" onClick={() => battle.acceptedBy !="" ? navigate(`/view-battle/${battle?._id}`):""}>
                      {battle.acceptedBy != "" ? "START" : "WAIT"}
                    </button>

                    <button className="bg-[#dc3545] text-white text-[0.8rem] text-destructive-foreground px-2 py-1 rounded"
                     disabled={loader?true:false} 
                    onClick={() => handleDelete(battle?._id)}>
                      DELETE
                    </button>
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <button className="bg-green-500 text-white text-[0.8rem] mr-1 text-destructive-foreground px-2 py-1 rounded"
                     disabled={loader?true:false} 
                    onClick={() => handleAccept(battle?._id)}>
                      PLAY
                    </button>
                    <button className="bg-[#dc3545] text-white text-[0.8rem] text-destructive-foreground px-2 py-1 rounded"
                     disabled={loader?true:false} 
                  >
                      CANCEL
                    </button>
                  </div>
                )}
               
              </div>
              <div className="flex justify-between items-center text-muted-foreground px-3">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center space-x-1">
                    <span className="text-[0.8rem]">ENTRY FEE</span>
                    <span className="text-primary flex"><img src={money} className="w-[20px]" alt="" /> {battle.amount}</span>
                  </div>
                  <div className="flex flex-col items-center space-x-1">
                    <span className="text-[0.8rem]">PRIZE</span>
                    <span className="text-primary flex"><img src={money} className="w-[20px]" alt="" /> {battle.recieve}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img src={loader} className="w-[20px]" alt="" />
                  <span className="text-[0.8rem]">Finding Player!</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className=" p-4 rounded shadow">
          <div className="flex items-center space-x-2 mb-2">
            <img src={img} className="w-[20px]" alt="" />
            <h2 className="text-lg font-semibold text-foreground">Running Battles</h2>
          </div>

          {Array.isArray(betInfoList) && betInfoList?.map((item, i) => (


            <div className="bg-[#fcf7ff] border border-[#e3b3ff] rounded space-y-2 mb-2" key={i}>
              <div className="flex justify-between items-center border-b-2 p-1">
                <div className="flex items-center space-x-1">
                  <span className="text-[0.8rem]">PLAYING FOR</span>
                  <span className="text-[0.8rem] flex"><img src={money} className="w-[20px]" alt="" /> {item.amount}</span>
                </div>
{item?.phone || item?.acceptedBy[0]?(

  
  <Link to={`/view-battle/${item?._id}`}>
                  <button className="bg-[#1aa6be] px-2 text-white">view</button>
                  </Link>
                ):""}
                <div className="flex items-center space-x-1">
                  <span className="text-[0.8rem]">PRIZE</span>
                  <span className="text-[0.8rem] flex"><img src={money} className="w-[20px]" alt="" /> {item.recieve}</span>
                </div>
              </div>
              <div className="flex justify-between items-center px-3">
                <div className="flex items-center space-x-2">
                  <img src={profile} alt="player1-avatar" className="rounded-full w-[25px]" />
                  <span className="text-[0.8rem]">{item.name}</span>
                </div>
                <img src={vs} className="w-[25px]" alt="battle-icon" />
                <div className="flex items-center space-x-2">
                  <img src={profile} alt="player2-avatar" className="rounded-full w-[25px]" />
                  <span className="text-[0.8rem]">{item?.acceptedBy[0]?.name}</span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LiteMood
