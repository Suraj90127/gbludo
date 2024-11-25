import React, { useEffect, useState } from 'react';
import img1 from '../../Components/Assets/17187117675.jpg';
import img2 from '../../Components/Assets/17187111885.jpg';
import img3 from '../../Components/Assets/17187106486.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminGames, adminGamesDelete, adminGamesUpdate, adminGamesView, adminSetting } from '../../store/reducer/adminReducer';
import Swal from 'sweetalert2';

const Games = () => {
  const { adminSettingData, successMessage, errorMessage, adminSettingDataGame } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [gimage, setImage] = useState(null);
  const [status, setStatus] = useState(1);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const initialGames = [
    { id: 'game_1209', name: 'COMING SOON', image: img1, status: 'De-activate' },
    { id: 'game_8365', name: 'COMING SOON', image: img2, status: 'De-activate' },
    { id: 'game_9934', name: 'Ludo Classic 2', image: img3, status: 'Active' },
    // Add more games as needed
  ];

  const [games, setGames] = useState(initialGames);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('gimage', gimage);
    formData.append('gname', name);
    formData.append('gstatus', status);
    dispatch(adminGames(formData)).then(() => {
      alert(successMessage);
    }).catch(() => {
      alert(errorMessage);
    });
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleEditClick = (id) => {
    setShowPopup(true);
    dispatch(adminGamesView(id)).then(() => {
      dispatch(adminSetting());
      if (adminSettingDataGame) {
        setName(adminSettingDataGame?.gname);
        setStatus(adminSettingDataGame?.gstatus);
        setId(adminSettingDataGame?._id);
      }
    });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('gimage', gimage);
    formData.append('gname', name);
    formData.append('gstatus', status);

    dispatch(adminGamesUpdate({id,formData})).then(() => {
      alert(successMessage);
      setShowPopup(false)
      dispatch(adminSetting());
    }).catch(() => {
      alert(errorMessage);
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete',
      text: `Are you sure you want delete`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(adminGamesDelete(id)).then(() => {
          dispatch(adminSetting());
        }).catch(() => {
          alert(errorMessage);
        });
      } else if (result.isDismissed) {
        console.log('Cancelled');
      }
    });
  };

  // Filter games based on the search term
  const filteredGames = games?.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(adminSetting());
  }, [dispatch, adminSettingDataGame?.length]);

  return (
    <>
      <div className='flex flex-col'>
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Add Game</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                id="image"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={1}>Active</option>
                <option value={2}>De-Active</option>
              </select>
            </div>
          </form>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="p-4 w-[100%]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Games</h1>
            <Link to="/add-game">
              <button className="bg-[[#4e73df]] text-white px-4 py-2 rounded-lg">Add Game</button>
            </Link>
          </div>
          <div className="flex justify-between flex-wrap items-center mb-4">
            <p className="text-[[#4e73df]]">
              ALL GAMES
            </p>
            <div className="flex items-center">
              <label htmlFor="search" className="mr-2">
                Search:
              </label>
              <input
                id="search"
                type="text"
                className="border border-zinc-300 rounded p-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
            <table className="min-w-full bg-white border border-zinc-300">
              <thead>
                <tr>
                  <th className="border border-zinc-300 px-4 py-2">#</th>
                  <th className="border border-zinc-300 px-4 py-2">ID</th>
                  <th className="border border-zinc-300 px-4 py-2">Name</th>
                  <th className="border border-zinc-300 px-4 py-2">Image</th>
                  <th className="border border-zinc-300 px-4 py-2">Status</th>
                  <th className="border border-zinc-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
              {adminSettingData?.[0]?.game?.length > 0 &&
  adminSettingData[0].game.map((game, index) => (
                  <tr key={index}>
                    <td className="border border-zinc-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-zinc-300 px-4 py-2">{game?._id}</td>
                    <td className="border border-zinc-300 px-4 py-2">{game?.gname}</td>
                    <td className="border border-zinc-300 px-4 py-2">
                      <img src={game?.gimage} alt={`Game Image ${index + 1}`} className="w-[100px] h-[100px]" />
                    </td>
                    <td className={`border border-zinc-300 px-4 py-2 ${game?.gstatus == 1 ? 'text-green-500' : 'text-red-500'}`}>
                      {game.gstatus == 1 ? "Active" : "De-active"}
                    </td>
                    <td className="border border-zinc-300 px-4 py-2">
                      <button className="bg-teal-500 text-white px-2 py-1 rounded mr-2">View</button>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEditClick(game._id)}>Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleDelete(game._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg md:w-[500px] sm:w-[300px]">
                <h2 className="text-xl font-semibold mb-4">Edit Game</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      id="image"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      id="status"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={1}>Active</option>
                      <option value={2}>De-Active</option>
                    </select>
                  </div>
                </form>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() => setShowPopup(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                    onClick={handleUpdate}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Games;
