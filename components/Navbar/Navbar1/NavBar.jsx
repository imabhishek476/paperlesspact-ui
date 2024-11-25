'use client';

import Image from 'next/image';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '../../../components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';

import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Twitter,
  Youtube,
} from 'lucide-react';

function NavBar({ navbar, footer }) {
  const aboutUs = {
    title: 'About us',
    links: [
      {
        title: 'Contact Us',
        link: '/about-us#contact',
      },
      {
        title: 'About Us',
        link: '/about-us',
      },
    ],
  };
  return (
    <header className="w-full fixed top-0 z-[9999] bg-background">
      <div className="container">
        <nav className="flex justify-between items-center w-full">
          <div className="flex items-center gap-5 w-full">
            <Link href={'/'}>
              <Image
                src={'/images/logo.png'}
                width={200}
                height={76}
                alt="logo"
                className="w-32 py-4"
              ></Image>
            </Link>
            <div className="px-5 lg:inline hidden border-l border-l-black/10 border-foreground">
              <NavigationMenu>
                <NavigationMenuList className="gap-3">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-bold relative">
                      <div className="">
                        Product{' '}
                        <span className="absolute -top-2 right-0 bg-[#32d3dbca] text-primary px-1.5 rounded-full">
                          {navbar.productNotification}
                        </span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="min-w-[250px]">
                        <ul className="py-2">
                          {navbar.product.map((e, i) => {
                            return (
                              <li
                                key={i}
                                className="px-6 py-4 hover:bg-[#f0f0f0b5] flex items-center"
                              >
                                <NavigationMenuLink href={e.slug}>
                                  {e.title}
                                </NavigationMenuLink>
                                {e.tag && (
                                  <span className="text-xs ml-2 font-semibold py-1 px-2 rounded-md bg-[#32d3dbca]">
                                    {e.tag}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="lg:flex gap-5 hidden items-center min-w-[400px] justify-end">
            <Link href={'/features'} className="text-sm py-2 font-bold">
              Features
            </Link>
            <Link href={'/about-us'} className="text-sm py-2 font-bold">
              About Us
            </Link>
            <Link href={'/about-us#contact'} className="text-sm py-2 font-bold">
              Contact Us
            </Link>
            <Button className="w-32 lg:mr-0 mr-5">Start Free Trial</Button>
          </div>
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className="py-14 flex flex-col justify-between">
              <div className="flex flex-col">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg">
                      Product
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {navbar.product.map((e, i) => {
                          return (
                            <li
                              key={i}
                              className="py-2 text-lg flex items-center"
                            >
                              <SheetClose key={i} asChild>
                                <Link href={e.slug}>{e.title}</Link>
                              </SheetClose>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <SheetClose asChild>
                  <Link href={'/features'} className="text-lg py-2 font-medium">
                    Features
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={'/about-us'} className="text-lg py-2 font-medium">
                    About us
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={'/about-us#contact'}
                    className="text-lg py-2 font-medium"
                  >
                    Contact us
                  </Link>
                </SheetClose>
                {footer.links.map((e, i) => {
                  return (
                    <SheetClose key={i} asChild>
                      <Link href={e.slug} className="text-lg py-2 font-medium">
                        {e.title}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
              <SheetFooter className={'flex flex-col'}>
                <Link href={'/'}>
                  <Image
                    src={'/images/logo.png'}
                    width={394}
                    height={76}
                    alt="logo"
                    className="w-52 py-4"
                  ></Image>
                </Link>
                <div className="mt-2">
                  <address>{footer.address[0].address}</address>
                  <h3 className="mt-3">
                    <Link
                      href={`mailto:${footer.address[0].contact.split('/')[0]}`}
                    >
                      {footer.address[0].contact.split('/')[0]}
                    </Link>
                    <br />
                    <Link
                      href={`tel:${footer.address[0].contact.split('/')[1]}`}
                    >
                      {footer.address[0].contact.split('/')[1]}
                    </Link>
                  </h3>
                </div>
                <ul className="flex justify-between mt-5">
                  <li>
                    <Linkedin fill="black" size={18} />
                  </li>
                  <li>
                    <Youtube size={18} />
                  </li>
                  <li>
                    <Twitter fill="black" size={18} />
                  </li>
                  <li>
                    <Facebook fill="black" size={18} />
                  </li>
                  <li>
                    <Instagram size={18} />
                  </li>
                </ul>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
