import React, { useEffect } from 'react'
import profile from '../../Components/Assets/Avatar2.png'
import vs from '../../Components/Assets/versus.png'
import { adminBattleView } from '../../store/reducer/adminReducer'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

const DisputeDetail = () => {
  const { battleViewData } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    dispatch(adminBattleView(id))
  }, [])

  const imageUrl = battleViewData?.status;
  const imageUrl2 = battleViewData?.acceptedBy[0]?.status;
  const basePattern = 'https://res.cloudinary.com';

  // const isMatch = imageUrl.startsWith(basePattern);
  // const isMatch2 = imageUrl2.startsWith(basePattern);

  const clickToCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard")
  }

  return (
    <div className="w-[100%]">
      <div className="bg-white p-6 rounded-lg shadow-md  sm:p-4">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Battle View</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-4 ">
            <img src={profile} alt="Player 1 Avatar" className="rounded-full w-[100px] mb-2" />
            <div className="flex items-center mb-1">
              <span className="text-lg font-semibold text-foreground">Loser</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-muted-foreground">{battleViewData?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground">{battleViewData?.phone}</span>
            </div>
          </div>
          <img src={vs} alt="VS icon" className="mx-4 hidden sm:block w-[100px] " />
          <div className="flex flex-col items-center mb-4 sm:mb-0 sm:ml-4 ">
            <img src={profile} alt="Player 2 Avatar" className="rounded-full w-[100px] mb-2" />
            <div className="flex items-center mb-1">
              <span className="text-lg font-semibold text-foreground">Loser</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-muted-foreground">{battleViewData?.acceptedBy[0]?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground">{battleViewData?.acceptedBy[0]?.phone}</span>
            </div>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground p-2 rounded-t-lg ">
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
                ₹ {2*battleViewData?.amount-battleViewData?.recieve}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Refer Person</span>
              <span className="flex items-center">
                0
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Refer Commission</span>
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
              <span className={`flex items-center ${battleViewData?.status == 0 || battleViewData?.status == 1 ? "text-orange-300" : battleViewData?.status != "loss" ? "text-green-500" : "text-red-500"}`} onClick={() => clickToCopy(battleViewData?.status)}>
                {battleViewData?.status == 0 || battleViewData?.status == 1 ? "pending" : battleViewData?.status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-primary">
              <span className="text-muted-foreground">Joiner Result</span>
              <span className={`flex items-center ${battleViewData?.acceptedBy[0]?.status == 0 || battleViewData?.acceptedBy[0]?.status == 1 ? "text-orange-300" : battleViewData?.acceptedBy[0]?.status != "loss" ? "text-green-500" : "text-red-500"}`} onClick={() => clickToCopy(battleViewData?.acceptedBy[0]?.status)}>
                {battleViewData?.acceptedBy[0]?.status == 0 || battleViewData?.acceptedBy[0]?.status == 1 ? "pending" : (battleViewData?.acceptedBy[0]?.status)}
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
                {battleViewData?.status == "win" ? battleViewData?.name : battleViewData?.acceptedBy[0]?.name}
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

export default DisputeDetail
