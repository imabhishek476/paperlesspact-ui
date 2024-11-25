import { Badge } from '../../../components/ui/badge';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function UseCases({ usecases }) {
  return (
    <div className="lg:py-20 py-10">
      <div className="container">
        <div className="flex justify-center">
          <Badge className="text-lg text-primary">{usecases.topic}</Badge>
        </div>
        <div className="flex justify-center mt-5">
          <h2 className="lg:text-3xl text-2xl text-center lg:w-1/2">
            {usecases.title}
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-10 lg:mx-10">
          <Link
            href="/about-us#contact"
            className={`bg-[#f3fcf8] lg:aspect-[9/10] relative flex lg:rounded-md rounded-3xl border border-green-100 lg:flex-col flex-row-reverse lg:justify-between items-center justify-end gap-5 overflow-hidden group`}
          >
            <div className="flex gap-1 items-center lg:mx-auto">
              <h3 className="text-xl font-bold py-10 ">
                {usecases.links[0].title}
              </h3>
              <ChevronRightIcon size={18} />
            </div>
            <Image
              src={
                'https://plp-home-ui.s3.ap-south-1.amazonaws.com/homepage/58.png'
              }
              width={200}
              height={200}
              alt="modal"
              className="lg:w-4/5 w-1/4 rounded-b-md lg:absolute object-cover lg:right-1/2 left-0 lg:left-auto lg:translate-x-1/2 bottom-0 group-hover:scale-110 transition-all"
            ></Image>
          </Link>
          <Link
            href="/about-us#contact"
            className={`bg-[#fff8ec] lg:aspect-[9/10] relative flex lg:rounded-md rounded-3xl border border-orange-100 lg:flex-col flex-row-reverse lg:justify-between items-center justify-end gap-5 overflow-hidden group`}
          >
            <div className="flex gap-1 items-center lg:mx-auto">
              <h3 className="text-xl font-bold py-10 ">
                {usecases.links[1].title}
              </h3>
              <ChevronRightIcon size={18} />
            </div>
            <Image
              src={
                'https://plp-home-ui.s3.ap-south-1.amazonaws.com/homepage/59.png'
              }
              width={200}
              height={200}
              alt="modal"
              className="lg:w-4/5 w-1/4 rounded-b-md lg:absolute lg:right-1/2 left-0 lg:left-auto lg:translate-x-1/2 bottom-0 group-hover:scale-110 transition-all"
            ></Image>
          </Link>
          <Link
            href="/about-us#contact"
            className={`bg-[#f0f9fc] lg:aspect-[9/10] relative flex lg:rounded-md rounded-3xl border border-blue-100 lg:flex-col flex-row-reverse lg:justify-between items-center justify-end gap-5 overflow-hidden group`}
          >
            <div className="flex gap-1 items-center lg:mx-auto">
              <h3 className="text-xl font-bold py-10 ">
                {usecases.links[2].title}
              </h3>
              <ChevronRightIcon size={18} />
            </div>
            <Image
              src={
                'https://plp-home-ui.s3.ap-south-1.amazonaws.com/homepage/60.png'
              }
              width={200}
              height={200}
              alt="modal"
              className="lg:w-4/5 w-1/4 rounded-b-md lg:absolute lg:right-1/2 left-0 lg:left-auto lg:translate-x-1/2 bottom-0 group-hover:scale-110 transition-all"
            ></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UseCases;
