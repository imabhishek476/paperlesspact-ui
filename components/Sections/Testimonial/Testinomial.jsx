'use client';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { useMediaQuery } from '@mui/material';
import {
  ArrowRight,
  ChevronRight,
  MoveLeft,
  MoveRight,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

const testinomial = {
  topic: '💬 Testimonials',

  title: 'Take a look at easedraft.com wall of fame',
  reviews: [
    {
      startCount: 5,
      review:
        '"easedraft.com just brings me peace of mind on so many levels. The most important thing for me? Having everything conveniently located together and getting timely notifications for areas of concern. The cloud software also makes working from home a lot easier."',
      author: {
        profile: '/images/vakily-grey.png',
        name: 'Vivek K.',
        role: 'Management assistant',
      },
    },
    {
      startCount: 5,
      review: `"With easedraft.com, we've given our legal structure a strong foundation. All our contracts are managed in 1 place, we receive automatic termination date notifications and visibly reduce risks & costs. In less than 1,5h/week, we now manage contracts of over 200 branches!"`,
      author: {
        profile: '/images/ozybrains-grey.png',
        name: 'Kunal S.',
        role: 'Legal assistant',
      },
    },
    // {
    //   startCount: 5,
    //   review:
    //     '"The support given by the staff at Contractify is truly outstanding. For our project, they were accessible each and every day and the response time was super short. Contractify actively helps to find solutions. It must be said that this is very exceptional compared to other software implementers."',
    //   author: {
    //     profile:
    //       'https://assets-global.website-files.com/6006c42b2317af422dfb4a1f/6124fe09d1c6864b4c8e4a9b_Het-Poetsbureau-Trimmed.png',
    //     name: 'Elien V.',
    //     role: 'Het Poetsbureau',
    //   },
    // },
  ],
};

function Testinomial() {
  const { scrollRef, snapPointIndexes, next, prev } = useSnapCarousel();
  const isBelow990px = useMediaQuery((theme) => theme.breakpoints.down(990));
  return (
    <div className="md:pb-20 pb-10">
      <div className="container">
        <div className="flex justify-center">
          <Badge className="text-lg text-primary">{testinomial?.topic}</Badge>
        </div>
        <div className="flex justify-center mt-5">
          <h2 className="md:text-3xl text-2xl text-center md:w-1/2">
            {testinomial.title}
          </h2>
        </div>

        <div className="w-full md:aspect-[2/.6] aspect-[1/1.2] relative mt-16 border bg-accent md:rounded-2xl rounded-lg md:p-16 p-8">
          <div
            ref={scrollRef}
            className="flex overflow-hidden gap-[50px] overflow-x-scroll snap-x snap-mandatory"
          >
            {testinomial.reviews.map((e, i) => {
              return (
                <div
                  key={i}
                  className="w-full min-w-full md:min-w-[550px] aspect-[2/2.2] border bg-white rounded-lg"
                  style={{
                    scrollSnapAlign:
                      snapPointIndexes.has(i) && isBelow990px ? 'start' : '',
                  }}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="md:p-12 p-4">
                      <div className="flex">
                        {Array.apply(null, {
                          length: e.startCount,
                        }).map((e, i) => (
                          <Star
                            key={i}
                            size={28}
                            fill="#E59819"
                            className="text-background"
                          />
                        ))}
                      </div>
                      <p className="opacity-60 leading-relaxed md:my-5 my-2 line-clamp-5 md:line-clamp-none">
                        {e.review}
                      </p>
                      <Link
                        href={''}
                        className="md:text-lg font-semibold text-primary flex gap-3 items-center group"
                      >
                        Read the success story{' '}
                        <MoveRight className="relative group-hover:left-2 left-0 transition-all" />
                      </Link>
                    </div>
                    <div className="border-t">
                      <div className="md:p-12 p-4 flex items-start gap-3">
                        <Image
                          src={e.author.profile}
                          width={60}
                          height={40}
                          alt="client"
                          className="md:w-[70px] w-[45px] md:h-10 h-8"
                        ></Image>
                        <div className="">
                          <h3 className="font-bold md:text-base text-sm">
                            {e.author.name}
                          </h3>
                          <h4 className="opacity-60 text-xs">
                            {e.author.role}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="w-full min-w-full md:min-w-[550px] aspect-[2/1.5] border bg-white rounded-lg"
              style={{
                scrollSnapAlign: snapPointIndexes.has(
                  testinomial.reviews.length - 1
                )
                  ? 'start'
                  : '',
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="md:p-12 p-4 w-4/5">
                  <h1 className="md:text-3xl text-xl text-primary">
                    Want to achieve the same successes?
                  </h1>
                  <p className="md:text-lg text-sm mt-5">
                    Let’s chat & discuss your business case in a personal demo!
                  </p>
                </div>
                <div className="border-t md:p-12 p-4">
                  {/* <div className="md:p-12 p-4 flex items-start gap-3">
                    <Image
                      src={e.author.profile}
                      width={60}
                      height={40}
                      alt="client"
                      className="md:w-[70px] w-[45px] md:h-10 h-8"
                    ></Image>
                    <div className="">
                      <h3 className="font-bold md:text-base text-sm">
                        {e.author.name}
                      </h3>
                      <h4 className="opacity-60 text-xs">{e.author.role}</h4>
                    </div>
                  </div> */}
                  <Link href={'/about-us#contact'}>
                    <Button className="md:py-5 md:h-9 h-8 group">
                      Schedule a demo{' '}
                      <ChevronRight
                        size={18}
                        className="relative group-hover:left-2 left-0 transition-all"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex md:gap-5 gap-3 items-center md:right-16 md:bottom-4 bottom-3 w-full left-0 md:left-auto px-12 md:px-0 justify-between md:justify-normal md:w-fit">
            <MoveLeft
              size={38}
              onClick={prev}
              className="md:w-9 w-12 cursor-pointer hover:text-primary hover:scale-110 transition-all"
            />
            <MoveRight
              size={38}
              onClick={next}
              className="md:w-9 w-12 cursor-pointer text-primary hover:scale-110 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testinomial;
