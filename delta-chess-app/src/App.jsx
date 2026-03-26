import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Trash2, Lock, LogOut, User, Shield, Search,
  Trophy, Activity, CheckCircle, Camera, Loader2, Phone, Calendar, Star,
  Edit3, X, Users, Globe, AlertTriangle, Info, Award, Download, Filter, Save, ChevronDown,
  ExternalLink, Mail, Fingerprint, LayoutDashboard, UserCheck, Clock, FileText, BarChart3, Printer, Layout, Hash, Menu, FileSpreadsheet, Smartphone, CreditCard
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';

// --- CONFIGURACIÓN DE SUPABASE ---
const supabaseUrl = 'https://mxiygrsutntseyllhcbb.supabase.co';
const supabaseKey = 'sb_publishable_NUby1DTBi5Hly6ONyg6oUA_tUIfd4Z-';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ASSETS ---
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

// --- LÓGICA DE CATEGORÍAS ---
const obtenerCategoria = (edad) => {
  if (!edad) return "S/N";
  const e = parseInt(edad);
  if (e < 13) return "INFANTIL";
  if (e >= 13 && e <= 14) return "CADETE";
  if (e >= 15 && e <= 20) return "JUVENIL";
  if (e >= 50) return "SENIOR";
  return "LIBRE / ABSOLUTO";
};

// --- GENERADOR DE PIEZAS ---
const generarPiezaEspacial = (index, esMobile) => ({
  id: Math.random(),
  data: todasLasPiezas[index % todasLasPiezas.length],
  left: `${Math.random() * 100}%`,
  duration: 40 + Math.random() * 60,
  delay: Math.random() * -100,
  scale: esMobile ? 0.3 + Math.random() * 0.3 : 0.5 + Math.random() * 0.6,
  rotation: Math.random() > 0.5 ? 360 : -360
});

// --- COMPONENTE: VISTA REPORTES (DISEÑO PROFESIONAL Y ORDENADO) ---
const VistaReportes = ({ registros, alCerrar }) => {
  const manejarImpresion = () => window.print();

  // Estadísticas rápidas para el reporte
  const total = registros.length;
  const aprobados = registros.filter(r => r.status === 'aprobado').length;
  const enRevision = total - aprobados;

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[1000] bg-[#020202] overflow-y-auto p-4 md:p-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 no-print">
          <button 
            onClick={alCerrar} 
            className="flex items-center gap-2 text-stone-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer"
          >
            <X size={20} /> Cerrar Vista
          </button>
          <button 
            onClick={manejarImpresion} 
            className="bg-[#f39200] text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-all shadow-xl cursor-pointer"
          >
            <Printer size={18} /> Imprimir Reporte
          </button>
        </div>

        {/* DOCUMENTO BLANCO */}
        <div className="bg-white text-black p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative min-h-[85vh] print:p-0 print:shadow-none print:rounded-none">
          
          {/* ENCABEZADO DEL DOCUMENTO */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-[#f39200] pb-10 mb-10 gap-6">
            <div className="flex items-center gap-6">
              <img src={logoDelta} className="w-24 h-24 object-contain" alt="logo" />
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Fundación <span className="text-[#f39200]">Delta</span></h2>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] mt-1 italic">Club de Ajedrez Élite • Reporte Maestro</p>
              </div>
            </div>
            <div className="text-left md:text-right space-y-1">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">Documento Emitido el:</p>
              <p className="font-bold text-lg">{new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <p className="text-[9px] font-bold text-[#f39200] uppercase tracking-widest">Tucupita, Edo. Delta Amacuro</p>
            </div>
          </div>

          {/* TARJETAS DE RESUMEN */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-[9px] font-black text-stone-400 uppercase mb-1">Total Atletas</p>
              <p className="text-3xl font-black">{total}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <p className="text-[9px] font-black text-green-600 uppercase mb-1 tracking-widest">Aprobados</p>
              <p className="text-3xl font-black text-green-700">{aprobados}</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <p className="text-[9px] font-black text-[#f39200] uppercase mb-1 tracking-widest">En Revisión</p>
              <p className="text-3xl font-black text-orange-700">{enRevision}</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-[9px] font-black text-stone-400 uppercase mb-1">Estatus del Reporte</p>
              <p className="text-xs font-black uppercase mt-2 text-stone-800 italic">Válido / Certificado</p>
            </div>
          </div>

          {/* TABLA DE ATLETAS ORDENADA */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200 text-[10px] font-black uppercase text-stone-500 tracking-widest">
                  <th className="py-4 px-2">ID</th>
                  <th className="py-4 px-2">Nombre Completo</th>
                  <th className="py-4 px-2">Categoría</th>
                  <th className="py-4 px-2">Nivel / ELO</th>
                  <th className="py-4 px-2">Contacto</th>
                  <th className="py-4 px-2 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {registros.map(r => (
                  <tr key={r.id} className="text-sm">
                    <td className="py-5 px-2 font-mono text-stone-400 text-xs">#00{r.id}</td>
                    <td className="py-5 px-2 font-black uppercase text-stone-800">{r.nombre}</td>
                    <td className="py-5 px-2"><span className="text-[10px] font-bold bg-stone-100 px-3 py-1 rounded-md text-stone-600 uppercase">{obtenerCategoria(r.edad)}</span></td>
                    <td className="py-5 px-2">
                      <p className="font-bold text-xs uppercase">{r.nivel}</p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase">FIDE: {r.elo_fide || 'UR'}</p>
                    </td>
                    <td className="py-5 px-2 text-xs text-stone-500 font-medium">
                        {r.telefono || '---'}
                        <p className="text-[10px] lowercase text-stone-400 leading-none">{r.email}</p>
                    </td>
                    <td className="py-5 px-2 text-right">
                      <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full border ${r.status === 'aprobado' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-orange-50 border-orange-200 text-orange-700'}`}>
                        {r.status || 'Revision'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FIRMA Y PIE DE PÁGINA */}
          <div className="mt-24 flex justify-between items-end opacity-50 print:opacity-100">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
              <p>Generado por Sistema Central Delta</p>
              <p className="mt-1">© 2026 Todos los derechos reservados</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-64 border-t-2 border-stone-800 mb-2"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-900">Directiva Central Delta</p>
                <p className="text-[9px] font-bold italic text-stone-400 uppercase">Firma Autorizada</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; overflow: visible !important; margin: 0 !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; margin: 0 !important; }
          @page { size: portrait; margin: 1.5cm; }
          .shadow-2xl { box-shadow: none !important; }
          .rounded-[2.5rem] { border-radius: 0 !important; }
        }
      `}</style>
    </motion.div>,
    document.body
  );
};

// --- COMPONENTE: MODAL FICHA TÉCNICA DETALLADA (PORTAL) ---
const ModalFichaDetallada = ({ atleta, alCerrar }) => {
  if (!atleta) return null;
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0c0c0c] border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f39200] rounded-xl flex items-center justify-center text-black shadow-lg"><FileText size={24}/></div>
            <div>
              <h3 className="text-white font-black uppercase text-sm tracking-widest">Expediente de Atleta</h3>
              <p className="text-[#f39200] text-[10px] font-bold uppercase italic">ID de Registro: #00{atleta.id}</p>
            </div>
          </div>
          <button onClick={alCerrar} className="p-3 hover:bg-white/10 rounded-full text-stone-500 hover:text-white transition-all cursor-pointer"><X size={24}/></button>
        </div>
       
        <div className="p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div><p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Nombre Completo</p><p className="text-white font-black text-lg uppercase">{atleta.nombre}</p></div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Edad</p><p className="text-white font-bold">{atleta.edad} AÑOS</p></div>
              <div><p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Categoría</p><p className="text-[#f39200] font-bold uppercase">{obtenerCategoria(atleta.edad)}</p></div>
            </div>
            <div><p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Contacto Directo</p><p className="text-white font-bold flex items-center gap-2"><Phone size={14} className="text-[#f39200]"/> {atleta.telefono || 'NO REGISTRADO'}</p><p className="text-stone-400 text-xs mt-1 flex items-center gap-2"><Mail size={14} className="text-[#f39200]"/> {atleta.email}</p></div>
          </div>
          <div className="space-y-6">
            <div><p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Nivel Técnico / ELO</p><p className="text-white font-bold uppercase">{atleta.nivel} • FIDE: {atleta.elo_fide || 'UR'}</p></div>
            <div>
              <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Motivación de Ingreso</p>
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl italic text-stone-300 text-xs leading-relaxed overflow-y-auto max-h-32">"{atleta.motivacion || 'Sin descripción proporcionada.'}"</div>
            </div>
            <div><p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Estado de Solicitud</p><span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${atleta.status === 'aprobado' ? 'bg-green-500 text-black' : 'bg-[#f39200] text-black'}`}>{atleta.status || 'En Revisión'}</span></div>
          </div>
        </div>
        <div className="p-6 bg-white/[0.02] border-t border-white/5 text-center"><button onClick={alCerrar} className="text-[10px] font-black text-stone-500 hover:text-white uppercase tracking-[0.3em] transition-all cursor-pointer">Cerrar Expediente</button></div>
      </motion.div>
    </div>,
    document.body
  );
};

// --- COMPONENTE: MODAL DIPLOMA (PORTAL) ---
const ModalDiploma = ({ atleta, alCerrar }) => {
  if (!atleta) return null;
  const manejarImpresion = (e) => { e.preventDefault(); e.stopPropagation(); window.print(); };
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto" style={{ pointerEvents: 'auto' }}>
      <div className="relative max-w-4xl w-full my-10">
        <div className="flex justify-between items-center mb-6 no-print relative z-[100]">
          <button onClick={alCerrar} className="text-white flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-all cursor-pointer bg-white/10 px-6 py-4 rounded-full border border-white/10"><X size={20}/> Cerrar</button>
          <button onClick={manejarImpresion} className="bg-[#f39200] text-black flex items-center gap-3 font-black text-[10px] uppercase tracking-widest px-10 py-5 rounded-full hover:bg-white transition-all shadow-2xl cursor-pointer active:scale-95"><Printer size={18}/> Imprimir / PDF</button>
        </div>
        <div className="diploma-container bg-white text-black p-1 mx-auto shadow-2xl relative">
          <div className="border-[15px] border-double border-[#f39200] p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden min-h-[550px] justify-center">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center"><img src={logoDelta} className="w-[80%]" alt="watermark" /></div>
            <img src={logoDelta} className="w-24 mb-6 relative z-10" alt="logo" />
            <h2 className="text-[#f39200] font-serif text-3xl md:text-5xl italic mb-2 relative z-10">Certificado de Membresía</h2>
            <p className="font-serif text-stone-500 italic mb-8 tracking-widest text-sm relative z-10">Fundación Delta Te Quiero</p>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-2 relative z-10">Se hace entrega del presente a:</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 border-b-4 border-black/10 px-12 pb-4 inline-block relative z-10">{atleta.nombre}</h1>
            <div className="max-w-2xl text-base md:text-lg font-medium leading-relaxed italic text-stone-700 mb-16 relative z-10">Por su incorporación oficial y estatus de atleta élite dentro del club de ajedrez <span className="text-black font-black not-italic mx-2">"DELTA TE QUIERO"</span>, reconociendo su disciplina y compromiso deportivo.</div>
            <div className="w-full flex justify-center items-end mt-4 relative z-10"><div className="flex flex-col items-center"><div className="w-64 border-b-2 border-black mb-4"></div><p className="text-xs font-black uppercase tracking-[0.2em]">Chugaby Hidalgo</p><p className="text-[9px] text-stone-500 font-bold uppercase mt-1 tracking-widest italic">Presidente Directiva Central</p></div></div>
          </div>
        </div>
      </div>
      <style>{`@media print {.no-print, nav, footer, button, .absolute.inset-0 { display: none !important; } body { background: white !important; overflow: hidden !important; margin: 0 !important; } .diploma-container { position: fixed !important; top: 0; left: 0; width: 100vw !important; height: 100vh !important; display: flex !important; align-items: center !important; justify-content: center !important; border: none !important; box-shadow: none !important; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } @page { size: landscape; margin: 0; }}`}</style>
    </div>,
    document.body
  );
};

// --- COMPONENTE: MODAL CARNET OFICIAL (PORTAL) ---
const ModalCarnet = ({ atleta, alCerrar }) => {
  if (!atleta) return null;
  
  const manejarImpresion = (e) => { e.preventDefault(); e.stopPropagation(); window.print(); };
  
  const numeroCarnet = `DTQ-${String(atleta.id).padStart(4, '0')}-${new Date().getFullYear()}`;
  const categoriaAtleta = obtenerCategoria(atleta.edad);
  
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto" style={{ pointerEvents: 'auto' }}>
      <div className="relative max-w-4xl w-full my-10">
        <div className="flex justify-between items-center mb-6 no-print relative z-[100]">
          <button onClick={alCerrar} className="text-white flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-all cursor-pointer bg-white/10 px-6 py-4 rounded-full border border-white/10"><X size={20}/> Cerrar</button>
          <button onClick={manejarImpresion} className="bg-[#f39200] text-black flex items-center gap-3 font-black text-[10px] uppercase tracking-widest px-10 py-5 rounded-full hover:bg-white transition-all shadow-2xl cursor-pointer active:scale-95"><Printer size={18}/> Imprimir Carnet</button>
        </div>
        
        {/* CARNET PRINCIPAL */}
        <div className="carnet-container bg-white p-1 mx-auto shadow-2xl relative" style={{ width: '450px', maxWidth: '95vw' }}>
          <div className="relative overflow-hidden rounded-lg" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 50%, #1a1a1a 100%)' }}>
            {/* Borde dorado decorativo */}
            <div className="absolute inset-0 border-[3px] border-double border-[#f39200] m-2 rounded-lg pointer-events-none"></div>
            
            {/* Header del carnet */}
            <div className="bg-gradient-to-r from-[#f39200] to-[#d4790a] px-6 py-4 relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src={logoDelta} className="w-full h-full object-contain" alt="" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <img src={logoDelta} className="w-12 h-12 object-contain" alt="logo" />
                  <div>
                    <h3 className="text-black font-black text-lg uppercase tracking-tight leading-none">Delta Te Quiero</h3>
                    <p className="text-black/70 text-[9px] font-bold uppercase tracking-widest">Club de Ajedrez</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-black font-black text-[10px] uppercase tracking-wider">Carnet Oficial</p>
                  <p className="text-black/70 text-[8px] font-bold">Miembro Activo</p>
                </div>
              </div>
            </div>
            
            {/* Cuerpo del carnet */}
            <div className="px-6 py-5 relative">
              {/* Watermark de fondo */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                <img src={logoDelta} className="w-[200px]" alt="" />
              </div>
              
              <div className="flex gap-4 relative z-10">
                {/* Foto */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-28 bg-gradient-to-br from-[#f39200]/20 to-black/40 rounded-lg overflow-hidden border-2 border-[#f39200]/30 flex items-center justify-center shadow-inner">
                    {atleta.avatar_url ? (
                      <img src={atleta.avatar_url} className="w-full h-full object-cover" alt="foto" />
                    ) : (
                      <div className="flex flex-col items-center text-[#f39200]/40">
                        <User size={40} />
                        <p className="text-[8px] mt-1">SIN FOTO</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Datos del atleta */}
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="text-[#f39200] text-[8px] font-black uppercase tracking-widest mb-0.5">Nombre del Atleta</p>
                    <h4 className="text-white font-black text-sm uppercase tracking-tight leading-tight">{atleta.nombre}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[#f39200] text-[8px] font-black uppercase tracking-widest mb-0.5">Categoría</p>
                      <p className="text-white font-bold text-xs">{categoriaAtleta}</p>
                    </div>
                    <div>
                      <p className="text-[#f39200] text-[8px] font-black uppercase tracking-widest mb-0.5">Edad</p>
                      <p className="text-white font-bold text-xs">{atleta.edad} años</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[#f39200] text-[8px] font-black uppercase tracking-widest mb-0.5">Nivel / Rating</p>
                    <p className="text-white font-bold text-xs">{atleta.nivel} • {atleta.elo_fide || 'UR'}</p>
                  </div>
                  
                  <div>
                    <p className="text-[#f39200] text-[8px] font-black uppercase tracking-widest mb-0.5">Contacto</p>
                    <p className="text-white/80 font-medium text-[10px] truncate">{atleta.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Footer del carnet */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[#f39200] text-[7px] font-black uppercase tracking-widest mb-0.5">Número de Carnet</p>
                  <p className="text-white font-black text-xs tracking-wider">{numeroCarnet}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#f39200] text-[7px] font-black uppercase tracking-widest mb-0.5">Válido Hasta</p>
                  <p className="text-white font-black text-xs">12/2026</p>
                </div>
              </div>
            </div>
            
            {/* Barra de seguridad inferior */}
            <div className="h-2 bg-gradient-to-r from-[#f39200] via-[#f39200] to-[#d4790a]"></div>
          </div>
        </div>
        
        {/* CARNET TRASERO */}
        <div className="carnet-trasero bg-white p-1 mx-auto shadow-2xl relative mt-6" style={{ width: '450px', maxWidth: '95vw' }}>
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black">
            {/* Borde dorado */}
            <div className="absolute inset-0 border-[3px] border-double border-[#f39200] m-2 rounded-lg pointer-events-none"></div>
            
            <div className="p-6 relative">
              {/* Barra de seguridad superior */}
              <div className="h-2 bg-gradient-to-r from-[#f39200] via-[#f39200] to-[#d4790a] mb-4 -mx-6"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <img src={logoDelta} className="w-10 h-10 object-contain" alt="logo" />
                <div>
                  <h4 className="text-[#f39200] font-black text-sm uppercase">Delta Te Quiero</h4>
                  <p className="text-white/50 text-[8px] font-bold uppercase tracking-widest">Club de Ajedrez</p>
                </div>
              </div>
              
              <div className="space-y-3 text-center mb-4">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Este carnet es propiedad de la</p>
                <p className="text-[#f39200] font-black text-lg italic">Fundación Delta Te Quiero</p>
                <p className="text-[9px] text-white/50 italic">Fundada y dirigida por Chugaby Hidalgo</p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-3 mb-4 border border-white/10">
                <p className="text-[8px] text-[#f39200] font-black uppercase tracking-widest mb-1">Información Importante</p>
                <p className="text-white/70 text-[9px] leading-relaxed">Este carnet es intransferible y acredita a su portador como atleta activo del club. Preséntelo cuando sea requerido por los directivos.</p>
              </div>
              
              <div className="flex justify-center gap-4">
                <div className="bg-white rounded px-3 py-1">
                  <div className="flex gap-[2px]">
                    {[...Array(12)].map((_, i) => <div key={i} className="w-1 bg-black h-3"></div>)}
                  </div>
                  <p className="text-black text-[7px] font-bold text-center mt-0.5">{numeroCarnet}</p>
                </div>
              </div>
              
              {/* Barra de seguridad inferior */}
              <div className="h-2 bg-gradient-to-r from-[#f39200] via-[#f39200] to-[#d4790a] mt-4 -mx-6 mb-[-24px] rounded-b-lg"></div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @media print {
          .no-print, nav, footer, button, .absolute.inset-0 { display: none !important; }
          body { background: white !important; overflow: hidden !important; margin: 0 !important; }
          .carnet-container, .carnet-trasero { 
            position: relative !important; 
            width: 85mm !important; 
            height: auto !important; 
            page-break-after: always;
            box-shadow: none !important;
            margin: 10px auto !important;
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          @page { size: 85mm 55mm portrait; margin: 0; }
        }
      `}</style>
    </div>,
    document.body
  );
};

// --- COMPONENTE: ADMIN PANEL ---
const AdminPanel = ({ alSalir }) => {
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [catFiltro, setCatFiltro] = useState('TODOS');
  const [editando, setEditando] = useState(null);
  const [viendoFicha, setViendoFicha] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarReportes, setMostrarReportes] = useState(false);
  const [mostrarExcelPreview, setMostrarExcelPreview] = useState(false);
  const [menuCatAbierto, setMenuCatAbierto] = useState(false);
 
  const categorias = ['TODOS', 'INFANTIL', 'CADETE', 'JUVENIL', 'LIBRE / ABSOLUTO', 'SENIOR'];

  const cargarDatos = async () => { setCargando(true); const { data } = await supabase.from('aspirantes').select('*').order('id', { ascending: false }); setRegistros(data || []); setCargando(false); };
  useEffect(() => { cargarDatos(); }, []);
  const dispararNotif = (msj, tipo='exito') => { setNotificacion({ msj, tipo }); setTimeout(() => setNotificacion(null), 3000); };
  const setStatus = async (id, s) => { await supabase.from('aspirantes').update({ status: s }).eq('id', id); dispararNotif(`Usuario ${s === 'aprobado' ? 'Aprobado' : 'en Revisión'}`); cargarDatos(); };
  const eliminarRegistro = async (id) => { if(!confirm("¿Eliminar este registro permanentemente?")) return; const { error } = await supabase.from('aspirantes').delete().eq('id', id); if (!error) { dispararNotif("Eliminado con éxito", "error"); cargarDatos(); } };
 
  const registrosFiltrados = registros.filter(r => {
    const term = busqueda.toLowerCase();
    const searchMatch = term === "" || r.nombre.toLowerCase().includes(term) || r.email.toLowerCase().includes(term);
    const catMatch = catFiltro === 'TODOS' || obtenerCategoria(r.edad) === catFiltro;
    return searchMatch && catMatch;
  });

  return (
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-10">
      <AnimatePresence>{notificacion && <NotificacionFlotante mensaje={notificacion.msj} tipo={notificacion.tipo} alCerrar={() => setNotificacion(null)} />}</AnimatePresence>
      <AnimatePresence>{editando && <ModalEditar atleta={editando} alCerrar={() => setEditando(null)} alGuardar={() => { setEditando(null); dispararNotif("Datos actualizados"); cargarDatos(); }} />}</AnimatePresence>
      <AnimatePresence>{viendoFicha && <ModalFichaDetallada atleta={viendoFicha} alCerrar={() => setViendoFicha(null)} />}</AnimatePresence>
      <AnimatePresence>{mostrarReportes && <VistaReportes registros={registrosFiltrados} alCerrar={() => setMostrarReportes(false)} />}</AnimatePresence>
      <AnimatePresence>{mostrarExcelPreview && <ExcelPreviewModal registros={registrosFiltrados} alCerrar={() => setMostrarExcelPreview(false)} />}</AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div><h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Panel <span className="text-[#f39200]">Directiva</span></h2><p className="text-[10px] text-stone-500 font-bold tracking-[0.4em] mt-2 uppercase">Delta Te Quiero Chess Administration</p></div>
        <div className="flex gap-4">
          <button onClick={() => setMostrarReportes(true)} className="flex items-center gap-2 bg-[#f39200]/10 text-[#f39200] border border-[#f39200]/30 px-6 py-3 rounded-2xl font-black text-[10px] uppercase hover:bg-[#f39200] hover:text-black transition-all cursor-pointer"><BarChart3 size={16}/> Reportes</button>
          <button onClick={() => setMostrarExcelPreview(true)} className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 px-6 py-3 rounded-2xl font-black text-[10px] uppercase hover:bg-green-500 hover:text-black transition-all cursor-pointer"><FileSpreadsheet size={16}/> Descargar Excel</button>
          <button onClick={alSalir} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-black p-4 rounded-2xl border border-red-500/20 cursor-pointer"><LogOut size={24} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="lg:col-span-2 relative text-white">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
            <input placeholder="BUSCAR POR NOMBRE O CORREO..." value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} className="w-full bg-[#0c0c0c] border border-white/10 pl-16 pr-6 py-5 rounded-2xl text-xs font-bold outline-none focus:border-[#f39200] transition-all" />
        </div>

        <div className="lg:col-span-2 relative">
            <div className="hidden lg:flex gap-2 overflow-x-auto pb-2">
                {categorias.map(c => (
                    <button key={c} onClick={() => setCatFiltro(c)} className={`whitespace-nowrap px-6 py-5 rounded-2xl text-[9px] font-black tracking-widest transition-all ${catFiltro === c ? 'bg-[#f39200] text-black' : 'bg-white/5 text-stone-500 border border-white/5 hover:border-white/20 cursor-pointer'}`}>{c}</button>
                ))}
            </div>

            <div className="lg:hidden relative">
                <button 
                  onClick={() => setMenuCatAbierto(!menuCatAbierto)}
                  className="w-full flex items-center justify-between bg-[#f39200]/10 border border-[#f39200]/30 px-6 py-5 rounded-2xl text-[10px] font-black tracking-widest text-[#f39200] uppercase"
                >
                  <span className="flex items-center gap-3">
                    <Filter size={16} />
                    {catFiltro === 'TODOS' ? 'Filtrar Categoría' : `Categoría: ${catFiltro}`}
                  </span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${menuCatAbierto ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {menuCatAbierto && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 z-[100] mt-2 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      {categorias.map(c => (
                        <button 
                          key={c} 
                          onClick={() => { setCatFiltro(c); setMenuCatAbierto(false); }}
                          className={`w-full text-left px-6 py-4 text-[9px] font-black tracking-widest border-b border-white/5 last:border-none transition-colors ${catFiltro === c ? 'bg-[#f39200] text-black' : 'text-stone-400 hover:bg-white/5'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </div>
      </div>

      <div className="bg-[#080808]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl text-white">
        <div className="overflow-x-auto"><table className="w-full text-left">
            <thead><tr className="bg-white/5 border-b border-white/5 text-[9px] font-black text-stone-500 uppercase tracking-widest"><th className="p-8">Información</th><th className="p-8">Categoría</th><th className="p-8">Nivel / ELO</th><th className="p-8 text-center">Estado de Cuenta</th><th className="p-8 text-right">Acciones</th></tr></thead>
            <tbody className="divide-y divide-white/5">{registrosFiltrados.map(r => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex-shrink-0 overflow-hidden">{r.avatar_url ? <img src={r.avatar_url} className="w-full h-full object-cover"/> : <User size={20} className="m-auto mt-3 text-stone-700"/>}</div><div><p className="font-black text-sm uppercase">{r.nombre}</p><p className="text-[10px] text-stone-500 mt-0.5">{r.email} • ID: #{r.id}</p></div></div></td>
                  <td className="p-8"><span className="bg-white/5 px-3 py-1.5 rounded-lg text-[9px] font-black border border-white/10 text-stone-300">{obtenerCategoria(r.edad)}</span></td>
                  <td className="p-8"><div className="flex items-center gap-2 text-[#f39200] font-black text-[10px] uppercase"><Star size={12} fill="currentColor"/> {r.nivel} <span className="text-white ml-2">FIDE: {r.elo_fide || 'UR'}</span></div></td>
                  <td className="p-8"><div className="flex gap-2 max-w-[220px] mx-auto"><button onClick={()=>setStatus(r.id, 'aprobado')} className={`flex-1 py-2.5 rounded-xl text-[8px] font-black border transition-all cursor-pointer ${r.status === 'aprobado' ? 'bg-green-500 text-black border-green-500' : 'text-green-500 border-green-500/20'}`}>APROBAR</button><button onClick={()=>setStatus(r.id, 'revision')} className={`flex-1 py-2.5 rounded-xl text-[8px] font-black border transition-all cursor-pointer ${r.status !== 'aprobado' ? 'bg-[#f39200] text-black border-[#f39200]' : 'text-stone-500 border-white/10'}`}>REVISIÓN</button></div></td>
                  <td className="p-8 text-right"><div className="flex justify-end gap-2">
                      <button onClick={() => setViendoFicha(r)} className="p-3 bg-white/5 rounded-xl hover:bg-white hover:text-black transition-all cursor-pointer" title="Ver Ficha Completa"><Info size={16}/></button>
                      <button onClick={() => setEditando(r)} className="p-3 bg-white/5 rounded-xl hover:bg-[#f39200] transition-all cursor-pointer"><Edit3 size={16}/></button>
                      <button onClick={() => eliminarRegistro(r.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-black transition-all cursor-pointer"><Trash2 size={16}/></button>
                  </div></td>
                </tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
};

// --- COMPONENTE: VISTA ATLETA ---
const VistaAtleta = ({ sesion, setSesion, alSalir }) => {
  const [subiendo, setSubiendo] = useState(false);
  const [verDiploma, setVerDiploma] = useState(false);
  const [verCarnet, setVerCarnet] = useState(false);
  const manejarSubidaFoto = async (e) => {
    const archivo = e.target.files[0]; if (!archivo) return;
    try {
      setSubiendo(true); const ext = archivo.name.split('.').pop(); const nombreArchivo = `atleta-${sesion.id}-${Date.now()}.${ext}`;
      await supabase.storage.from('fotos-perfil').upload(nombreArchivo, archivo);
      const { data: { publicUrl } } = supabase.storage.from('fotos-perfil').getPublicUrl(nombreArchivo);
      await supabase.from('aspirantes').update({ avatar_url: publicUrl }).eq('id', sesion.id);
      const nuevaSesion = { ...sesion, avatar_url: publicUrl }; setSesion(nuevaSesion); localStorage.setItem('delta_auth', JSON.stringify(nuevaSesion));
    } catch (err) { alert("Error"); } finally { setSubiendo(false); }
  };
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 max-w-5xl mx-auto px-6 py-10">
      <AnimatePresence>{verDiploma && <ModalDiploma atleta={sesion} alCerrar={() => setVerDiploma(false)} />}</AnimatePresence>
      <AnimatePresence>{verCarnet && <ModalCarnet atleta={sesion} alCerrar={() => setVerCarnet(false)} />}</AnimatePresence>
      <div className="bg-[#080808]/90 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-3xl flex flex-col lg:flex-row">
        <div className="bg-[#f39200] p-12 flex flex-col items-center justify-center text-black lg:w-96 relative">
          <div className="relative group w-40 h-40 bg-black/20 rounded-full border-4 border-black/5 overflow-hidden shadow-2xl flex items-center justify-center">
            {sesion.avatar_url ? <img src={sesion.avatar_url} className="w-full h-full object-cover" /> : <User size={80} className="opacity-20"/>}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              {subiendo ? <Loader2 className="animate-spin text-white"/> : <Camera className="text-white"/>}
              <input type="file" accept="image/*" className="hidden" onChange={manejarSubidaFoto} disabled={subiendo} />
            </label>
          </div>
          <h3 className="font-black uppercase text-2xl text-center mt-6 tracking-tighter italic leading-tight">{sesion.nombre}</h3>
          <p className="text-[9px] font-black bg-black text-[#f39200] px-4 py-1.5 rounded-full mt-4 uppercase tracking-widest">{obtenerCategoria(sesion.edad)}</p>
          {sesion.status === 'aprobado' && (
            <>
              <button onClick={() => setVerDiploma(true)} className="mt-8 bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all flex items-center gap-2 shadow-2xl cursor-pointer"><Award size={16} className="text-[#f39200]"/> Mi Diploma Oficial</button>
              <button onClick={() => setVerCarnet(true)} className="mt-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-110 hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all flex items-center gap-2 shadow-lg cursor-pointer border-2 border-yellow-300/50"><CreditCard size={16} className="text-black"/> Carnet Oficial</button>
            </>
          )}
        </div>
        <div className="p-10 flex-1 space-y-8">
          <div className="flex justify-between items-start border-b border-white/5 pb-6">
              <div><h4 className="text-stone-500 font-bold text-[10px] uppercase mb-1 text-stone-500">Estatus Actual</h4><p className={`font-black italic text-2xl uppercase flex items-center gap-2 ${sesion.status === 'aprobado' ? 'text-green-500' : 'text-[#f39200]'}`}><Shield size={24}/> {sesion.status || 'En Revisión'}</p></div>
              <button onClick={alSalir} className="p-4 bg-white/5 rounded-2xl hover:bg-red-500 transition-all border border-white/10 cursor-pointer"><LogOut size={20}/></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5"><p className="text-stone-600 text-[9px] font-black uppercase mb-1">Nivel Delta</p><p className="text-[#f39200] font-black text-lg italic uppercase">{sesion.nivel}</p></div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5"><p className="text-stone-600 text-[9px] font-black uppercase mb-1">Rating FIDE</p><p className="text-white font-black text-lg italic">{sesion.elo_fide || 'UR'}</p></div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5"><p className="text-stone-600 text-[9px] font-black uppercase mb-1">Contacto</p><p className="text-white font-black text-xs italic truncate">{sesion.telefono || 'SIN TEL'}</p></div>
          </div>
          <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
            <h5 className="text-[10px] font-black text-[#f39200] uppercase tracking-widest mb-4 flex items-center gap-2"><FileText size={14}/> Mi Motivación Registrada</h5>
            <p className="text-stone-400 text-sm italic leading-relaxed">"{sesion.motivacion || 'No proporcionaste una motivación al registrarte.'}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE: LAYOUT BASE ---
const LayoutBase = ({ children, piezas }) => (
  <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden relative">
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    <div className="absolute inset-0 z-0 pointer-events-none">{piezas.map((p) => (<motion.img key={p.id} src={p.data.img} initial={{ y: '115vh', opacity: 0 }} animate={{ y: '-25vh', opacity: [0, 0.4, 0.4, 0], rotate: p.rotation }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} className="absolute w-20 md:w-28 object-contain" style={{ left: p.left, scale: p.scale, filter: p.data.tipo === 'vidrio' ? 'drop-shadow(0 0 15px rgba(243,146,0,0.3))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }} />))}</div>
    {children}
  </div>
);

// --- COMPONENTE: EXCEL PREVIEW MODAL ---
const ExcelPreviewModal = ({ registros, alCerrar }) => {
  const [descargando, setDescargando] = useState(false);

  // Preparar datos para Excel
  const prepararDatosExcel = () => {
    return registros.map((r, idx) => ({
      '#': idx + 1,
      'ID': r.id,
      'NOMBRE': r.nombre,
      'EMAIL': r.email,
      'TELÉFONO': r.telefono || 'N/A',
      'EDAD': r.edad,
      'CATEGORÍA': obtenerCategoria(r.edad),
      'NIVEL': r.nivel,
      'ELO FIDE': r.elo_fide || 'N/A',
      'ESTATUS': r.status === 'aprobado' ? 'Aprobado' : 'En Revisión',
      'FECHA': new Date().toLocaleDateString('es-ES')
    }));
  };

  // Descargar archivo Excel
  const descargarExcel = async () => {
    setDescargando(true);
    try {
      const data = prepararDatosExcel();
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Atletas Delta");
      
      // Estilos para las columnas
      const colWidths = [
        { wch: 5 },  // #
        { wch: 8 },  // ID
        { wch: 30 }, // NOMBRE
        { wch: 35 }, // EMAIL
        { wch: 15 }, // TELÉFONO
        { wch: 8 },  // EDAD
        { wch: 20 }, // CATEGORÍA
        { wch: 20 }, // NIVEL
        { wch: 12 }, // ELO FIDE
        { wch: 15 }, // ESTATUS
        { wch: 15 }  // FECHA
      ];
      worksheet['!cols'] = colWidths;
      
      const fileName = `DeltaChess_Atletas_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error('Error al descargar:', error);
      alert('Error al generar el archivo Excel');
    } finally {
      setDescargando(false);
    }
  };

  // Descargar para móvil (comparte o guarda)
  const descargarParaMovil = async () => {
    setDescargando(true);
    try {
      const data = prepararDatosExcel();
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Atletas Delta");
      
      const fileName = `DeltaChess_Atletas_${new Date().toISOString().split('T')[0]}.xlsx`;
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      
      // Para móviles: crear enlace y simular click
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al descargar');
    } finally {
      setDescargando(false);
    }
  };

  const datosPreview = prepararDatosExcel().slice(0, 10);

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-[#020202] overflow-y-auto"
    >
      <div className="min-h-screen p-4 md:p-8">
        {/* ENCABEZADO */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase text-white">
                Vista Previa <span className="text-[#f39200]">Excel</span>
              </h2>
              <p className="text-[10px] text-stone-500 font-bold tracking-widest mt-1">
                {registros.length} registros encontrados
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={descargarExcel}
                disabled={descargando}
                className="flex items-center justify-center gap-2 bg-[#f39200] text-black px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl cursor-pointer disabled:opacity-50"
              >
                {descargando ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                DESCARGAR PC
              </button>
              <button 
                onClick={descargarParaMovil}
                disabled={descargando}
                className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all cursor-pointer disabled:opacity-50"
              >
                {descargando ? <Loader2 className="animate-spin" size={18} /> : <Smartphone size={18} />}
                DESCARGAR MÓVIL
              </button>
              <button 
                onClick={alCerrar}
                className="flex items-center justify-center gap-2 bg-white/5 text-stone-400 border border-white/10 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-white hover:border-white/30 transition-all cursor-pointer"
              >
                <X size={18} />
                CERRAR
              </button>
            </div>
          </div>

          {/* TABLA EXCEL PREVIEW */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f39200] text-black text-[9px] font-black uppercase tracking-wider">
                    <th className="py-4 px-3">#</th>
                    <th className="py-4 px-3">ID</th>
                    <th className="py-4 px-3">NOMBRE</th>
                    <th className="py-4 px-3">EMAIL</th>
                    <th className="py-4 px-3">TEL</th>
                    <th className="py-4 px-3">EDAD</th>
                    <th className="py-4 px-3">CATEGORÍA</th>
                    <th className="py-4 px-3">NIVEL</th>
                    <th className="py-4 px-3">ELO</th>
                    <th className="py-4 px-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-[10px]">
                  {datosPreview.map((r, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-3 text-stone-400 font-mono">{r['#']}</td>
                      <td className="py-3 px-3 text-stone-400 font-mono">#{r['ID']}</td>
                      <td className="py-3 px-3 font-bold text-stone-800 uppercase">{r['NOMBRE']}</td>
                      <td className="py-3 px-3 text-stone-500">{r['EMAIL']}</td>
                      <td className="py-3 px-3 text-stone-500">{r['TELÉFONO']}</td>
                      <td className="py-3 px-3 text-stone-500">{r['EDAD']}</td>
                      <td className="py-3 px-3">
                        <span className="bg-[#f39200]/10 text-[#f39200] px-2 py-1 rounded-full text-[8px] font-black uppercase">
                          {r['CATEGORÍA']}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-stone-500">{r['NIVEL']}</td>
                      <td className="py-3 px-3 text-stone-500">{r['ELO FIDE']}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase ${r['ESTATUS'] === 'Aprobado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {r['ESTATUS']}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {registros.length > 10 && (
              <div className="bg-stone-50 p-4 text-center text-[10px] text-stone-500 font-bold">
                Mostrando 10 de {registros.length} registros. El archivo Excel contendrá todos los registros.
              </div>
            )}
          </div>

          {/* INFO ADICIONAL */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-stone-400 text-xs font-bold mb-3">
              <FileSpreadsheet size={18} className="text-[#f39200]" />
              <span className="uppercase tracking-widest">Información del Archivo</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
              <div>
                <p className="text-stone-500 uppercase tracking-wider">Total Registros</p>
                <p className="text-white font-black text-lg">{registros.length}</p>
              </div>
              <div>
                <p className="text-stone-500 uppercase tracking-wider">Aprobados</p>
                <p className="text-green-400 font-black text-lg">{registros.filter(r => r.status === 'aprobado').length}</p>
              </div>
              <div>
                <p className="text-stone-500 uppercase tracking-wider">En Revisión</p>
                <p className="text-orange-400 font-black text-lg">{registros.filter(r => r.status !== 'aprobado').length}</p>
              </div>
              <div>
                <p className="text-stone-500 uppercase tracking-wider">Fecha</p>
                <p className="text-white font-black">{new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

const ModalEditar = ({ atleta, alCerrar, alGuardar }) => {
  const [datos, setDatos] = useState({ ...atleta });
  const [guardando, setGuardando] = useState(false);
  const manejarCambio = (e) => { const { name, value } = e.target; setDatos(prev => ({ ...prev, [name]: value })); };
  const enviarEdicion = async () => {
    setGuardando(true);
    try {
      await supabase.from('aspirantes').update({ 
        nombre: datos.nombre.toUpperCase(), 
        email: datos.email.toLowerCase(), 
        edad: parseInt(datos.edad), 
        nivel: datos.nivel, 
        elo_fide: datos.elo_fide ? parseInt(datos.elo_fide) : null, 
        telefono: datos.telefono,
        motivacion: datos.motivacion,
        status: datos.status
      }).eq('id', datos.id);
      alGuardar();
    } catch (error) { alert("Error"); } finally { setGuardando(false); }
  };
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md text-white">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#111] border border-[#f39200]/30 p-8 rounded-[2.5rem] max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#f39200] font-black uppercase text-xs tracking-widest italic">Editar Atleta #{atleta.id}</h3>
          <button onClick={alCerrar} className="text-stone-500 hover:text-white cursor-pointer"><X size={20}/></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Nombre Completo</label>
            <input name="nombre" value={datos.nombre} onChange={manejarCambio} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all" placeholder="NOMBRE COMPLETO" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Correo Electrónico</label>
              <input name="email" type="email" value={datos.email} onChange={manejarCambio} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all" />
            </div>
            <div>
              <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Teléfono</label>
              <input name="telefono" value={datos.telefono || ''} onChange={manejarCambio} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all" placeholder="TELÉFONO" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Edad</label>
              <input name="edad" type="number" value={datos.edad} onChange={manejarCambio} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all" />
            </div>
            <div>
              <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Nivel</label>
              <select name="nivel" value={datos.nivel} onChange={manejarCambio} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all cursor-pointer">
                <option value="PRINCIPIANTE">PRINCIPIANTE</option>
                <option value="INTERMEDIO">INTERMEDIO</option>
                <option value="AVANZADO">AVANZADO</option>
                <option value="ELITE">ELITE</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">ELO FIDE</label>
              <input name="elo_fide" type="number" value={datos.elo_fide || ''} onChange={manejarCambio} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all" placeholder="UR si no tiene" />
            </div>
          </div>
          
          <div>
            <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Estado de Cuenta</label>
            <select name="status" value={datos.status} onChange={manejarCambio} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all cursor-pointer">
              <option value="revision">EN REVISIÓN</option>
              <option value="aprobado">APROBADO</option>
            </select>
          </div>
          
          <div>
            <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Motivación de Ingreso</label>
            <textarea name="motivacion" value={datos.motivacion || ''} onChange={manejarCambio} rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-[#f39200] transition-all resize-none" placeholder="Motivación del atleta..." />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button onClick={enviarEdicion} disabled={guardando} className="flex-1 bg-[#f39200] text-black font-black py-4 rounded-xl uppercase text-[10px] cursor-pointer hover:bg-[#e88500] transition-all disabled:opacity-50">
              {guardando ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
            </button>
            <button onClick={alCerrar} className="px-8 bg-white/5 text-stone-500 font-black py-4 rounded-xl uppercase text-[10px] hover:bg-white/10 transition-all cursor-pointer">
              CANCELAR
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const NotificacionFlotante = ({ mensaje, tipo, alCerrar }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl shadow-2xl min-w-[300px]">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tipo === 'exito' ? 'bg-green-500' : 'bg-red-500'}`}>{tipo === 'exito' ? <CheckCircle size={16}/> : <AlertTriangle size={16}/>}</div>
    <p className="text-[10px] font-black uppercase text-white flex-1">{mensaje}</p>
    <button onClick={alCerrar} className="text-stone-500"><X size={14}/></button>
  </motion.div>
);

const Login = ({ alLoguear }) => {
  const [email, setEmail] = useState(''); const [pass, setPass] = useState(''); const [error, setError] = useState(null); const navigate = useNavigate();
  const manejarEntrada = async (e) => {
    e.preventDefault();
    if (email === 'admin@deltatequiero.com' && pass === 'DELTA2026') { alLoguear({ rol: 'admin', nombre: 'DIRECTIVA DELTA' }); navigate('/admin'); return; }
    const { data } = await supabase.from('aspirantes').select('*').eq('email', email.toLowerCase().trim()).eq('password', pass).single();
    if (data) { alLoguear({ ...data, rol: 'atleta' }); navigate('/perfil'); } else { setError('Credenciales Incorrectas'); setTimeout(() => setError(null), 3000); }
  };
  return (
    <div className="relative z-10 flex items-center justify-center min-h-[70vh]">
      <AnimatePresence>{error && <NotificacionFlotante mensaje={error} tipo="error" alCerrar={() => setError(null)} />}</AnimatePresence>
      <div className="max-w-xs w-full text-center space-y-6 bg-[#080808]/90 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl text-white">
        <Lock size={40} className="mx-auto text-[#f39200]"/><h2 className="text-xl font-black uppercase tracking-tighter italic">SISTEMA <span className="text-[#f39200]">DELTA</span></h2>
        <form onSubmit={manejarEntrada} className="space-y-4">
          <input required type="email" placeholder="CORREO" onChange={(e)=>setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-center outline-none text-xs font-bold" />
          <input required type="password" placeholder="CLAVE" onChange={(e)=>setPass(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-center outline-none text-xs font-bold" />
          <button type="submit" className="w-full bg-[#f39200] text-black font-black py-4 rounded-xl text-[10px] uppercase cursor-pointer">ENTRAR</button>
        </form>
        <Link to="/" className="block text-stone-600 text-[9px] font-bold uppercase hover:text-white transition">Volver al Registro</Link>
      </div>
    </div>
  );
};

// --- COMPONENTE: RANKING MODAL ---
const RankingModal = ({ alCerrar }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('TODOS');
  const [rankings, setRankings] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      setCargando(true);
      const { data } = await supabase
        .from('aspirantes')
        .select('nombre, edad, elo_fide, nivel, status')
        .eq('status', 'aprobado')
        .not('elo_fide', 'is', null)
        .gt('elo_fide', 0)
        .order('elo_fide', { ascending: false });
      
      if (data) {
        const conCategoria = data.map((r, idx) => ({
          ...r,
          categoria: obtenerCategoria(r.edad),
          posicion: idx + 1
        }));
        setRankings(conCategoria);
      }
      setCargando(false);
    };
    fetchRankings();
  }, []);

  const categorias = ['TODOS', 'INFANTIL', 'CADETE', 'JUVENIL', 'SENIOR', 'LIBRE / ABSOLUTO'];
  
  const rankingsFiltrados = categoriaSeleccionada === 'TODOS' 
    ? rankings 
    : rankings.filter(r => r.categoria === categoriaSeleccionada);

  const obtenerMedalla = (pos) => {
    if (pos === 1) return '🥇';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `#${pos}`;
  };

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-[#020202]/95 backdrop-blur-xl overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Trophy className="text-[#f39200]" size={32} />
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">RANKING</h2>
              <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Clasificación por ELO</p>
            </div>
          </div>
          <button 
            onClick={alCerrar}
            className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-[#f39200] hover:border-[#f39200] transition-all"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Categorías Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                categoriaSeleccionada === cat
                  ? 'bg-[#f39200] text-black'
                  : 'bg-white/5 border border-white/10 text-stone-400 hover:border-[#f39200]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de Rankings */}
        {cargando ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#f39200]" size={48} />
          </div>
        ) : rankingsFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <Users className="mx-auto text-stone-600 mb-4" size={48} />
            <p className="text-stone-500 font-bold uppercase text-sm">No hay atletas en esta categoría</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rankingsFiltrados.map((r, idx) => (
              <motion.div
                key={r.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  idx === 0 
                    ? 'bg-gradient-to-r from-[#f39200]/20 to-transparent border-[#f39200]/50' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-xl text-xl font-black">
                  {obtenerMedalla(idx + 1)}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-black text-sm uppercase">{r.nombre}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] font-bold text-[#f39200] bg-[#f39200]/10 px-2 py-1 rounded-lg uppercase">
                      {r.categoria}
                    </span>
                    <span className="text-[9px] font-bold text-stone-500 uppercase">
                      {r.nivel}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#f39200]">{r.elo_fide || '—'}</p>
                  <p className="text-[9px] text-stone-500 uppercase font-bold">ELO</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [piezas, setPiezas] = useState([]); const [sesion, setSesion] = useState(null); const [cargandoSesion, setCargandoSesion] = useState(true);
  const [tieneElo, setTieneElo] = useState(false); const [nivel, setNivel] = useState('Principiante'); const [enviando, setEnviando] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false); const [totalAtletas, setTotalAtletas] = useState('...');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [menuHamburguesa, setMenuHamburguesa] = useState(false);
  const [mostrarRanking, setMostrarRanking] = useState(false);

  useEffect(() => {
    const fetchTotal = async () => { const { count } = await supabase.from('aspirantes').select('*', { count: 'exact', head: true }); if(count !== null) setTotalAtletas(count); }; fetchTotal();
    const guardada = localStorage.getItem('delta_auth'); if (guardada) setSesion(JSON.parse(guardada)); setCargandoSesion(false);
    setPiezas(Array.from({ length: 20 }, (_, i) => generarPiezaEspacial(i, window.innerWidth < 768)));

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
    });
  }, []);

  const login = (d) => { localStorage.setItem('delta_auth', JSON.stringify(d)); setSesion(d); };
  const logout = () => { localStorage.removeItem('delta_auth'); setSesion(null); };

  const ejecutarInstalacion = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert("INSTRUCCIONES:\n1. En Android: Pulsa los 3 puntos y 'Instalar Aplicación'.\n2. En iPhone: Pulsa 'Compartir' y 'Añadir a pantalla de inicio'.");
    }
  };

  const manejarRegistro = async (e) => {
    e.preventDefault(); setEnviando(true); const form = e.target;
    const nuevo = { nombre: form.nombre.value.toUpperCase(), email: form.email.value.toLowerCase().trim(), password: form.password.value, telefono: form.telefono.value, edad: parseInt(form.edad.value) || 0, elo_fide: tieneElo ? parseInt(form.elo.value) : null, nivel, motivacion: form.motivacion.value, status: 'revision' };
    try { await supabase.from('aspirantes').insert([nuevo]); setMostrarModalExito(true); form.reset(); } catch (error) { alert("Error"); } finally { setEnviando(false); }
  };

  if (cargandoSesion) return null;

  return (
    <Router>
      <LayoutBase piezas={piezas}>
        <AnimatePresence>{mostrarModalExito && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 p-6"><div className="bg-[#080808] border border-[#f39200] p-10 rounded-[2.5rem] text-center max-w-xs w-full"><CheckCircle size={50} className="text-[#f39200] mx-auto mb-4"/><h3 className="text-white font-black uppercase mb-2">Solicitud Enviada</h3><button onClick={()=>setMostrarModalExito(false)} className="w-full bg-[#f39200] text-black font-black py-3 rounded-xl text-[10px] cursor-pointer">ENTENDIDO</button></div></motion.div>)}</AnimatePresence>
        
        {/* Ranking Modal */}
        <AnimatePresence>
          {mostrarRanking && <RankingModal alCerrar={() => setMostrarRanking(false)} />}
        </AnimatePresence>
        
        <nav className="relative z-50 p-6 md:p-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6">
          <Link to="/" className="flex items-center gap-6 text-white"><img src={logoDelta} className="w-16 h-16 md:w-20 object-contain"/><div className="border-l-2 border-[#f39200]/30 pl-6 text-left"><h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none italic">DELTA <span className="text-[#f39200]">TE QUIERO</span></h1><p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold">Chess Elite Club</p></div></Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            <button 
              onClick={() => setMostrarRanking(true)}
              className="flex items-center gap-2 bg-[#f39200]/10 border border-[#f39200]/30 px-6 py-3 rounded-full text-[10px] font-black uppercase text-[#f39200] hover:bg-[#f39200] hover:text-black transition-all"
            >
              <Trophy size={16} /> RANKING
            </button>
            {sesion ? <Link to={sesion.rol === 'admin' ? '/admin' : '/perfil'} className="bg-[#f39200] text-black px-8 py-3 rounded-full text-[10px] font-black uppercase transition-all">MI CUENTA</Link> : <Link to="/login" className="bg-white/5 border border-white/10 px-8 py-3 rounded-full text-[10px] font-black uppercase hover:bg-[#f39200] hover:text-black transition-all">LOGIN</Link>}
          </div>
          
          {/* Mobile Hamburger Menu */}
          <div className="flex md:hidden gap-3 items-center">
            <button 
              onClick={() => setMostrarRanking(true)}
              className="flex items-center gap-2 bg-[#f39200]/10 border border-[#f39200]/30 p-3 rounded-full text-[#f39200] hover:bg-[#f39200] hover:text-black transition-all"
            >
              <Trophy size={20} />
            </button>
            <button 
              onClick={() => setMenuHamburguesa(!menuHamburguesa)}
              className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-[#f39200] hover:border-[#f39200] transition-all"
            >
              <Menu size={20} className="text-white" />
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuHamburguesa && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden"
            >
              <div className="flex flex-col gap-4 max-w-7xl mx-auto">
                {sesion ? (
                  <Link 
                    to={sesion.rol === 'admin' ? '/admin' : '/perfil'} 
                    onClick={() => setMenuHamburguesa(false)}
                    className="bg-[#f39200] text-black px-8 py-4 rounded-2xl text-[12px] font-black uppercase text-center transition-all"
                  >
                    MI CUENTA
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setMenuHamburguesa(false)}
                    className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-[12px] font-black uppercase text-center hover:bg-[#f39200] hover:text-black transition-all"
                  >
                    LOGIN
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Routes>
          <Route path="/" element={
            <main className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 py-10 items-center">
              <div className="lg:col-span-6 text-center lg:text-left space-y-8">
                <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">JUEGA COMO <span className="text-[#f39200]">MAESTRO</span></h2>
                <p className="text-stone-400 text-sm md:text-lg max-w-md mx-auto lg:mx-0 font-medium italic">Domina el tablero en el epicentro del ajedrez regional, Nacional e Internacional</p>
                <div className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg mt-8">
                      {[{ l: 'Sede', v: '01', i: <MapPin size={14}/> }, { l: 'Atletas', v: totalAtletas, i: <Users size={14}/> }, { l: 'Categorías', v: '05', i: <Trophy size={14}/> }, { l: 'Ranking', v: 'FIDE', i: <Star size={14}/> }].map((st, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl group hover:border-[#f39200]/50 transition-all">
                          <div className="text-[#f39200] mb-2">{st.i}</div>
                          <p className="text-xl font-black">{st.v}</p>
                          <p className="text-[8px] font-bold text-stone-500 uppercase">{st.l}</p>
                        </div>))}
                    </div>
                    <button onClick={ejecutarInstalacion} className="flex items-center gap-3 bg-white/5 border border-[#f39200]/40 text-[#f39200] px-10 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#f39200] hover:text-black transition-all shadow-2xl group cursor-pointer w-full md:w-auto justify-center"><Download size={20} className="group-hover:animate-bounce" /> DESCARGAR APP</button>
                </div>
              </div>
              <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
                <form onSubmit={manejarRegistro} className="bg-[#080808]/90 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-4">
                  <input required name="nombre" placeholder="NOMBRE COMPLETO" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white font-bold outline-none" />
                  <div className="grid grid-cols-2 gap-3"><input required name="email" type="email" placeholder="CORREO" className="bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-bold outline-none" /><input required name="password" type="password" placeholder="CLAVE" className="bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-bold outline-none" /></div>
                  <div className="grid grid-cols-12 gap-3"><input required name="telefono" className="col-span-8 bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-bold outline-none" placeholder="TELÉFONO" /><input required name="edad" type="number" className="col-span-4 bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-bold outline-none" placeholder="EDAD" /></div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex justify-between px-4"><span className="text-[9px] font-bold text-stone-500 uppercase italic">¿ELO FIDE?</span><div className="flex gap-2"><button type="button" onClick={()=>setTieneElo(true)} className={`px-4 py-2 rounded-lg text-[9px] font-black ${tieneElo ? 'bg-[#f39200] text-black' : 'bg-white/5 text-stone-700'}`}>SÍ</button><button type="button" onClick={()=>setTieneElo(false)} className={`px-4 py-2 rounded-lg text-[9px] font-black ${!tieneElo ? 'bg-[#f39200] text-black' : 'bg-white/5 text-stone-700'}`}>NO</button></div></div>
                  <AnimatePresence>{tieneElo && <motion.input required name="elo" initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} type="number" placeholder="TU RATING ELO" className="w-full bg-[#f39200]/10 border border-[#f39200]/40 p-4 rounded-xl text-xs text-[#f39200] font-black outline-none" />}</AnimatePresence>
                  <div className="space-y-2"><p className="text-[9px] font-black text-[#f39200] uppercase tracking-widest">Nivel</p><div className="grid grid-cols-2 gap-2">{['Principiante', 'Intermedio', 'Avanzado', 'Maestro'].map(n => <button key={n} type="button" onClick={()=>setNivel(n)} className={`py-3 rounded-xl border text-[9px] font-bold uppercase ${nivel===n ? 'border-[#f39200] bg-[#f39200]/20 text-[#f39200]' : 'border-white/5 text-stone-600'}`}>{n}</button>)}</div></div>
                  <textarea required name="motivacion" rows="2" placeholder="¿POR QUÉ QUIERES UNIRTE?" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white font-bold outline-none resize-none" ></textarea>
                  <button type="submit" disabled={enviando} className="w-full bg-[#f39200] text-black font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all cursor-pointer">{enviando ? "ENVIANDO..." : "SOLICITAR INGRESO"}</button>
                </form>
              </div>
            </main>
          } />
          <Route path="/login" element={<Login alLoguear={login} />} />
          <Route path="/perfil" element={sesion?.rol === 'atleta' ? <VistaAtleta sesion={sesion} setSesion={setSesion} alSalir={logout} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={sesion?.rol === 'admin' ? <AdminPanel alSalir={logout} /> : <Navigate to="/login" />} />
        </Routes>
        <footer className="relative z-10 w-full p-10 flex flex-col md:flex-row justify-between items-center text-[9px] text-stone-700 font-bold uppercase tracking-[0.4em] gap-4 border-t border-white/5 mt-10"><div><MapPin size={12} className="inline mr-2 text-[#f39200]" /> Tucupita, Venezuela</div><div>Fundación Delta Te Quiero • 2026</div></footer>
      </LayoutBase>
    </Router>
  );
}