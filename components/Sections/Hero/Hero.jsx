import { Button } from '../../../components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React from 'react';

function Hero({ herosection }) {
  return (
    <section className="min-h-screen flex items-stretch">
      <Image
        src={'/images/background.png'}
        width={160}
        height={77}
        alt="hero img"
        className="w-full min-h-screen absolute"
      ></Image>
      <div className="container relative z-10">
        <div className="flex lg:flex-row flex-col-reverse lg:items-center justify-center pt-10 lg:pt-20 lg:gap-10 gap-12 h-full">
          <div className="w-full lg:mb-20">
            <h1 className="lg:text-4xl text-2xl">
              <span className="text-primary">
                {herosection.title.titlespan}
              </span>{' '}
              {herosection.title.h1}{' '}
              <span className="overflow-hidden inline-block lg:h-[49px] h-[42px] duration-75 mb-3 lg:mb-0 relative top-4">
                <span
                  style={{
                    transform:
                      'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                    animation: 'slideAndReturn 4s infinite',
                  }}
                  className="relative  flex flex-col gap-0.5 "
                >
                  {herosection.title.carousel.map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </span>
              </span>{' '}
              <br />
              {/*  */}
              {herosection.title.h2}
            </h1>
            <div className="lg:text-xl text-sm text-primary font-semibold bg-accent mt-5 border px-6 rounded-full py-2 w-fit">
              {herosection.badge}
            </div>
            <p className="my-5 lg:text-xl text-sm">{herosection.description}</p>
            <div className="flex lg:flex-row flex-col gap-3">
              <Button size="lg" className="group py-6 text-base">
                {herosection.cta1}{' '}
                <ChevronRightIcon className="relative left-0 group-hover:left-2 transition-all" />
              </Button>
              <Button variant="secondary" size="lg" className="py-6 text-base">
                {herosection.cta2}
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-end relative lg:mb-20">
            <Image
              src={herosection.bannerImg1}
              width={160}
              height={90}
              alt="hero img"
              className="lg:w-4/5 w-full lg:h-full h-[110%] border rounded-md"
            ></Image>
            <Image
              src={herosection.bannerImg2}
              width={160}
              height={90}
              alt="hero img"
              className="w-2/4 absolute -bottom-20 left-0 hidden lg:inline"
            ></Image>
            {/* <Image
              src={'/images/heroImage.png'}
              width={30}
              height={30}
              className="w-10 absolute -bottom-20 left-0"
            ></Image> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
