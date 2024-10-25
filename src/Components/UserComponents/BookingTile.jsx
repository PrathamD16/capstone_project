import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserEmailContext } from '../../Context/CredContext';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from "jspdf";
import QRCode from 'qrcode';
// import { QrCode } from "@mui/icons-material";

const BookingTile = ({ book, onDelete }) => {
  const nav = useNavigate();
  const { signedIn } = useContext(UserEmailContext);

  // useEffect(() => {
  //   console.log(book.bookingId);
  // }, [book.bookingId]);

  const deleteHandler = async () => {
    try {
      await onDelete(book.bookingId);
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };


  const downloadPdfOfTicket = async () => {
    try {
      const doc = new jsPDF();
      const title = "Passenger Details";
      const bookingDetails = `
      Booking ID: ${book.bookingId}
      Passenger Name: ${book.cname}
      Gender: ${book.gender}
      Contact: ${book.contact}
      `;
      const flightDetails = `
      Flight No: ${book.flightId}
      Name: ${book.name.toUpperCase()}
      From: ${book.source && book.source.toUpperCase()}
      To: ${book.destination && book.destination.toUpperCase()}
      Date Of Departure: ${book.dept_time.substring(0, 10)}
      Departure Time: ${book.dept_time.substring(11, 19)}
      Cost: Rs. ${book.cost}
      Status: ${book.status.toUpperCase()}
      `;

      const qrCodeValue = `${bookingDetails}${flightDetails}`;
      const qrCodeDataUrl = await QRCode.toDataURL(qrCodeValue);
      
      doc.setFontSize(16);
      doc.text(title, 10, 10);

      doc.setFontSize(16);
      doc.text("Booking Details:", 10, 20);
      doc.setFontSize(12);
      doc.text(bookingDetails, 10, 30);

      doc.setFontSize(16);
      doc.text("Flight Details:", 10, 70);
      doc.setFontSize(12);
      doc.text(flightDetails, 10, 80);

      // Add QR code image
      doc.addImage(qrCodeDataUrl, 'PNG', 150, 10, 50, 50);

      doc.save(`${book.bookingId}-${book.cname}.pdf`);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  return (
    signedIn && (
      <div className="flex flex-col md:flex-row justify-between items-center my-4 bg-white rounded-lg shadow-lg px-6 py-2 hover:shadow-xl transition-shadow duration-300">
        {/* Passenger details */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-lg font-bold mb-2 text-blue-700">Passenger Details</h2>
          <p className="mb-1">
            Booking ID: <span className="font-semibold">{book.bookingId}</span>
          </p>
          <p className="mb-1">
            Passenger Name:  <span className="font-semibold">{book.cname && book.cname.toUpperCase()}</span>
          </p>
          <p className="mb-1">
            Contact: <span className="font-semibold">{book.contact}</span>
          </p>
          <p className="mb-1">
            Gender: <span className="font-semibold">{book.gender}</span>
          </p>
        </div>

        {/* Flight Details */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-lg font-bold mb-2 text-blue-700">Flight Details</h2>
          <p className="mb-1">
            Flight No: <span className="font-semibold">{book.flightId}</span>
          </p>
          <p className="mb-1">
            Name: <span className="font-semibold">{book.name.toUpperCase()}</span>
          </p>
          <p className="mb-1">
            From: <span className="font-semibold">{book.source && book.source.toUpperCase()}</span>
          </p>
          <p className="mb-1">
            To:  <span className="font-semibold">{book.destination && book.destination.toUpperCase()}</span>
          </p>
          <p className="mb-1">
            Date Of Departure: <span className="font-semibold">{book.dept_time.substring(0, 10)} <span className="text-xs">(YYYY-MM-DD)</span></span>
          </p>
          <p className="mb-1">
            Departure Time: <span className="font-semibold">{book.dept_time.substring(11, 19)} <span className="text-xs">(HRS)</span></span>
          </p>
          <p className="mb-1">
            Cost: <span className="font-semibold">Rs. {book.cost}</span>
          </p>
          <p className="mb-1">
            <span className={`font-bold ${book.status === 'confirmed' ? `text-green-600` : `text-red-600`}`}>Status: {book.status.toUpperCase()}</span>
          </p>
        </div>

        {/* Functionality */}
        <div className="w-full md:w-auto flex justify-end space-x-5">
          <Button
            onClick={deleteHandler}
            color="error"
            variant="contained"
          >
            Delete
            <span><DeleteIcon /></span>
          </Button>
          <Button
            disabled={book.status === 'cancelled'}
            onClick={downloadPdfOfTicket}
            color="info"
            variant="contained"
          >
            Download
            <span><DownloadIcon /></span>
          </Button>
        </div>
      </div>
    )
  );
};

export default BookingTile;
