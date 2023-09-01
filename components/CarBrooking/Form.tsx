import React, { useState, useEffect } from "react";
import { getStoreLocations } from "@/gql";
import { createBooking } from "@/gql";
import { BookCreatedFlagContext } from "@/context/BookCreatedFlagContext";
import { useContext } from "react";

const Form = ({ car }: any) => {
  const [storeLocation, setStoreLocation] = useState<any>([]);
  const { showToastMsg, setShowToastMsg } = useContext(BookCreatedFlagContext);
  const [formValue, setFormValue] = useState({
    location: "",
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
    contactNumber: "",
    userName: "Axel",
    carId: "",
  });

  useEffect(() => {
    getStoreLocation_();
  }, []);

  useEffect(() => {
    if (car) {
      setFormValue({
        ...formValue,
        carId: car.id,
      });
    }
  }, [car]);

  const getStoreLocation_ = async () => {
    const resp: any = await getStoreLocations();
    setStoreLocation(resp?.storesLocations);
  };

  const handleChange = (event: any) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const resp = await createBooking(formValue);
      if (resp) {
        setShowToastMsg(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setShowToastMsg(false);
      }, 3000);
      formValue.location = "";
      formValue.pickUpDate = "";
      formValue.dropOffDate = "";
      formValue.pickUpTime = "";
      formValue.dropOffTime = "";
      formValue.contactNumber = "";
      formValue.userName = "";
      formValue.carId = "";
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full mb-5">
        <label className="text-gray-600">PickUp Location</label>
        <select
          className="select select-bordered bg-[#343a40] text-white w-full max-w-lg"
          name="location"
          onChange={handleChange}
        >
          <option disabled selected>
            PickUp Location?
          </option>
          {storeLocation &&
            storeLocation.map((loc: any, index: number) => (
              <option key={index}>{loc?.address}</option>
            ))}
        </select>
      </div>
      <div className="flex flec-col gap-5 mb-5">
        <div className="flex flex-col w-full">
          <label className="text-gray-600">Pick Up Date</label>
          <input
            type="date"
            //   min={today}
            onChange={handleChange}
            placeholder="Type here"
            name="pickUpDate"
            className="input input-bordered bg-[#343a40] text-white w-full max-w-lg"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-600">Drop Off Date</label>
          <input
            type="date"
            onChange={handleChange}
            placeholder="Type here"
            name="dropOffDate"
            className="input input-bordered bg-[#343a40] text-white w-full max-w-lg"
          />
        </div>
      </div>
      <div className="flex gap-5 ">
        <div className="flex flex-col w-full mb-5">
          <label className="text-gray-600">Pick Up Time</label>
          <input
            type="time"
            onChange={handleChange}
            name="pickUpTime"
            placeholder="Type here"
            className="input input-bordered bg-[#343a40] text-white w-full max-w-lg"
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <label className="text-gray-600">Drop Off Time</label>
          <input
            type="time"
            name="dropOffTime"
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered bg-[#343a40] text-white w-full max-w-lg"
          />
        </div>
      </div>

      <div className="flex flex-col w-full mb-5">
        <label className="text-gray-600">Contact Number</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={handleChange}
          name="contactNumber"
          className="input input-bordered bg-[#343a40] text-white w-full max-w-lg"
        />
      </div>
      <div className="modal-action">
        <button className="btn text-white">Close</button>
        <button
          className="btn border-none bg-blue-500 text-white hover:bg-blue-800"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;
