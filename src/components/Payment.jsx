import React from 'react';

const Payment = () => {
    return (
      <div className="bg-orange-200 pb-[2000px] text-center">
        <div className="mx-[100px]">
          <h1 className="text-7xl text-center py-[50px]">PAYMENT</h1>
          <img src="src/assets/images/qrcode.png" alt="" className="mx-auto my-[50px]" />
          <div className='my-[100px]'>
            <h4 className="text-xl font-semibold">
              Please send an email with your reference number to
              mrmmuhdamir@gmail.com
            </h4>
            <h4 className="text-xl font-semibold">
              Please give us up to 24h to verify and we will get back to you
              shortly
            </h4>
          </div>
        </div>
      </div>
    );
};

export default Payment;