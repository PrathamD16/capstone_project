import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";
import axios from "axios";
import Modal from '@mui/material/Modal';
import UpdateFlight from './UpdateFlight';
import { Box, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const AdminFightTile = ({ flight, setTrigger, onDelete }) => {
  const nav = useNavigate();
  const { signedIn } = useContext(UserEmailContext);
  const [open, setOpen] = useState(false);

  // For updatation
  const [confirm, setConfirm]  = useState(false)
  // For deletion
  const [open2, setOpen2] = useState(false)

  // Opening and closing of first modal
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  // Open and close of delete modal
  const openModal2 = () => setOpen2(true)
  const closeModal2 = () =>  setOpen2(false)


  // Reloader
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    try {
      await onDelete(flight.id)
    }
    catch(err){
      console.log(err)
    }
    closeModal2()
    // setLoading(true)
    // setOpen2(false)
    // axios
    //   .delete(
    //     `http://localhost:5000/flight-service/api/admin/deleteMapping/${flight.id}`
    //   )
    //   .then(() => {
    //     setTrigger(pre => pre + 1)
    //     setTimeout(() => {
    //       nav("/admin/flightlist");
    //       setLoading(false)
    //     }, 1000)
    //   })
    //   .catch((err) => {});
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-md">
          <CircularProgress color="inherit" />
          <p className='mx-2'>Please wait..</p>
        </div>
      )}
      <div className={` bg-gray-200 shadow-lg p-3 rounded-2xl x-5 px-[1rem] hover:bg-gradient-to-t from-purple-200 to-blue-200 transition-transform duration-500 ease-in-out transform hover:scale-[95%]  py-8 scale-[90%]`}>
        <div className="flex justify-center mb-2">
          <h3 className="text-md font-semibold">
            Flight Name: <span className="font-mono text-xl"> {('\t',flight.name.toUpperCase())}</span>
          </h3>
        </div>

        <div className="flex justify-between items-center my-1">
          {/* LHS */}
          <div>
            <p>
              <span>
                Date:{" "}
                <span className="font-semibold">
                  {flight.dept_time.substring(0, 10)}
                </span>
              </span>
              <span className="text-xs"> (YYYY-MM-DD)</span>
            </p>
            <p>
              <span>
                Time:{" "}
                <span className="font-semibold">
                  {flight.dept_time.substring(11, 16)}
                </span>
              </span>
              <span className="text-xs"> HRS</span>
            </p>
          </div>
          {/* RHS */}
          <div className="space-y-3 px-5">
            <p>
              From:{" "}
              <span className="font-semibold">{flight.source.toUpperCase()}</span>
            </p>
            <p>
              To:{" "}
              <span className="font-semibold">
                {flight.destination.toUpperCase()}
              </span>
            </p>
            <p>
              Cost: <span className="font-semibold">{flight.cost}</span>
            </p>
            <p>Seats available: {flight.total_seats - flight.booked_seats}</p>
          </div>
          <div className="space-x-1">
              {signedIn ? (
                <>
                  <button
                    onClick={openModal2}
                    className="bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-900 hover:text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={openModal}
                    className="bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-900 hover:text-white"
                  >
                    Update
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
        </div>
      </div>
      <div>
        <Modal open={open} onClose={closeModal}>
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
          >
            <UpdateFlight flight={flight} closeModal={closeModal} />
          </Box>
        </Modal>
        <Modal open={open2} onClose={closeModal2}>
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
            className="space-y-3"
          >
            <div className="flex">
              <p className="items-center">Are you sure you want to delete the flight ?</p>
            </div>
            <div className="flex space-x-5">
              <Button onClick={deleteHandler} className="flex-1" variant="contained" color="error">Yes</Button>
              <Button onClick={closeModal2} className="flex-1" variant="contained" color="success">No</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AdminFightTile;
