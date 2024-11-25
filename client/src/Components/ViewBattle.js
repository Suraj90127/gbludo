import React, { useEffect, useState } from "react";
import profile from "./Assets/Avatar2.png";
import vs from "./Assets/versus.png";
import money from "./Assets/global-rupeeIcon.png";
import google from "./Assets/android.jpg";
import apple from "./Assets/ios.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { playBet, setRoom, updateStatus } from "../store/reducer/gameReducer";
import { getUser } from "../store/reducer/authReducer";

const ViewBattle = () => {
  const { betlists, betInfoList, betplay } = useSelector((state) => state.bet);
  const { userDetail } = useSelector((state) => state.auth);
  const [matchStatus, setMatchStatus] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [reason, setReason] = useState("");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    const userInput = String(window.prompt("Please enter a room code."));
    if (userInput !== null) {
      // Check if the user didn't press Cancel
      setInputValue(String(userInput));
      const id = params.id;
      if (userInput.length == 8) {
        await dispatch(setRoom({ id, room: userInput })).then(() => {
          dispatch(playBet(params.id));
        });
      } else {
        alert("Room code must be 8 digits");
      }
    }
  };

  const submitStatus = async () => {
    const id = params.id;

    // Dispatch updateStatus action with formData
    await dispatch(updateStatus({ id, status, description })).then(
      (response) => {
        console.log("object", status);
        if (response?.payload?.success) {
          navigate("/");
          dispatch(getUser());
          alert(response?.payload?.message);
        } else {
          dispatch(getUser());
          alert(response?.payload?.message);
        }
        // navigate("/")  // You might want to uncomment this once debugging is done
      }
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setDescription(file);
  };

  const handleStatusChange = (event) => {
    setMatchStatus(event.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(playBet(params.id));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [inputValue, status]);

  const copyToClipCode = () => {
    navigator.clipboard
      .writeText(betplay?.room)
      .then(() => {
        alert("Invitation code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };
  return (
    <div>
      <div className="bg-card p-6 rounded-lg shadow-md max-w-md mx-auto mt-[70px]">
        <div className="flex items-center justify-around mb-4">
          <div className="text-center">
            <img
              className="w-12 h-12 rounded-full mx-auto"
              src={profile}
              alt="Player 1 avatar"
            />
            <p className="text-muted-foreground text-center text-[0.8rem]">
              {betplay && betplay?.name}
            </p>
          </div>
          <div className="text-center">
            <img
              undefinedhidden="true"
              alt="versus"
              src={vs}
              className="mx-auto w-8"
            />
          </div>
          <div className="text-center">
            <img
              className="w-12 h-12 rounded-full mx-auto"
              src={profile}
              alt="Player 2 avatar"
            />
            <p className="text-muted-foreground text-[0.8rem]">
              {betplay && betplay?.acceptedBy[0]?.name}
            </p>
          </div>
        </div>
        <div className="text-center mb-4 flex justify-center">
          <p className="text-muted-foreground flex gap-2">
            Playing for{" "}
            <span className="text-green-500 font-bold flex gap-1">
              <img src={money} alt="" className="w-[20px]" />
              {betplay && betplay?.amount}
            </span>
          </p>
        </div>
        <div className="bg-muted p-4 rounded-lg text-center mb-4">
          <p className="text-muted-foreground mb-2">Room Code</p>
          {betplay && betplay.room != null ? (
            <p className="text-[#0099ff] text-[1.5rem] font-bold mb-2">
              {betplay.room}
            </p>
          ) : userDetail && userDetail?.phone == betplay?.phone ? (
            <p className="text-[#0099ff] text-[1rem] font-bold mb-2">
              wait for room code{" "}
              <button
                className="bg-green-500 text-white py-1 px-2 rounded-lg mb-2"
                onClick={handleButtonClick}
              >
                SET ROOM CODE
              </button>
            </p>
          ) : (
            <p className="text-[#0099ff] text-[1rem] font-bold mb-2">
              wait for room code
            </p>
          )}
          <button
            className="bg-green-500 text-white py-1 px-2 text-[1rem] font-bold rounded-lg"
            onClick={() => copyToClipCode()}
          >
            COPY CODE
          </button>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            Play Gbludo in Ludo King App
          </p>
          <div className="flex justify-center space-x-4">
            <img src={google} className="w-[150px]" alt="Google Play" />
            <img src={apple} className="w-[150px]" alt="App Store" />
          </div>
        </div>
      </div>
      <div className="max-w-md mt-5 mx-auto bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold text-foreground mb-4">
          Game Rules
        </h2>
        <ul className="space-y-2">
          <li className="bg-background p-4 rounded border border-border text-foreground">
            Record every game while playing.
          </li>
          <li className="bg-background p-4 rounded border border-border text-foreground">
            For cancellation of game, video proof is necessary.
          </li>
          <li className="bg-background p-4 rounded border border-border text-foreground">
            50 Penalty will be charged for updating wrong result.
          </li>
          <li className="bg-background p-4 rounded border border-border text-foreground">
            25 Penalty will be charged for not updating result.
          </li>
        </ul>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 bg-gray-200 py-4 px-4 rounded-md">
          Match Status
        </h2>
        <div className="mb-4 p-4">
          <label className="mr-4">
            <input
              type="radio"
              value="won"
              checked={matchStatus === "won"}
              onChange={handleStatusChange}
              onClick={() => setStatus("win")}
              className="mr-1"
            />
            I Won
          </label>
          <label className="mr-4">
            <input
              type="radio"
              value="lost"
              checked={matchStatus === "lost"}
              onChange={handleStatusChange}
              onClick={() => setStatus("loss")}
              className="mr-1"
            />
            I Lost
          </label>
          <label>
            <input
              type="radio"
              value="cancel"
              checked={matchStatus === "cancel"}
              onChange={handleStatusChange}
              onClick={() => setStatus("cancel")}
              className="mr-1"
            />
            Cancel
          </label>
        </div>

        {matchStatus === "won" && (
          <div className="p-4 border rounded-md bg-gray-100">
            <input
              type="file"
              name="description"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />

            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={submitStatus}
            >
              Submit Result
            </button>
          </div>
        )}

        {matchStatus === "lost" && (
          <div className="p-4 border rounded-md bg-gray-100 text-center">
            <p className="mb-4">Best of luck next time, try again!</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => submitStatus()}
            >
              Submit Result
            </button>
          </div>
        )}

        {matchStatus === "cancel" && (
          <div className="p-4 border rounded-md bg-gray-100">
            <textarea
              className="w-full p-2 mb-4 border rounded"
              placeholder="Reason for cancellation"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={submitStatus}
            >
              Submit Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBattle;
