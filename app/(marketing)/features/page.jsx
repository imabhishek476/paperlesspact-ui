import Feature2 from '../../../components/Sections/Features/Feature2';
import Stats from '../../../components/Sections/Stats/Stats';
import TestimonialWrapper from '../../../components/Sections/Testimonial/TestimonialWrapper';
import Testinomial from '../../../components/Sections/Testimonial/Testinomial';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// const feature = {
//   heroSection: {
//     title: 'Everything you need for intelligent contract management',
//     description:
//       'Never miss an opportunity or automatic renewal again. Get on board & monetize the full value of your contracts with contract automation & artificial intelligence.',
//     cta1: 'Schedule demo',
//     cta2: 'Start free trial',
//     banner:
//       'https://assets-global.website-files.com/6006c42a42689f444d860a2a/644fb05b00834d252fce5a99_flow-desktop-eng-p-2000.webp',
//   },
//   featureBlock: {
//     badge:
//       'https://assets-global.website-files.com/6006c42a42689f444d860a2a/631972b222c9cd6d56499c56_Logo-ada.svg',
//     title: 'Get contracts digitalized in under 5 seconds',
//     banner:
//       'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331cdaac41b200dde79ffa1_ada-graphic.webp',
//     description:
//       'ADA, our AI contract data analyst, extracts contract data from any contract PDF, including the general terms & conditions and addenda.',
//     list: [
//       '➡️ Contracts are analysed & digitalised up to 3x faster.',
//       "➡️ Every contract is summarized, so you always know what it's about.",
//       "➡️ Artificial intelligence makes sure you won't overlook important deadlines.",
//     ],
//   },
//   features: {
//     blocks: [
//       {
//         img: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/61939c9079a93462f8d07d96_dossiers_screenshot.webp',
//         badge: 'Contract overview and summaries',
//         title:
//           'Centralize all your contracts and agreements in one smart & secure space.',
//         list: [
//           'Track each document’s status, start date & renewal date in 1 overview.',
//           'Know what is in your contracts with a glance at contract summaries',
//           'Find any document through powerful contract filters',
//         ],
//       },
//       {
//         img: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/60ed4e5f58ae305952ad46c0_hero-img-1-p-800.webp',
//         badge: 'Automated tasks and notifications',
//         title: 'Automatically delegate & follow up contract actions.',
//         list: [
//           'Collaborate on contracts with customisable approval flows checkmark',
//           'Log any changes with version control & built-in communication checkmark',
//           'Proactively follow up on contracts with automated e-mail notifications',
//         ],
//       },
//       {
//         img: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/61939c5c71e556839e153e21_signing_flow_dark_green.png',
//         badge: 'E-signing',
//         title: 'Sign contracts faster online with digital signatures.',
//         list: [
//           'Improve security with legally binding digital signatures checkmark',
//           'Track your signing statuses & send reminders with approval flows checkmark',
//           'Work more fluently with contracts ready for follow-up right after signing checkmark',
//           'Integrated Connective & DocuSign e-signing',
//         ],
//         cta: 'Get started with e-signing',
//       },
//     ],
//   },
//   MoreFeatures: {
//     title: 'More features',
//     cards: [
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/611bc34738a9ac5f8df02447_user_icon.svg',
//         title: 'User management & permissions',
//         list: [
//           'Keep all team members aligned on one shared platform',
//           'Control who gets to see what with access rights',
//           'Assign team managers',
//         ],
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/60ee9a635628ed7c8e15ff21_Execution.svg',
//         title: 'Dashboards & reporting',
//         list: [
//           'Keep all team members aligned on one shared platform',
//           'Control who gets to see what with access rights',
//           'Assign team managers',
//         ],
//       },
//     ],
//   },
//   CtaBlock: {
//     banner:
//       'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6193864ac5511922fdb9a3cb_cta-mockup.webp',
//     title: 'Prefer a personal product tour? Let our experts guide you.',
//     cta: 'Schedule product tour',
//   },
//   applications: {
//     title: 'Smarter contract management for all teams',
//     applications: [
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6332cc00a96edc756ff0e1a4_icon-legal.svg',
//         title: 'Legal',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f400502ff7435d192306_icon-chart.svg',
//         title: 'Finance',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f4019d4e447248dc4e3e_icon-sales.svg',
//         title: 'Sales',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f401084a705644c3b4bc_icon-star.svg',
//         title: 'Management',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f401f50dea6d14d0da9f_icon-hr.svg',
//         title: 'HR',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f4010292d0883996823d_icon-pm.svg',
//         title: 'Project Management',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f40167a79f3abc501ac6_icon-it.svg',
//         title: 'IT',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f40071113a887ce70f97_icon-home.svg',
//         title: 'Facility',
//       },
//       {
//         icon: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331f40154302c3480a45dcb_icon-plus.svg',
//         title: 'Many More',
//       },
//     ],
//   },
//   clients: {
//     title: 'Intelligent contract management software for industry leaders',
//     clients: [
//       {
//         img: '/images/producthunt.svg',
//         width: 167,
//         height: 54,
//       },
//       {
//         img: '/images/capterra.svg',
//         width: 153,
//         height: 50,
//       },
//       {
//         img: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6375f421aaf428c12cf6f9d6_Software%20advice%20badge.png',
//         width: 178,
//         height: 68,
//       },
//       {
//         img: 'https://assets-global.website-files.com/6006c42a42689f444d860a2a/637601f426974192e419809f_ELTA_Logo_C_Web.webp',
//         width: 168,
//         height: 95,
//       },
//     ],
//   },
//   finalCta: {
//     title:
//       'Get started with smarter contract management for only € 147 per month',
//     cta: {
//       cta1: {
//         title: 'Start for free',
//         link: '/',
//       },
//       cta2: {
//         title: 'View pricing',
//         link: '/',
//       },
//     },
//   },
// };

async function featurePage() {
  const data = await fetch(
    'https://plp-home-ui.s3.ap-south-1.amazonaws.com/landingpage.json',
    { cache: 'no-store' }
  );
  const data2 = await fetch(
    'https://plp-home-ui.s3.ap-south-1.amazonaws.com/featurepage.json',
    { cache: 'no-store' }
  );
  const feature = await data2.json();
  const document = await data.json();
  return (
    <div>
      <section className="min-h-screen lg:pt-20 pt-32 flex flex-col items-center lg:justify-center">
        <div className="container flex flex-col items-center">
          <h1 className="lg:text-6xl text-4xl text-center lg:mx-20 mx-2 font-semibold">
            {feature.heroSection.title}
          </h1>
          <p className="text-center lg:w-3/5 mt-5 text-lg">
            {feature.heroSection.description}
          </p>
          <div className="mt-10 flex lg:flex-row flex-col w-full lg:w-fit gap-5">
            <Button
              size="lg"
              className="relative top-0 py-6 hover:-top-1 transition-all duration-700 font-bold"
            >
              {feature.heroSection.cta1}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="relative top-0 py-6 hover:-top-1 transition-all duration-700 font-bold"
            >
              {feature.heroSection.cta2}
            </Button>
          </div>
        </div>
        <div className="container hidden lg:block">
          <Image
            src={feature.heroSection.banner}
            width={100}
            height={27}
            alt=""
            className="w-full px-32"
          ></Image>
        </div>
        <div className="container lg:hidden">
          <Image
            src={
              'https://assets-global.website-files.com/6006c42a42689f444d860a2a/644fb06ca47311431323203d_flow-mobile-en.webp'
            }
            width={300}
            height={81}
            alt=""
            className="w-full p-10 my-10 bg-green-100 rounded-lg"
          ></Image>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="lg:mx-20 lg:p-16 p-6 rounded-3xl bg-[url('https://assets-global.website-files.com/6006c42a42689f444d860a2a/6332ca1f56d3aac77db9890e_gradient-bg-light.webp')]">
            <div className="flex lg:flex-row flex-col gap-5 lg:gap-0 items-center">
              <div className="w-full">
                <div className="flex gap-2">
                  <Image
                    alt=""
                    src={feature.featureBlock.badge}
                    width={64}
                    height={28}
                  ></Image>
                  <Badge variant={'default'}>New</Badge>
                </div>
                <h1 className="lg:text-3xl text-2xl font-bold lg:w-4/5 mt-5">
                  {feature.featureBlock.title}
                </h1>
                <p className="w-[90%] mt-5">
                  {feature.featureBlock.description}
                </p>
                <ul className="flex flex-col gap-3 mt-5">
                  {feature.featureBlock.list.map((e, i) => {
                    return <li key={i}>{e}</li>;
                  })}
                </ul>
                <Link herf="/about-us#contact">
                  <Button className="gap-3 mt-5 group px-0" variant="link">
                    Discover More Features{' '}
                    <MoveRight className="relative left-0 group-hover:left-3 transition-all" />
                  </Button>
                </Link>
              </div>
              <Image
                alt=""
                src={
                  'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6331cdaac41b200dde79ffa1_ada-graphic.webp'
                }
                width={200}
                height={200}
                className="w-full h-full"
              ></Image>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {feature.features.blocks.map((e, i) => {
            if (i % 2 === 0) {
              return <Feature2 feature={e} key={i} reverse={true} />;
            } else {
              return <Feature2 feature={e} key={i} />;
            }
          })}
        </div>
      </section>
      <section className="lg:py-10 py-5 lg:pb-20">
        <div className="container">
          <h3 className="font-bold text-center text-xl">More features</h3>
          <div className="flex lg:flex-row flex-col">
            {feature.MoreFeatures.cards.map((e, i) => {
              return (
                <div
                  key={i}
                  className="w-full flex flex-col lg:items-center items-start lg:text-center pt-12 lg:px-7 px-3"
                >
                  <Image
                    alt=""
                    src={e.icon}
                    width={64}
                    height={64}
                    className="w-16 aspect-square mb-6"
                  ></Image>
                  <h1 className="text-xl text-primary font-bold">{e.title}</h1>
                  <ul className="flex flex-col gap-1 mt-3 mb-4">
                    {e.list.map((e, i) => {
                      return (
                        <li
                          key={i}
                          className="flex items-start gap-1 lg:justify-center"
                        >
                          <MoveRight className="text-primary" />
                          <p>{e}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="lg:py-20 py-10">
        <div className="container">
          <div className="bg-[#e8f8f0] rounded-lg lg:pt-16 pt-8 flex flex-col items-center">
            <h1 className="text-center font-black lg:text-3xl lg:w-2/5 w-4/5">
              {feature.CtaBlock.title}
            </h1>
            <Button
              size="lg"
              className="my-8 relative top-0 hover:-top-1 transition-all duration-700 font-bold"
            >
              {feature.CtaBlock.cta}
            </Button>
            <Image
              alt=""
              src={feature.CtaBlock.banner}
              width={500}
              height={160}
              className="rounded-t-xl px-10 lg:px-0"
            ></Image>
          </div>
        </div>
      </section>
      <section className="pt-10">
        <div className="container flex flex-col items-center">
          <h1 className="lg:text-5xl text-3xl font-semibold text-center lg:w-[60%]">
            {feature.applications.title}
          </h1>
          <div className="flex mt-16 lg:gap-32 gap-16 gap-y-16 lg:w-3/4 lg:justify-center justify-around flex-wrap">
            {/* <div className="flex flex-col gap-3 items-center">
              <Image
                src={
                  'https://assets-global.website-files.com/6006c42a42689f444d860a2a/6332cc00a96edc756ff0e1a4_icon-legal.svg'
                }
                width={64}
                height={64}
              ></Image>
              <h3 className="font-bold text-2xl">Legal</h3>
            </div> */}
            {feature.applications.applications.map((e, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 w-[150px] items-center"
              >
                <Image alt="" src={e.icon} width={64} height={64}></Image>
                <h3 className="font-bold lg:text-2xl  text-primary text-center ">
                  {e.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="lg:py-32 py-16">
        <div className="container">
          <div className="flex flex-col items-center">
            <h1 className="lg:text-5xl text-3xl font-semibold text-center lg:w-[60%]">
              {feature.clients.title}
            </h1>
            <div className="flex flex-wrap gap-10 lg:justify-between justify-center w-full mt-20 lg:px-32">
              {feature.clients.clients.map((e, i) => {
                return (
                  <Image
                    key={i}
                    src={e.img}
                    width={e.width}
                    height={e.height}
                    alt=""
                    srcset=""
                    className="w-[150px]"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section>
        <TestimonialWrapper testinomial={document.testimonial} />
      </section>
      <section>
        <Stats stats={document.stats} />
      </section>
      <section className="mb-20">
        <div className="container ">
          <div className="lg:mx-10 lg:aspect-[2/1] p-5 lg:p-0 h-full bg-primary lg:rounded-3xl rounded-xl flex lg:flex-row flex-col-reverse  items-center">
            <div className="lg:w-1/2 lg:pl-20 flex flex-col items-start justify-center">
              <h1 className="text-background lg:text-4xl text-xl font-black">
                {feature.finalCta.title}
              </h1>
              <div className="flex lg:flex-row flex-col lg:w-4/5 w-full lg:mt-10 mt-5 gap-5">
                <Link href={feature.finalCta.cta.cta1.link} className="w-full">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="font-bold w-full lg:text-lg relative top-0 hover:-top-1 transition-all duration-700 "
                  >
                    {feature.finalCta.cta.cta1.title}
                  </Button>
                </Link>
                <Link href={feature.finalCta.cta.cta2.link} className="w-full">
                  <Button
                    size="lg"
                    className="font-bold w-full lg:text-lg bg-background text-foreground hover:bg-background/90 relative top-0 hover:-top-1 transition-all duration-700 "
                  >
                    {feature.finalCta.cta.cta2.title}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex items-center justify-center">
              <Image
                alt=""
                src={
                  'https://assets-global.website-files.com/6006c42a42689f444d860a2a/61939edbb0f4079d58e42e6f_pricing_dark_bg.png'
                }
                width={506}
                height={523}
                className="w-4/5 relative lg:top-10"
              ></Image>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default featurePage;
