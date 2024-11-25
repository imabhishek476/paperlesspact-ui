import { Button } from '../../../components/ui/button';
import { Check, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { list } from 'postcss';
import React from 'react';

function Feature({ feature, reverse }) {
  console.log(reverse);
  return (
    <div className="lg:py-20 py-10">
      <div className="container">
        <div className="lg:mx-10">
          <div
            className={`flex flex-col gap-5 lg:gap-0 lg:flex-row
                 ${reverse && reverse === true ? 'lg:flex-row-reverse ' : ''}`}
          >
            <div className="w-full">
              <Image
                src={feature.img}
                width={488}
                height={222}
                alt="feature img"
              ></Image>
            </div>
            <div className="w-full">
              <div className="lg:w-4/5">
                <h3 className="lg:text-3xl text-2xl lg:my-3 my-1">
                  {feature.title}
                </h3>
                <ul className="flex flex-col lg:gap-5 gap-3 lg:mt-8 mt-4">
                  {feature.list.map((e, i) => {
                    return (
                      <li className="flex gap-2" key={i}>
                        <Check className="text-primary" size={28} />
                        <p className="text-lg">{e}</p>
                      </li>
                    );
                  })}
                </ul>
                <Link href="/about-us#contact">
                  <Button className="gap-3 mt-5 group" variant="link">
                    Discover More Features{' '}
                    <MoveRight className="relative left-0 group-hover:left-3 transition-all" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
