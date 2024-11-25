'use client';
import Loading from '../../../components/Loading/Loading';
import FormNav from '../../../components/Navbar/FormNav';
import { ChevronsDown, MoveRight } from 'lucide-react';

import React, { useState } from 'react';

function Hero2() {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Loading />
  ) : (
    <div className="lg:pb-0 pb-10">
      <div className="2xl:min-h-[85vh] xl:min-h-[85vh] lg:mb-48 relative lg:pt-44 pt-20 pb-10 bg-[linear-gradient(180deg,rgba(0,19,20,1)30%,rgba(0,142,151,1)75%)]">
        <div className="container h-full flex items-center justify-center">
          <FormNav setLoading={setLoading} />
          <div className="absolute -bottom-32 container left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
            <div className="flex text-background items-center gap-2">
              <ChevronsDown size={18} />
              <h1 className="text-lg font-semibold text-center">Our Process</h1>
              <ChevronsDown size={18} />
            </div>
            <div className="w-full p-8 rounded-xl shadow-lg mt-4 bg-background lg:flex hidden gap-5">
              <div className="flex-1 relative ">
                <h1 className="absolute text-[8.5rem] -top-3 leading-none text-[#056a70ff] font-black opacity-30 -left-7 pl-5">
                  1
                </h1>

                <div className="flex items-center gap-3">
                  <MoveRight />
                  <h1 className="text-xl font-bold">Send</h1>
                </div>
                <p className="pl-7 mt-2">
                  Upload Document, enter signers and recipients, get ready
                  document for signature, and send to everyone.
                </p>
              </div>
              <div className="flex-1 relative ">
                <h1 className="absolute text-[8.5rem] -top-3 leading-none text-[#056a70ff] font-black opacity-30 -left-7 pl-5">
                  2
                </h1>
                <div className="flex items-center gap-2">
                  <MoveRight />
                  <h1 className="text-xl font-bold">Sign</h1>
                </div>
                <p className="pl-7 mt-2">
                  Each signer receives a secure signing link taking them to your
                  document. They sign from any device by 24x7
                </p>
              </div>
              <div className="flex-1 relative ">
                <h1 className="absolute text-[8.5rem] -top-3 leading-none text-[#056a70ff] font-black opacity-30 -left-7 pl-5">
                  3
                </h1>
                <div className="flex items-center gap-2">
                  <MoveRight />
                  <h1 className="text-xl font-bold">Manage</h1>
                </div>
                <p className="pl-7 mt-2">
                  Post completion signed documents are stored securely in your
                  easedraft account — you can also choose to export or delete
                  them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 lg:mt-20 lg:hidden">
        <div className=" container flex flex-col justify-center">
          <div className="flex justify-center">
            <ChevronsDown />
            <h1 className="text-xl font-semibold text-center">Our Process</h1>
            <ChevronsDown />
          </div>
          <div className="w-full relative lg:p-5 p-8 border rounded-xl shadow-lg mt-4 bg-background flex lg:flex-row flex-col lg:gap-5 gap-8">
            <div className="flex-1 relative ">
              <h1 className="absolute lg:text-[10.7rem] md:text-[8rem] text-[9rem] leading-none text-[#056a70ff] font-black opacity-30 -top-4 -left-3">
                1
              </h1>
              <div className="flex items-center gap-3">
                <MoveRight />
                <h1 className="text-xl font-bold">Send</h1>
              </div>
              <p className="pl-7 mt-2">
                Upload Document, enter signers and recipients, get ready
                document for signature, and send to everyone.
              </p>
            </div>
            <div className="flex-1 relative ">
              <h1 className="absolute lg:text-[10.7rem] md:text-[8rem] text-[9rem] leading-none text-[#056a70ff] font-black opacity-30 -top-4 -left-3">
                2
              </h1>
              <div className="flex items-center gap-2">
                <MoveRight />
                <h1 className="text-xl font-bold">Sign</h1>
              </div>
              <p className="pl-7 mt-2">
                Each signer receives a secure signing link taking them to your
                document. They sign from any device by 24x7
              </p>
            </div>
            <div className="flex-1 relative ">
              <h1 className="absolute lg:text-[10.7rem] md:text-[8rem] text-[9rem] leading-none text-[#056a70ff] font-black opacity-30 -top-4 -left-3">
                3
              </h1>
              <div className="flex items-center gap-2">
                <MoveRight />
                <h1 className="text-xl font-bold">Manage</h1>
              </div>
              <p className="pl-7 mt-2">
                Post completion signed documents are stored securely in your
                easedraft account — you can also choose to export or delete
                them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
