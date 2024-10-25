import React from 'react'

const Coupon1 = () => {
    return (
        <div>
            <div className="md:flex md:justify-around space-y-5 px-5 md:px-0 md:space-y-0 mt-10">
                <div>
                    <div className="bg-lime-100 p-6 rounded-lg shadow-md text-center hover:bg-lime-300 hover:transition-colors hover:duration-200">
                        <h3 className="text-xl font-semibold mb-2">Save 20% on Domestic Flights</h3>
                        <p className="text-gray-700 mb-4">Use code: SPARTAN20</p>
                        <button className="bg-lime-600 text-white py-2 px-4 rounded-lg hover:bg-lime-700 transition duration-200">Book Now</button>
                    </div>
                </div>
                <div>
                    <div className="bg-green-100 p-6 rounded-lg shadow-md text-center hover:bg-green-300 hover:transition-colors hover:duration-200">
                        <h3 className="text-xl font-semibold mb-2">Get $50 off on International Flights</h3>
                        <p className="text-gray-700 mb-4">Use code: INTL50</p>
                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200">Book Now</button>
                    </div>
                </div>
                <div>
                    <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center hover:bg-yellow-300 hover:transition-colors hover:duration-200">
                        <h3 className="text-xl font-semibold mb-2">15% Cashback on Early Bookings</h3>
                        <p className="text-gray-700 mb-4">Use code: EARLY15</p>
                        <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-200">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coupon1
