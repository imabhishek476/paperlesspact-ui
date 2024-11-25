'use client';
import {
  ChevronDown,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Settings,
  NotebookPen,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import useDimensions from 'react-use-dimensions';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import Login from '../Auth/authPages/login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { getUserProfile, logOut } from '../Apis/login';
import Cookies from 'js-cookie';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Loading from 'components/Loading/Loading';
const theme = createTheme();

// background: rgb(0,19,20);
// background: linear-gradient(180deg, rgba(0,19,20,1) 30%, rgba(0,142,151,1) 75%);

// button
// background: rgb(9,234,245);
// background: linear-gradient(90deg, rgba(9,234,245,1) 30%, rgba(5,106,112,1) 75%);

const solutions = [
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Legal',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Accounting & Tax',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Banking & Finance',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Education',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Entertainment & Media',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Freelancers',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Government',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Non-profits',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Real Estate',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Healthcare',
  },
  {
    link: 'https://sign.easedraft.com/document/new',
    title: 'Retail',
  },
];

function NavBar2({ navbar, footer }) {
  const isMarket = [
    '/about-us',
    '/features',
    '/pricing',
    '/terms-and-conditions',
    '/privacy-policy',
    '/blog',
  ];


  const [user, setUser] = useState(null);
  const path = usePathname();
  const router = useRouter();
  const [scoll, setScroll] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, isOpen] = useState(false);
  const [openLogin, isOpenLogin] = useState(false);
  const [ref, { x, y, width }] = useDimensions();
  const [popoverOpen,setPopoverOpen]=useState(false)
  useEffect(() => {
    let handleScroll;
    if (typeof window !== 'undefined') {
      handleScroll = () => {
        const scrollTop = window.scrollY;
        setScroll(scrollTop);
      };
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // console.log(path);
  function handleRedirect(index, arr) {
    // console.log(index);
    const accessToken = Cookies.get('accessToken');
    // console.log(accessToken);
    if (!accessToken) {
      return isOpen(true);
    } else {
      // console.log('hey', arr[index].link);
      setLoading(true);
      window.location.href = arr[index].link;
    }
  }
  const isScrollBarBackground = isMarket.includes(path) || path.includes("/blog")
  useEffect(() => {
    if (Cookies.get('accessToken')) {
      getUserProfile(Cookies.get('accessToken'))
        .then((user) => {
          if (user.data) {
            setUser(user.data);
          }
        })
        .catch(() => setUser(null));
    }
  }, []);
  // console.log(popoverOpen)

  return loading ? (
    <Loading />
  ) : (
    <header
      ref={ref}
      className={`fixed top-0 w-full ${scoll > 60 || isScrollBarBackground
        ? 'bg-background text-foreground shadow-xl py-3'
        : 'text-background py-3'
        }  z-50`}
    >
      <ThemeProvider theme={theme}>
        <Sheet open={openLogin} onOpenChange={isOpenLogin}>
          <SheetContent
            side={'right'}
            className="lg:max-w-[40vw] max-w-[100vw] w-full"
          >
            <SheetHeader>
              <Login
                noredirect={true}
              // form={{
              //   actions,
              //   files,
              // }}
              />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </ThemeProvider>
      <div className="container">
        <nav className="flex items-center justify-between">
          <Link href={'/'}>
            <Image
              alt="logo"
              src={'/images/logo-light.png'}
              width={150}
              height={30}
            ></Image>
          </Link>
          <div className="lg:flex items-center hidden">
            <div className="flex items-center gap-2.5">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-0 hover:bg-transparent focus:bg-transparent">
                      <div className="flex items-stretch gap-2.5">
                        <div className="flex items-center">
                          <Settings />
                        </div>
                        <div className="">
                          <h3 className="text-sm font-bold text-left">
                            Products
                          </h3>
                          <p className="text-xs">Explore Our Offerings</p>
                        </div>
                        <div
                          className={`w-0.5 mt-1 ${scoll > 60 ? 'bg-foreground' : 'bg-background'
                            }`}
                        ></div>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="min-w-[280px]">
                        <ul className="py-2">
                          {navbar?.product?.map((e, i) => {
                            return (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="w-full">
                                    <Link href={e?.disabled ? '' : e?.link}>
                                      <li
                                        key={i}
                                        className={`px-6 py-4 hover:bg-[#f0f0f0b5] flex items-center ${e?.disabled && 'opacity-60'
                                          }`}
                                      >
                                        {e.title}

                                        {e.tag && (
                                          <span
                                            className={`text-xs ml-2 font-semibold py-1 px-2 rounded-md ${e?.disabled
                                              ? 'bg-[#5e5d5d]'
                                              : 'bg-[#e86f3aff]'
                                              } text-background`}
                                          >
                                            {e.tag}
                                          </span>
                                        )}
                                      </li>
                                    </Link>
                                  </TooltipTrigger>
                                  {e?.disabled && (
                                    <TooltipContent side="bottom">
                                      <h1 className="text-background">
                                        Coming Soon
                                      </h1>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-0 hover:bg-transparent focus:bg-transparent">
                      <div className="flex items-stretch gap-2.5">
                        <div className="flex items-center">
                          <ListChecks />
                        </div>
                        <div className="">
                          <h3 className="text-sm font-bold text-left">
                            Solutions
                          </h3>
                          <p className="text-xs">Explore Our Solutions</p>
                        </div>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="min-w-[280px]">
                        <ul className="py-2">
                          {solutions.map((e, i) => {
                            return (
                              <li
                                key={i}
                                onClick={() => handleRedirect(i, solutions)}
                                className="px-6 py-4 hover:bg-[#f0f0f0b5] flex items-center cursor-pointer"
                              >
                                {/* <NavigationMenuLink href=""> */}
                                {e.title}
                                {/* </NavigationMenuLink> */}
                                {e.tag && (
                                  <span className="text-xs ml-2 font-semibold py-1 px-2 rounded-md bg-[#e8713c] text-background">
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

              {!user ? (
                <Button
                  onClick={() => isOpen(true)}
                  className="rounded-sm bg-[linear-gradient(90deg,rgba(230,135,92,1)30%,rgba(232,113,60,1)75%)]"
                >
                  Login or Create Account
                </Button>
              ) : (
                <Popover>
                  <PopoverTrigger onClick={()=>setPopoverOpen(true)} asChild>
                    <div className="flex items-center gap-3 px-3 border-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.imageUrl} alt="@shadcn" />
                        <AvatarFallback>
                          {user.fullname.split(' ')[0].slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hover:cursor-pointer flex flex-row gap-2">
                        <h1 className="text-sm font-bold">{user.username}</h1>
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </PopoverTrigger>
                {popoverOpen &&  <PopoverContent className="w-60 ">
                    <div className="flex flex-col">
                      {user?.roles[0]?.name === "ROLE_ADMIN" && <Link
                      onClick={()=>{setPopoverOpen(false)}}
                        href="/dashboard"
                        className="flex items-center gap-2 hover:bg-accent p-5"
                      >
                        <DisplaySettingsIcon />
                        <div className="">
                          <h1 className="text-md font-extrabold leading-[1]">
                            Admin Dashboard
                          </h1>
                          <p className="leading-none text-sm mt-0.5">
                            Visit Admin Dashboard
                          </p>
                        </div>
                      </Link>}
                      <Link
                        href={`https://sign.easedraft.com?jwt=${Cookies.get(
                          'accessToken'
                        )}`}
                        className="flex items-center gap-2 hover:bg-accent p-5"
                      >
                        <LayoutDashboard />
                        <div className="">
                          <h1 className="text-md font-extrabold leading-[1]">
                            Dashboard
                          </h1>
                          <p className="leading-none text-sm mt-0.5">
                            Visit Dashboard
                          </p>
                        </div>
                      </Link>
                      <Link
                        href={''}
                        onClick={() => {
                          Cookies.remove('accessToken', {
                            domain: '.easedraft.com',
                          });
                          // Cookies.remove('fullname');
                          // Cookies.remove('email');
                          // Cookies.remove('assignedRole');
                          Cookies.remove('isLoggedIn', {
                            domain: '.easedraft.com',
                          });
                          window.location.reload();
                        }}
                        className="flex items-center hover:bg-red-100 hover:text-red-500 gap-2 p-5"
                      >
                        <LogOut />
                        <div className="">
                          <h1 className="text-md font-extrabold leading-[1]">
                            Logout
                          </h1>
                          {/* <p className="leading-none text-sm mt-0.5">
                            Visit Dashboard
                          </p> */}
                        </div>
                      </Link>
                    </div>
                  </PopoverContent>}
                </Popover>
              )}
              <Sheet open={open} onOpenChange={isOpen}>
                <SheetContent
                  side={width < 600 ? 'bottom' : 'right'}
                  className={`${width < 600 ? 'h-auto' : '100dvh'
                    } md:max-w-[60vw] lg:max-w-[40vw] max-w-[100vw] w-full`}
                >
                  <SheetHeader>
                    <ThemeProvider theme={theme}>
                      <Login />
                    </ThemeProvider>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Link href={'/blog#'}>
                <div className="flex items-stretch gap-2.5 hover:cursor-pointer">
                  <div className="flex items-center">
                    <NotebookPen />
                  </div>
                  <div className="">
                    <h3 className="text-sm font-bold text-left">Blogs</h3>
                    <p className="text-xs">Explore Our Publications</p>
                  </div>
                </div>
              </Link>

              {/* <Button
                variant="outline"
                className="rounded-sm border-2 flex gap-3 "
              >
                <p>🇮🇳 IN | ENG | INR</p>
                <ChevronDown size={18} />
              </Button> */}
            </div>
          </div>
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className="py-14 px-0 w-[100vw] lg:w-[540px] flex flex-col overflow-scroll justify-between">
              <div className="flex flex-col">
                <div className="border-b px-6 pb-2">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Settings />
                          <div className="">
                            <h1 className="text-md font-bold text-left leading-none">
                              Products
                            </h1>
                            <p className="text-gray-400 text-sm">
                              Explore Our Offerings
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="py-2">
                          {navbar?.product?.map((e, i) => {
                            return (
                              <li>
                                <SheetClose asChild>
                                  <Link
                                    key={i}
                                    href={e?.disabled ? '' : e?.link}
                                    className={`px-6 py-2 flex items-center ${e?.disabled && 'opacity-60'
                                      }`}
                                  >
                                    {/* <NavigationMenuLink href=""> */}

                                    <h1 className="text-md">{e.title}</h1>
                                    {/* </NavigationMenuLink> */}
                                    {e.tag && (
                                      <span
                                        className={`text-xs ml-2 font-semibold py-1 px-2 rounded-md ${e?.disabled
                                          ? 'bg-[#5e5d5d]'
                                          : 'bg-[#e86f3aff]'
                                          } text-background`}
                                      >
                                        {e.tag}
                                      </span>
                                    )}
                                  </Link>
                                </SheetClose>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {!user ? (
                  <SheetClose asChild>
                    <Link
                      href={''}
                      onClick={() => isOpen(true)}
                      className=" py-4 px-6 font-medium border-b"
                    >
                      <div className="flex items-center gap-3">
                        <User />
                        <div className="">
                          <h1 className="text-md font-bold text-left leading-none">
                            Login or Create Account
                          </h1>
                          <p className="text-sm text-gray-400">
                            Enjoy Your Perks
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SheetClose>
                ) : (
                  <div className="border-b px-6 py-2">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.imageUrl} alt="@shadcn" />
                              <AvatarFallback>
                                {user.fullname.split(' ')[0].slice(0, 1)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="">
                              <h1 className="text-md font-bold text-left leading-none">
                                {user.username}
                              </h1>
                              <p className="text-gray-400 text-sm text-left">
                                Visit Dashboard
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul>
                          {
                              user?.roles[0]?.name === "ROLE_ADMIN" &&
                              <li className="py-2 pl-9 text-md flex items-center">
                                <SheetClose asChild>
                                  <Link
                                    href="/dashboard"
                                    className="flex items-center justify-between"
                                  >
                                    <p>Admin Dashboard</p>
                                  </Link>
                                </SheetClose>
                              </li>
                            }
                            <li className="py-2 pl-9 text-md flex items-center">
                              <SheetClose asChild>
                                <Link
                                  href={`https://sign.easedraft.com?jwt=${Cookies.get(
                                    'accessToken'
                                  )}`}
                                  className="flex items-center justify-between"
                                >
                                  <p>Dashboard</p>
                                </Link>
                              </SheetClose>
                            </li>
                            <li className="py-2 pl-9 text-md flex items-center">
                              <SheetClose asChild>
                                <Link
                                  href=""
                                  onClick={() => {
                                    Cookies.remove('accessToken', {
                                      domain: '.easedraft.com',
                                    });
                                    Cookies.remove('fullname', {
                                      domain: '.easedraft.com',
                                    });
                                    Cookies.remove('email', {
                                      domain: '.easedraft.com',
                                    });
                                    Cookies.remove('assignedRole', {
                                      domain: '.easedraft.com',
                                    });
                                    Cookies.remove('isLoggedIn', {
                                      domain: '.easedraft.com',
                                    });
                                    window.location.reload();
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <p>Logout</p>
                                </Link>
                              </SheetClose>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
                <SheetClose asChild>
                  <div className='border-b px-6 py-2'>
                    <Link
                      href={'/blog#'}
                      className="flex items-stretch gap-2.5 hover:cursor-pointer"
                    >
                      <div className="flex items-center">
                        <NotebookPen />
                      </div>
                      <div className="">
                        <h3 className="text-sm font-bold text-left">Blogs</h3>
                        <p className="text-xs">Explore Our Publications</p>
                      </div>
                    </Link>
                  </div>
                </SheetClose>

                <div className="border-b px-6 py-2">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Settings />
                          <div className="">
                            <h1 className="text-md font-bold text-left leading-none">
                              Know More
                            </h1>
                            <p className="text-gray-400 text-sm text-left">
                              For about us, our services & contact us
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul>
                          <li className="py-2 pl-9 text-md flex items-center">
                            <SheetClose asChild>
                              <Link
                                href="/about-us"
                                className="flex items-center justify-between"
                              >
                                <p>About us</p>
                              </Link>
                            </SheetClose>
                          </li>
                          <li className="py-2 pl-9 text-md flex items-center">
                            <SheetClose asChild>
                              <Link
                                href="/pricing"
                                className="flex items-center justify-between"
                              >
                                <p>Pricing</p>
                              </Link>
                            </SheetClose>
                          </li>
                          <li className="py-2 pl-9 text-md flex items-center">
                            <SheetClose asChild>
                              <Link
                                href="/about-us#contact"
                                className="flex items-center justify-between"
                              >
                                <p>Contact us</p>
                              </Link>
                            </SheetClose>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                {footer.links2.map((e, i) => {
                  return (
                    <SheetClose key={i} asChild>
                      <Link
                        href={e.slug}
                        className="text-md px-6 py-4 font-bold border-b"
                      >
                        {e.title}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
              <SheetFooter
                className={'flex lg:flex-col sm:flex-col flex-col px-6'}
              >
                <Link href={'/'}>
                  <Image
                    src={'/images/logo-light.png'}
                    width={394}
                    height={76}
                    alt="logo"
                    className="w-32 py-2"
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

export default NavBar2;
