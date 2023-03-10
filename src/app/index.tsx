/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/LoginPage/Loadable';
import Navbar from './components/Navbar';
import { AddMovie } from './pages/AddMovie/Loadable';
import { MoviePage } from './pages/MoviePage/Loadable';
import { RatingPage } from './pages/RatingPage/Loadable';
import { StatsPage } from './pages/StatsPage/Loadable';
import { CreateUser } from './pages/CreateUser/Loadable';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="A Movie App"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Movie application" />
      </Helmet>

      <Routes>
        <Route
          path="/"
          element={
            <Navbar isPrivate>
              <HomePage />
            </Navbar>
          }
        />
        <Route
          path="/login"
          element={
            <Navbar>
              <LoginPage />
            </Navbar>
          }
        />
        <Route
          path="/add-movie"
          element={
            <Navbar isPrivate>
              <AddMovie />
            </Navbar>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <Navbar isPrivate>
              <MoviePage />
            </Navbar>
          }
        />
        <Route
          path="/rate/movie/:id"
          element={
            <Navbar isPrivate>
              <RatingPage />
            </Navbar>
          }
        />
        <Route
          path="/stats"
          element={
            <Navbar isPrivate>
              <StatsPage />
            </Navbar>
          }
        />
        <Route
          path="/create-account"
          element={
            <Navbar isPrivate>
              <CreateUser />
            </Navbar>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
