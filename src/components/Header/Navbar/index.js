import React from "react";
import { List, ListItem } from "./styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AutoDepura from '../../../pages/autoDepura';
import Ferramenta2 from '../../../pages/ferramenta2';

export default function Navbar() {
  return (
    <List>
      <ListItem >
        <Link to="/autodepura" className="route">AutoDepura</Link>
      </ListItem>
      <ListItem >
        <Link to="/ferramenta2" className="route">Ferramenta 2</Link>
      </ListItem>
    </List>
  );
}

