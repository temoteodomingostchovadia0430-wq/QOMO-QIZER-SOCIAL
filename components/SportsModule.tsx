
import React, { useState } from 'react';
import { Trophy, Swords, Calendar, Zap, ChevronRight, TrendingUp } from 'lucide-react';
import { Match } from '../types';

const MOCK_MATCHES: Match[] = [
  { id: 'm1', teamA: 'Black Bulls', teamB: 'Costa do Sol', scoreA: 2, scoreB: 1, status: 'live', league: 'Moçambola', time: '75\'' },
  { id: 'm2', teamA: 'Real Madrid', teamB: 'Barcelona', status: 'scheduled', league: 'La Liga', time: 'Amanhã, 20:00' },
  { id: 'm3', teamA: 'Man. City', teamB: 'Arsenal', scoreA: 0, scoreB: 0, status: 'finished', league: 'Premier League', time: 'FT' },
];

const SportsModule: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-3 rounded-2xl shadow-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Arena Nexus</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resultados & Previsões</p>
          </div>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Meus Times</button>
      </div>

      <div className="space-y-6">
        {MOCK_MATCHES.map(match => (
          <div key={match.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.league}</span>
              {match.status === 'live' && (
                <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">
                  <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping" /> AO VIVO • {match.time}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-12">
              <div className="flex flex-col items-center gap-3 flex-1 text-right">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-900 dark:text-white">
                  {match.teamA[0]}
                </div>
                <h4 className="font-black text-sm uppercase">{match.teamA}</h4>
              </div>

              <div className="flex flex-col items-center justify-center">
                {match.status === 'scheduled' ? (
                  <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-2xl font-black text-lg">VS</div>
                ) : (
                  <div className="flex items-center gap-4 text-4xl font-black tracking-tighter">
                    <span>{match.scoreA}</span>
                    <span className="text-slate-300">-</span>
                    <span>{match.scoreB}</span>
                  </div>
                )}
                <p className="text-[9px] font-black text-slate-400 uppercase mt-4 tracking-widest">{match.status === 'scheduled' ? match.time : 'Placar Atual'}</p>
              </div>

              <div className="flex flex-col items-center gap-3 flex-1 text-left">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-900 dark:text-white">
                  {match.teamB[0]}
                </div>
                <h4 className="font-black text-sm uppercase">{match.teamB}</h4>
              </div>
            </div>

            {match.status === 'scheduled' && (
              <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl flex items-center justify-between border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest">Preditor IA: 65% Vitória {match.teamA}</span>
                </div>
                <button className="text-[9px] font-black text-indigo-600 uppercase flex items-center gap-1">Ver Odds <ChevronRight className="w-3 h-3" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsModule;
