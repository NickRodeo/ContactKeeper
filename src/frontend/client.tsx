import React from "react";
import { hydrateRoot } from "react-dom/client";
import Home from "./home";
import Login from "./login/login";
import Register from "./register";
import Contacts from "./contacts";
import About from "./about";
import AddContact from "./contacts/add";
import EditContact from "./contacts/edit";
import DetailContact from "./contacts/detail";
import AddAddress from "./address/add";
import EditAddress from "./address/edit";

const pages: Record<string, React.ComponentType<any>> = {
  home: Home,
  login: Login,
  register: Register,
  contacts: Contacts,
  about: About,
  addContact: AddContact,
  editContact: EditContact,
  detailContact: DetailContact,
  addAddress: AddAddress,
  editAddress: EditAddress,
};

const root = document.getElementById("root");
if (root) {
  const pageName = root.getAttribute("data-page") || "home";
  const PageComponent = pages[pageName] || (() => <div>Page Not Found</div>);
  hydrateRoot(root, <PageComponent />);
}
