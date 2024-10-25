import React from 'react'

const Coupon2 = () => {
    return (
        <div className="md:flex md:justify-around space-y-5 px-5 md:px-0 md:space-y-0 mt-10 md:mb-2">
            <div>
                <div className="bg-orange-100 p-6 rounded-lg shadow-md text-center hover:bg-orange-300 hover:transition-colors hover:duration-200 border-solid border-1 border-black">
                    <h3 className="text-xl font-semibold mb-2">10% Discount on Magic Pin</h3>
                    <p className="text-gray-700 mb-4">Use code MAGICPIN789</p>
                    <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200">Book Now</button>
                </div>
            </div>
            <div>
                <div className="bg-teal-100 p-6 rounded-lg shadow-md text-center hover:bg-teal-300 hover:transition-colors hover:duration-200 border-solid border-1 border-black">
                    <h3 className="text-xl font-semibold mb-2">25% Off on Group Bookings</h3>
                    <p className="text-gray-700 mb-4">Use code: GROUP25</p>
                    <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-200">Book Now</button>
                </div>
            </div>
            <div>
                <div className="bg-red-100 p-6 rounded-lg shadow-md text-center hover:bg-red-300 hover:transition-colors hover:duration-200 border-solid border-1 border-black">
                    <h3 className="text-xl font-semibold mb-2">Exclusive Student Discount</h3>
                    <p className="text-gray-700 mb-4">Use code: STUDENTEXCL</p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200">Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default Coupon2
