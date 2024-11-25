import React, { useEffect,useState } from 'react'
import profile from '../../Components/Assets/Avatar2.png'
import vs from '../../Components/Assets/versus.png'
import { useDispatch, useSelector } from 'react-redux'
import { adminBattleRecieve, adminBattleUpdate, adminBattleView } from '../../store/reducer/adminReducer'
import { useNavigate, useParams } from 'react-router'
import { IoMdClose } from 'react-icons/io'

const BattleControl = () => {
  const { battleViewData,loader } = useSelector((state) => state.admin)
  const [isZoomed2, setIsZoomed2] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  useEffect(() => {
    dispatch(adminBattleView(id))
  }, [])

  const imageUrl = battleViewData?.status;
  const imageUrl2 = battleViewData?.acceptedBy[0]?.status;
  const basePattern = 'https://res.cloudinary.com';

  const isMatch = imageUrl?.startsWith(basePattern);
  const isMatch2 = imageUrl2?.startsWith(basePattern);

  const clickToCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard")
  }


  const handleUpdate = (name) => {
    dispatch(adminBattleUpdate({ id, name })).then((res) => {
      if (res.payload.success) {
        alert(res.payload.message);
        window.location.reload();
        navigate("/dashboard/battle-result");
      } else {
        
        alert(res.payload.message);
      }
    });
  };

   // zoom
   const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleImageClick2 = () => {
    setIsZoomed2(true);
  };

  const handleCloseClick = () => {
    setIsZoomed(false);
    setIsZoomed2(false);
  };
  
  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-lg shadow-md sm:p-4">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Battle View</h1>
        <div className="flex flex-col sm:flex-row justify-around items-center mb-6">
        <div className="flex flex-col items-center mb-4 sm:mb-0 sm:ml-4">
            <img src={profile} alt="Player 2 Avatar" className="rounded-full w-24 mb-2" />
            <div className="flex items-center mb-1">
              <span className="text-lg font-semibold text-foreground">
                {battleViewData?.acceptedBy[0]?.status == 0 || battleViewData?.acceptedBy[0]?.status == 1 ? "Pending" : battleViewData?.acceptedBy[0]?.status}

              </span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-muted-foreground">{battleViewData?.acceptedBy[0]?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground">{battleViewData?.acceptedBy[0]?.phone}</span>
            </div>
          </div>
          <img src={vs} alt="VS icon" className="mx-4 hidden sm:block w-16" />
          


          <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-4">
            <img src={profile} alt="Player 1 Avatar" className="rounded-full w-24 mb-2" />
            <div className="flex items-center mb-1">
              <span className="text-lg font-semibold text-foreground">
                {battleViewData?.status == 0 || battleViewData?.status == 1 ? "Pending" : battleViewData?.status}

              </span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-muted-foreground">{battleViewData?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground">{battleViewData?.phone}</span>
            </div>
          </div>
        </div>

        {/* Battle Running Status */}
        <div className="bg-[#e9e9e9] text-[#052905] p-2 rounded-lg mb-4 text-center">
          <p>Battle Running: Yes</p>
        </div>

        {/* Player Stats Section */}
        <div className="bg-card p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground text-center">Player Status</h2>
         
        </div>
        {/* Control Battle Outcome */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Control Battle Outcome</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-4">
            <button className="bg-[#006ce7] text-white p-2 rounded-sm mb-2" disabled={loader?true:false} onClick={() => handleUpdate("2")}>
                Player 2 Wins
              </button>
            </div>
            <div className="flex flex-col items-center mb-4 sm:mb-0 sm:ml-4">
              
              <button className="bg-green-500 text-white p-2 rounded-sm mb-2"  disabled={loader?true:false}  onClick={() => handleUpdate("1")}>
                Player 1 Wins
              </button>
            </div>
          </div>
        </div>

        {/* Battle Details */}
        <div className="bg-primary text-primary-foreground p-2 rounded-t-lg">
          <span>Battle Details</span>
        </div>
        <div className="bg-card p-4 rounded-b-lg ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Battle ID</span>
              <span className="flex items-center">
                {battleViewData?.battleId}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Room ID</span>
              <span className="flex items-center">
                {battleViewData?.room}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Admin Commission</span>
              <span className="flex items-center">
                ₹ {battleViewData?.amount*2-battleViewData?.recieve}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Reffer Person</span>
              <span className="flex items-center">
                0
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Reffer Commission</span>
              <span className="flex items-center">
                ₹ 0
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Creator ID</span>
              <span className="flex items-center">
                {battleViewData?.phone}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Joiner ID</span>
              <span className="flex items-center">
                {battleViewData?.acceptedBy[0]?.phone}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Creator Result</span>
              <span className={`flex items-center ${battleViewData?.status == 0 ? "text-orange-300" : battleViewData?.status == "loss" ? "text-red-500" : battleViewData?.status == "win" ? "text-green-500" : "text-red-500"}`} onClick={() => clickToCopy(battleViewData?.status)}>
                {battleViewData?.status == 0 || battleViewData?.status == 1 ? "Pending" : battleViewData?.status}
              </span>
              <span>
                {battleViewData?.description && battleViewData?.description?.startsWith('http') ?
                
                
                <img src={battleViewData?.description} alt="Battle Image" className="w-32 h-20"   onClick={handleImageClick2}/> 
                
                : battleViewData?.description}


{isZoomed2 && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                          <div className="relative" onClick={handleCloseClick}>
                            <img
                              src={battleViewData?.description}
                              alt=""
                              className="w-full h-[80vh]"
                            />
                            <button
                              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
                              onClick={handleCloseClick}
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        </div>
                      )}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Joiner Result</span>
              <span className={`flex items-center ${battleViewData?.acceptedBy[0]?.status == 0 ? "text-orange-300" : battleViewData?.acceptedBy[0]?.status == "loss" ? "text-red-5000" : battleViewData?.acceptedBy[0]?.status == "win" ? "text-green-500" : "text-red-5000"}`} onClick={() => clickToCopy(battleViewData?.acceptedBy[0]?.status)}>
                {battleViewData?.acceptedBy[0]?.status == 0 || battleViewData?.acceptedBy[0]?.status == 1 ? "Pending" : battleViewData?.acceptedBy[0]?.status}

              </span>
              <span>
                {battleViewData?.acceptedBy[0]?.description && battleViewData?.acceptedBy[0]?.description?.startsWith('http') ? <img src={battleViewData?.acceptedBy[0]?.description} alt="Battle Image" className="w-32 h-20"  onClick={handleImageClick}/> : battleViewData?.acceptedBy[0]?.description}


                {isZoomed && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                          <div className="relative" onClick={handleCloseClick}>
                            <img
                              src={battleViewData?.acceptedBy[0]?.description}
                              alt=""
                              className="w-full h-[80vh]"
                            />
                            <button
                              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
                              onClick={handleCloseClick}
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        </div>
                      )}

              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Entry Fee</span>
              <span className="flex items-center">
                ₹ {battleViewData?.amount}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b">
              <span className="text-muted-foreground">Prize</span>
              <span className="flex items-center">
                ₹ {battleViewData?.recieve}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b">
              <span className="text-muted-foreground">Game Status</span>
              <span className={`flex items-center ${battleViewData?.betstatus == "1" ? "text-green-500" : "text-orange-300"}`}>
                {battleViewData?.betstatus == "1" ? "Completed" : "Pending"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b">
              <span className="text-muted-foreground">Is Running</span>
              <span className="flex items-center">
                {battleViewData?.betstatus == "1" ? "No" : "Yes"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b">
              <span className="text-muted-foreground">Winner</span>
              <span className="flex items-center">
                {isMatch ? battleViewData?.phone : isMatch2 ? battleViewData?.acceptedBy[0]?.phone : "Not Show"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b">
              <span className="text-muted-foreground">Losser</span>
              <span className="flex items-center">
                0
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b">
              <span className="text-muted-foreground">Level</span>
              <span className="flex items-center">
                Not Show
              </span>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default BattleControl
