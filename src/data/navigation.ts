import { MegamenuItem, NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Company",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "App Name",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "City",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Contruction",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Country",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Country,
    })),
  },
];

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Flight booking",
  },
  {
    id: ncNanoId(),
    href: "/listing-car",
    name: "Car booking",
    // isNew: true,
  },
 
];

const accomodationsMenu: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Hotels",
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Resorts",
    // isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Lodges",
  //   isNew: true,
  },
];

const lifestylesMenu: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/listing-experiences",
    name: "Restaurants",
  },
  {
    id: ncNanoId(),
    href: "/listing-experiences",
    name: "Activities",
    // isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-experiences",
    name: "Theatres",
  //   isNew: true,
  },
];

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog Page",
  },
  {
    id: ncNanoId(),
    href: "/blog-single",
    name: "Blog Single",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "About",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Contact us",
  },
  {
    id: ncNanoId(),
    href: "/login",
    name: "Login",
  },
  {
    id: ncNanoId(),
    href: "/signup",
    name: "Signup",
  },
 
];
const langOptions: NavItemType[]=[
{
  id: "English",
  name: "English",
  href: "#",
  active: true,
},
{
  id: "Vietnamese",
  name: "Vietnamese",
  href: "#",
},
{
  id: "Francais",
  name: "Francais",
  href: "#",
},
{
  id: "Francais",
  name: "Francais",
  href: "#",
},
{
  id: "Francais",
  name: "Francais",
  href: "#",
},
{
  id: "Francais",
  name: "Francais",
  href: "#",
},
];

const currencyOptions: NavItemType[]= [
  {
    id: "EUR",
    name: "EUR",
    href: "##",
    active: true,
  },
  {
    id: "USD",
    name: "USD",
    href: "##",
  },
  {
    id: "GBF",
    name: "GBF",
    href: "##",
  },
  {
    id: "SAR",
    name: "SAR",
    href: "##",
  },
  {
    id: "QAR",
    name: "QAR",
    href: "##",
  },
];
const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/add-listing-1",
    name: "Add Listings",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/add-listing-1",
        name: "Add Listings 1",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-2",
        name: "Add Listings 2",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-3",
        name: "Add Listings 3",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-4",
        name: "Add Listings 4",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-5",
        name: "Add Listings 5",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-6",
        name: "Add Listings 6",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-7",
        name: "Add Listings 7",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-8",
        name: "Add Listings 8",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-9",
        name: "Add Listings 9",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-10",
        name: "Add Listings 10",
      },
    ],
  },
  //
  { id: ncNanoId(), href: "/checkout", name: "Checkout" },
  { id: ncNanoId(), href: "/pay-done", name: "Pay done" },
  //
  { id: ncNanoId(), href: "/author", name: "Author Page" },
  { id: ncNanoId(), href: "/account", name: "Account Page" },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "#",
    name: "Transport",
    type: "dropdown",
    children: demoChildMenus,
    // isNew: true,
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Accomodations",
    type: "dropdown",
    children: accomodationsMenu,
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Lifestyles",
    type: "dropdown",
    children: lifestylesMenu,
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "About",
    type: "none"
  }
  
];
