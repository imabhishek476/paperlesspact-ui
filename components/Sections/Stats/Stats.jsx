import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const clients = [
  {
    clientLogo: '/images/lawinzo-grey.png',
    width: 100,
    height: 50,
    link: '',
  },
  {
    clientLogo: '/images/arradam-grey.png',
    width: 100,
    height: 50,
    link: '',
  },
  {
    clientLogo: '/images/zyotshi-grey.png',
    width: 100,
    height: 50,
    link: '',
  },
  {
    clientLogo: '/images/ozybrains-grey.png',
    width: 100,
    height: 55,
    link: '',
  },
  {
    clientLogo: '/images/vakily-grey.png',
    width: 80,
    height: 40,
    link: '',
  },
  // {
  //   clientLogo:
  //     'https://assets-global.website-files.com/6006c42a42689f444d860a2a/639a2fff59e94687195f09fd_Fortinop-logo-dark-social-p-500.webp',
  //   width: 86,
  //   height: 45,
  //   link: '',
  // },
  // {
  //   clientLogo:
  //     'https://assets-global.website-files.com/6006c42a42689f444d860a2a/63f61c65d64b21691ba13aba_cropped-cropped-Logo-3-RAAL-bord-blanc.webp',
  //   width: 45,
  //   height: 45,
  //   link: '',
  // },
  // {
  //   clientLogo:
  //     'https://assets-global.website-files.com/6006c42a42689f444d860a2a/61939e6e34b64593ab90ca7a_Logo-PMV-Trimmed.webp',
  //   width: 62,
  //   height: 30,
  //   link: '',
  // },
];

function Stats({ stats }) {
  console.log(stats);
  return (
    <div className="lg:py-20 py-10">
      <div className="container">
        <p className="text-center">{stats.title}</p>
      </div>
      <div className="py-8">
        <div className="container lg:flex lg:justify-center">
          <div className="lg:flex lg:flex-row grid grid-cols-2 gap-10 items-center justify-between lg:w-4/5">
            {clients.map((e, i) => {
              return (
                <Link
                  href={e.link ? e.link : ''}
                  key={i}
                  className="flex lg:justify-start justify-center items-center"
                >
                  <Image
                    src={e.clientLogo}
                    width={e.width}
                    alt={'client'}
                    height={e.height}
                    className="grayscale"
                  ></Image>
                </Link>
              );
            })}
            <Link
              href={'/about-us#contact'}
              className="flex relative items-center gap-1 lg:justify-start justify-center font-bold text-primary"
            >
              {stats.cta1} <ChevronRightIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
