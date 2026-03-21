import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Globe, ShieldCheck } from 'lucide-react';

// --- IMPORTACIÓN DE PIEZAS ---
import logoDelta from './assets/logo-delta.png';
import oroRey from './assets/pieces/oro-rey.png';
import oroDama from './assets/pieces/oro-dama.png';
import oroTorre from './assets/pieces/oro-torre.png';
import oroAlfil from './assets/pieces/oro-alfil.png';
import oroCaballo from './assets/pieces/oro-caballo.png';
import oroPeon from './assets/pieces/oro-peon.png';
import vidrioRey from './assets/pieces/vidrio-rey.png';
import vidrioDama from './assets/pieces/vidrio-dama.png';
import vidrioTorre from './assets/pieces/vidrio-torre.png';
import vidrioAlfil from './assets/pieces/vidrio-alfil.png';
import vidrioCaballo from './assets/pieces/vidrio-caballo.png';
import vidrioPeon from './assets/pieces/vidrio-peon.png';

const todasLasPiezas = [
  { img: oroRey, tipo: 'oro' }, { img: oroDama, tipo: 'oro' }, { img: oroTorre, tipo: 'oro' },
  { img: oroAlfil, tipo: 'oro' }, { img: oroCaballo, tipo: 'oro' }, { img: oroPeon, tipo: 'oro' },
  { img: vidrioRey, tipo: 'vidrio' }, { img: vidrioDama, tipo: 'vidrio' }, { img: vidrioTorre, tipo: 'vidrio' },
  { img: vidrioAlfil, tipo: 'vidrio' }, { img: vidrioCaballo, tipo: 'vidrio' }, { img: vidrioPeon, tipo: 'vidrio' }
];

const generarPiezaEspacial = (index) => ({
  id: Math.random(),
  data: todasLasPiezas[index % todasLasPiezas.length],
  left: `${Math.random() * 100}%`,
  duration: 55 + Math.random() * 35,
  delay: Math.random() * -70, 
  scale: 0.4 + Math.random() * 0.5, // Un poco más pequeñas en general
  rotation: Math.random() > 0.5 ? 240 : -240
});

function App() {
  const [piezas, setPiezas] = useState([]);
  const [tieneElo, setTieneElo] = useState(false);
  const [nivel, setNivel] = useState('');

  useEffect(() => {
    // AJUSTE: Si es móvil (pantalla < 768px), mostramos solo 8 piezas. Si no, 22.
    const esMobile = window.innerWidth < 768;
    const cantidad = esMobile ? 8 : 22;
    setPiezas(Array.from({ length: cantidad }, (_, i) => generarPiezaEspacial(i)));
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden relative">
      
      {/* 🌌 FONDO ATMOSFÉRICO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#f39200]/5 blur-[100px] md:blur-[250px] rounded-full"></div>
      </div>

      {/* 🛸 PIEZAS FLOTANTES (OPTIMIZADAS) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {piezas.map((p) => (
          <motion.img
            key={p.id}
            src={p.data.img}
            initial={{ y: '115vh', opacity: 0, rotate: 0 }}
            animate={{ y: '-25vh', opacity: [0, 0.5, 0.5, 0], rotate: p.rotation }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
            className="absolute w-20 md:w-28 h-20 md:h-28 object-contain"
            style={{ 
              left: p.left, 
              scale: p.scale,
              filter: p.data.tipo === 'vidrio' 
                ? 'drop-shadow(0 0 10px rgba(243, 146, 0, 0.4))' 
                : 'drop-shadow(0 5px 10px rgba(0,0,0,0.8))'
            }}
          />
        ))}
      </div>

      {/* HEADER ADAPTATIVO */}
      <nav className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          <img src={logoDelta} alt="Logo Delta" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          <div className="text-left border-l-2 border-[#f39200]/30 pl-4 md:pl-6">
            <h1 className="text-xl md:text-3xl font-black tracking-tighter leading-none uppercase">
              DELTA <span className="text-[#f39200]">TE QUIERO</span>
            </h1>
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold mt-1">Chess Elite Club</p>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT ADAPTATIVO */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 md:gap-12 items-center py-6 md:py-10">
        
        {/* TEXTO HERO (MOBILE RESPONSIVE) */}
        <div className="lg:col-span-6 space-y-6 md:space-y-10">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-4xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[1] md:leading-[0.85] uppercase">
              JUEGA <span className="text-[#f39200]">COMO</span> <br />
              UN MAESTRO
            </h2>
            <p className="text-stone-400 text-sm md:text-lg max-w-md leading-relaxed mx-auto lg:mx-0 font-medium">
               Estrategia y disciplina en el Delta Amacuro. Sé parte de la nueva generación de grandes maestros.
            </p>
            
            <div className="flex justify-center lg:justify-start gap-8 md:gap-12 pt-6 md:pt-10 border-t border-white/5 mt-6 md:mt-8">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1 text-[#f39200]">
                  <Globe size={14} />
                  <p className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase">Temporada</p>
                </div>
                <p className="text-3xl md:text-5xl font-black">2026</p>
              </div>
              <div className="text-left border-l border-white/10 pl-8 md:pl-12">
                <div className="flex items-center gap-2 mb-1 text-stone-500">
                  <ShieldCheck size={14} />
                  <p className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase">Aval</p>
                </div>
                <p className="text-3xl md:text-5xl font-black text-white/20">FIDE</p>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO ADAPTATIVO */}
        <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <div className="bg-[#080808]/90 backdrop-blur-3xl border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
            <h3 className="text-[10px] font-bold mb-6 text-center uppercase tracking-[0.3em] text-[#f39200] border-b border-white/5 pb-4">Registro de Aspirante</h3>
            
            <form className="space-y-4">
              <input required type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#f39200] text-white font-bold uppercase" />
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-3">
                <div className="md:col-span-8">
                  <input required type="tel" placeholder="TELÉFONO" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#f39200] text-white font-bold" />
                </div>
                <div className="md:col-span-4">
                  <input required type="number" min="5" max="99" placeholder="EDAD" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#f39200] text-white font-bold uppercase" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 bg-white/5 border border-white/10 p-3 rounded-xl items-center justify-between px-4">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest text-center">¿TIENES ELO FIDE?</span>
                <div className="flex gap-2 w-full md:w-auto">
                  <button type="button" onClick={() => setTieneElo(true)} className={`flex-1 md:px-4 py-2 rounded-lg text-[9px] font-black transition ${tieneElo ? 'bg-[#f39200] text-black shadow-lg shadow-[#f39200]/20' : 'bg-white/5 text-stone-500'}`}>SÍ</button>
                  <button type="button" onClick={() => setTieneElo(false)} className={`flex-1 md:px-4 py-2 rounded-lg text-[9px] font-black transition ${!tieneElo ? 'bg-[#f39200] text-black shadow-lg shadow-[#f39200]/20' : 'bg-white/5 text-stone-500'}`}>NO</button>
                </div>
              </div>

              <AnimatePresence>
                {tieneElo && (
                  <motion.input initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} type="number" placeholder="TU PUNTAJE ELO" className="w-full bg-[#f39200]/10 border border-[#f39200]/40 p-4 rounded-xl text-xs outline-none text-[#f39200] font-black" />
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <p className="text-[9px] font-bold text-[#f39200] uppercase tracking-widest ml-1">MOTIVACIÓN</p>
                <textarea required rows="2" placeholder="¿POR QUÉ QUIERES UNIRTE?" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#f39200] text-white uppercase placeholder:text-stone-600 font-bold leading-relaxed resize-none"></textarea>
              </div>

              <button className="w-full bg-[#f39200] hover:bg-white text-black font-black py-4 rounded-xl md:rounded-2xl transition-all uppercase tracking-[0.2em] text-[10px] md:text-[11px] mt-2 flex items-center justify-center gap-3 active:scale-95 shadow-2xl shadow-[#f39200]/20">
                SOLICITAR INGRESO <ChevronRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER ADAPTATIVO */}
      <footer className="w-full p-8 md:absolute md:bottom-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] md:text-[9px] text-stone-600 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
        <div className="flex items-center gap-2">
          <MapPin size={10} className="text-[#f39200]" /> Tucupita, Venezuela
        </div>
        <div className="text-center md:text-right">Delta Te Quiero • 2026</div>
      </footer>
    </div>
  );
}

export default App;