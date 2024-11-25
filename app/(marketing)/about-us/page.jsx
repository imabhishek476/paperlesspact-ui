import Faq from 'components/Sections/Features/Faq';
import ContactForm from '../../../components/Forms/ContactForm/ContactForm';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  ChevronRightIcon,
  Linkedin,
  Mail,
  MoveRight,
  PhoneCall,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const aboutuspage = {
  hero: {
    title: [
      'Empowering Simplicity:',
      'Making Agreement ',
      'Management Effortless',
    ],
    description:
      'Every organization needs to manage their contracts. We remove every objection to achieve this.',
    banner: '/images/mainBanner.png',
  },
  feature: {
    features: [
      {
        icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/64b9936a77d89c5eac4146b8_chart-line-up.svg',
        title: 'Impact',
        description: 'We aim at making a difference.',
      },
      {
        icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/64b99446f8103f8d982f70ee_shield.svg',
        title: 'Reliable',
        description: 'We do what we promised.',
      },
      {
        icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/64b994a8e49bd627edac5328_users.svg',
        title: 'Accessible',
        description: 'The very basis of our software',
      },
    ],
  },
  whoweare: {
    title: 'Who we are',
    banner1: {
      link: 'https://plp-home-ui.s3.ap-south-1.amazonaws.com/homepage/61.png',
      width: 350,
      height: 350,
    },
    banner2: {
      link: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/64b99a85ad2e29a0403ec229_about-us-img-2-p-500.webp',
      width: 461,
      height: 402,
    },
    description: [
      'Founded in 2023, EaseDraft.com emerged in India as a pioneering SaaS company, delivering a 100% compliant and impeccably streamlined agreement management solution for businesses. Spearheaded by founders Sanjay Singh and Neeki Singh, EaseDraft began as a B2B consultancy, advising organizations on optimizing their agreement management strategies.',
      'Recognizing the escalating demand for centralized and automated agreement handling, the founders leveraged their extensive industry expertise to craft a cloud-based software solution. This transition birthed EaseDraft, an intuitive, AI-driven platform tailored to assist companies in consolidating, organizing, and digitally signing all agreements within a secure and compliant contract library.',
      'Since its inception, EaseDraft has evolved into a user-friendly, innovative automation tool, empowering enterprises to efficiently manage their agreements while ensuring security, compliance, and operational ease.',
    ],
    cta: 'Discover EaseDraft',
  },
  ourjourney: {
    timeline: [
      {
        year: 2016,
        title: 'Contractify is founded',
      },
      {
        year: 2018,
        title: 'Launch software',
      },
      {
        year: 2020,
        title: '1,3 million growth capital',
      },
      {
        year: 2022,
        title: 'AI assistant ADA',
      },
      {
        year: 2023,
        title: '100+ international clients',
      },
    ],
  },
  teams: {
    teams: [
      {
        name: 'Sanjay Singh',
        position: 'CEO',
        link: '/images/Sanjay-singh.jpeg',
        linkdin: 'https://www.linkedin.com/in/sksanjay',
      },
      {
        name: 'Neeki Singh',
        position: 'COO',
        link: '/images/Nikki-singh.jpeg',
        linkdin: 'https://www.linkedin.com/in/neeki-singh-aab812133',
      },
      {
        name: 'Ashok Paul Batra',
        position: 'Advisor',
        link: '/images/Ashok-batra.jpeg',
        linkdin: '',
      },
      {
        name: 'Ashish Prajapati',
        position: 'Frontend Team',
        link: '/images/Ashish.jpg',
        linkdin: 'https://www.linkedin.com/in/ashish-prajapati-205730216',
      },
      {
        name: 'Divyansh Malik',
        position: 'Frontend Team',
        link: '/images/Divyansh.jpg',
        linkdin: 'https://www.linkedin.com/in/divyansh-malik-668789233/',
      },
      {
        name: 'Basit Ansari',
        position: 'Backend Team',
        link: '/images/Basit.jpg',
        linkdin: 'https://www.linkedin.com/in/basit-ansari-848b2b1a4/',
      },
    ],
  },
};

function AboutUs() {
  return (
    <div>
      <section className="bg-gradient-to-r from-teal-400 to-purple-500 ">
        <div className="container flex">
          <div className="flex flex-col  gap-3 relative lg:pt-40 pb-20 pt-44 lg:min-h-[30vh] z-30 lg:pl-10">
            <h1 className="lg:text-5xl text-3xl font-semibold leading-[1.1]">
              {aboutuspage.hero.title[0]}{' '}
              <span className="text-white">{aboutuspage.hero.title[1]}</span>{' '}
              <span className="text-[#e86f3a]">
                {' '}
                {aboutuspage.hero.title[2]}
              </span>
            </h1>
            <p className="lg:w-[80%] text-white ">
              {aboutuspage.hero.description}
            </p>
          </div>
        </div>
      </section>
      <section className="pb-12 mt-8 mb-20 border-b">
        <div className="container">
          <div className="flex lg:flex-row flex-col gap-10 lg:mx-10 justify-between">
            {aboutuspage.feature.features.map((e, i) => {
              return (
                <div className="flex gap-5 lg:max-w-[350px]" key={i}>
                  <div className="p-5 flex items-center aspect-square border rounded-lg bg-gradient-to-r from-white to-accent">
                    <Image
                      alt="banner"
                      src={e.icon}
                      width={30}
                      height={30}
                      className="max-w-[72px] aspect-square"
                    ></Image>
                  </div>
                  <div className="flex flex-col justify-between">
                    <h3 className="text-xl font-bold">{e.title}</h3>
                    <p className="leading-[1.2] line-clamp-1">
                      {e.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mb-10 md:mb-32">
        <div className="container">
          <div className="flex lg:flex-row flex-col lg:gap-20 gap-5">
            <div className="w-full flex md:flex-row flex-col items-end gap-10">
              <Image
                alt="banner"
                src={aboutuspage.whoweare.banner1.link}
                width={aboutuspage.whoweare.banner1.width}
                height={aboutuspage.whoweare.banner1.height}
                className="w-full h-[92%] object-fill"
              ></Image>
              {/* <Image
                src={aboutuspage.whoweare.banner2.link}
                width={aboutuspage.whoweare.banner2.width}
                height={aboutuspage.whoweare.banner2.height}
                className="w-full aspect-[1/1.3] border rounded-lg object-cover"
              ></Image> */}
            </div>
            <div className="w-full relative top-10">
              <div className="md:w-4/5">
                <h1 className="font-bold text-2xl">
                  {aboutuspage.whoweare.title}
                </h1>
                <div className="flex flex-col gap-5 mt-5">
                  {aboutuspage.whoweare.description.map((e, i) => {
                    return <p key={i}>{e}</p>;
                  })}
                </div>
                <div className="flex justify-center md:justify-start my-10">
                  <Link href={'#contact'}>
                    <Button size="lg">{aboutuspage.whoweare.cta}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="container">
          <h1 className="text-center text-4xl font-bold">Meet our team</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5 mt-16 ">
            {aboutuspage.teams.teams.map((e, i) => {
              return (
                <div
                  key={i}
                  className="relative aspect-[1/1.2] border overflow-hidden object-cover rounded-md flex items-end"
                >
                  {e.linkdin && (
                    <Link
                      href={e?.linkdin}
                      className="w-8 z-30 aspect-square rounded-full bg-black/50 absolute top-4 left-4 flex items-center justify-center hover:bg-[#0a66c2] transition-all"
                    >
                      <Linkedin
                        size={16}
                        className="fill-background text-background "
                      />
                    </Link>
                  )}
                  <Image
                    alt="heroBanner5"
                    src={e.link}
                    width={500}
                    height={500}
                    className=" rounded-md h-full object-fill c w-full absolute "
                  ></Image>
                  <div className="w-full h-1/2 bg-gradient-to-t relative z-20 rounded-b-md from-black/50 to-transparent flex items-end p-5">
                    <div className="">
                      <h1 className="font-bold text-background">{e.name}</h1>
                      <p className="text-xs text-background">{e.position}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="relative aspect-[1/1.2] bg-primary border rounded-md flex flex-col justify-end p-5 gap-2 text-background">
              <h1 className="text-xl font-bold leading-tight">
                Your profile on this card?
              </h1>
              <Link
                href={'/about-us#contact'}
                className="pb-[1px] border-b w-fit"
              >
                Join the team
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-20" id="contact">
        <div className="container">
          <div className="lg:mx-20">
            <h1 className="text-6xl text-center font-bold">Contact Us</h1>
            <div className="flex lg:flex-row flex-col-reverse aspect-[1/.3] rounded-lg bg-primary mt-10">
              <div className="lg:w-2/6 lg:p-10 p-6 text-background flex flex-col justify-between">
                <h1 className="text-4xl font-black">Office</h1>
                <div className="">
                  <p className="text-lg font-semibold">
                    704, 7th floor, Palm Court, MG Road, Sec-16, Gurugram,
                    Haryana, 122007
                  </p>
                  <Link
                    href={'tel:+918920766203'}
                    className="flex items-center gap-3 mt-5"
                  >
                    <PhoneCall /> <p>+91-8920766203</p>
                  </Link>
                  <Link
                    href={'mailto:connect@easedraft.com'}
                    className="flex items-center gap-3 mt-3"
                  >
                    <Mail /> <p>connect@easedraft.com</p>
                  </Link>
                </div>
              </div>
              <div className="lg:w-4/6 overflow-hidden lg:rounded-r-lg rounded-t-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2353675484114!2d77.05225237570453!3d28.472457591331466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d196ba3b661e1%3A0x666e55c904209093!2sMatrix%20Enterprises!5e0!3m2!1sen!2sin!4v1701781851143!5m2!1sen!2sin"
                  style={{ border: 0, borderRadius: '' }}
                  className="w-full h-full aspect-video"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="mt-10 p-5 bg-accent rounded-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Faq/>
    </div>
  );
}

export default AboutUs;
