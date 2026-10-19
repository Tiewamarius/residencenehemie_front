import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
        
        {/* Illustration animée ou style glitch du code 404 */}
        <div className="relative mb-6">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 tracking-widest animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-md">
              Page introuvable
            </span>
          </div>
        </div>

        {/* Message explicatif */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Oups ! Vous vous êtes perdu en route.
        </h2>
        <p className="text-slate-300 text-sm mb-8">
          La page que vous recherchez semble introuvable, a été déplacée ou n'existe tout simplement pas.
        </p>

        {/* Bouton de retour à l'accueil */}
        <Link
          to="/"
          className="inline-flex items-center justify-center w-full py-3 px-6 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-violet-600 rounded-xl shadow-lg hover:from-pink-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  );
}