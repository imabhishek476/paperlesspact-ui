import Image from 'next/image';
import React from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

function Footer({ footer }) {
  const links2 = [
    {
      title: 'Discover our vacancies',
      slug: '',
    },
    {
      title: 'Press page',
      slug: '',
    },
  ];

  return (
    <footer>
      <div className="container">
        <div className="flex items-start justify-between lg:flex-row flex-col gap-5">
          <div className="lg:w-1/4">
            <div className="flex items-center">
              <Link href={'/'}>
                <Image
                  src={'/images/logo-light.png'}
                  width={394}
                  height={76}
                  alt="logo"
                  className="w-52 relative lg:-left-3"
                ></Image>
              </Link>
              {footer.badge && (
                <Badge className={'rounded-md bg-[#e4f6f1] text-primary'}>
                  {footer.badge}
                </Badge>
              )}
            </div>
            <p className="mt-5">{footer?.description}</p>
          </div>
          <ul className="flex flex-col gap-1 ">
            {footer.links
              .filter((fil) => fil.title !== 'Features')
              .map((e, i) => (
                <li key={i} className="lg:block hidden">
                  <Link href={e?.slug}>{e?.title}</Link>
                </li>
              ))}
            {footer?.links2.map((e, i) => (
              <li key={i} className="lg:block hidden">
                <Link href={e?.slug}>{e?.title}</Link>
              </li>
            ))}
            {footer?.links3?.map((e, i) => (
              <li key={i} className="">
                <Link href={e?.slug}>{e?.title}</Link>
              </li>
            ))}
          </ul>
          <div className="w-[26%] lg:inline hidden">
            <h1 className="font-bold text-lg">Contact Us -</h1>
            <h2 className="font-bold">{footer.address[0]?.description}</h2>
            <address>{footer.address[0].address}</address>
            <h3 className="mt-3">
              <Link href={`mailto:${footer.address[0].contact.split(' ')[0]}`}>
                {footer.address[0].contact.split('/')[0]}
              </Link>{' '}
              <br />
              <Link href={`tel:${footer.address[0].contact.split(' ')[1]}`}>
                {footer.address[0].contact.split('/')[1]}
              </Link>
            </h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center py-8 gap-2">
          <p>{footer.bottomNav.copyright}</p>
          <p className="hidden lg:block">{footer.bottomNav.finalMsg}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
