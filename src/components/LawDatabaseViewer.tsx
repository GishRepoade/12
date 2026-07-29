import React, { useState, useMemo, useEffect, useRef } from 'react';
import { QUANT_LAWS } from '../data/lawsData';
import { LawArticle } from '../types';
import { Search, Copy, Check, Star, RotateCcw } from 'lucide-react';

export const LawDatabaseViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLawId, setSelectedLawId] = useState<string | 'all'>('all');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('quant_law_favorites');
      return saved ? JSON.parse(saved) : ['sk_17.7', 'kk_10.12', 'pk_1.1', 'ak_7.7'];
    } catch {
      return ['sk_17.7', 'kk_10.12', 'pk_1.1', 'ak_7.7'];
    }
  });

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>('sk_17.7');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quant_law_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Ctrl+K keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFavorite = (artId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favorites.includes(artId)) {
      setFavorites(favorites.filter((id) => id !== artId));
    } else {
      setFavorites([...favorites, artId]);
    }
  };

  // Flatten all articles with parent law metadata
  const allArticles = useMemo(() => {
    const list: (LawArticle & { dotColor: string; shortCode: string })[] = [];
    QUANT_LAWS.forEach((doc) => {
      doc.articles.forEach((art) => {
        list.push({
          ...art,
          dotColor: doc.dotColor || '#06b6d4',
          shortCode: doc.shortCode || doc.shortTitle
        });
      });
    });
    return list;
  }, []);

  // Total count of articles across all laws
  const totalArticlesCount = allArticles.length;

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      if (filterFavorites && !favorites.includes(art.id)) return false;
      if (selectedLawId !== 'all' && art.lawId !== selectedLawId) return false;

      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase();
      return (
        art.articleNumber.toLowerCase().includes(q) ||
        art.title.toLowerCase().includes(q) ||
        art.content.toLowerCase().includes(q) ||
        art.shortCode.toLowerCase().includes(q) ||
        art.lawName.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [allArticles, selectedLawId, filterFavorites, favorites, searchTerm]);

  // Currently selected article object
  const selectedArticle = useMemo(() => {
    if (!selectedArticleId) return filteredArticles[0] || allArticles[0];
    return allArticles.find((a) => a.id === selectedArticleId) || filteredArticles[0] || allArticles[0];
  }, [selectedArticleId, filteredArticles, allArticles]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#0b0d10] border border-[#1f242d] rounded-2xl overflow-hidden shadow-2xl text-slate-200 flex flex-col font-sans min-h-[720px]">
      
      {/* Top Protocol Bar */}
      <div className="bg-[#12151b] border-b border-[#1f242d] px-5 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Title & Version emblem */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30 flex items-center justify-center font-bold text-xs shadow-inner shrink-0">
            ⚖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-wider uppercase text-white">
                Законодавча База
              </h2>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                PROTOCOL v1.3.1
              </span>
            </div>
          </div>
        </div>

        {/* Universal Search Bar */}
        <div className="relative flex-1 max-w-md min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Пошук по статтям (напр. 17.7, 10.12, Міранда, ЗОТ)..."
            className="w-full bg-[#08090c] border border-[#222732] rounded-lg pl-9 pr-14 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-all"
          />
          <kbd className="absolute right-2.5 top-2 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-[#161a22] border border-slate-700 rounded">
            Ctrl K
          </kbd>
        </div>

      </div>

      {/* Main 3-Column Protocol Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-[640px]">
        
        {/* LEFT COLUMN: CODES & LAWS LIST (md:col-span-3) */}
        <div className="md:col-span-3 bg-[#111318] border-r border-[#1f242d] p-3 flex flex-col justify-between space-y-3">
          
          <div className="space-y-3">
            {/* Codes Header */}
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#1f242d]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Кодекси
              </span>
              <button
                onClick={() => {
                  setSelectedLawId('all');
                  setFilterFavorites(false);
                  setSearchTerm('');
                }}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                title="Скинути фільтри"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Favorites item */}
            <button
              onClick={() => {
                setFilterFavorites(!filterFavorites);
                setSelectedLawId('all');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                filterFavorites
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-300 hover:bg-[#181c24]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Star className={`w-3.5 h-3.5 ${filterFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                <span>Обране</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1b1f28] text-slate-400">
                {favorites.length}
              </span>
            </button>

            {/* All Codes Sub-header */}
            <div className="px-2 text-[10px] font-bold uppercase text-slate-500 tracking-wider pt-2">
              Всі кодекси
            </div>

            {/* Laws Navigation Items */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
              <button
                onClick={() => {
                  setSelectedLawId('all');
                  setFilterFavorites(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  selectedLawId === 'all' && !filterFavorites
                    ? 'bg-[#1a202c] text-white font-bold border-l-2 border-emerald-500'
                    : 'text-slate-400 hover:bg-[#161a22] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span>Усі нормативні акти</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">ALL</span>
              </button>

              {QUANT_LAWS.map((doc) => {
                const isSelected = selectedLawId === doc.id && !filterFavorites;
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedLawId(doc.id);
                      setFilterFavorites(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#18202d] text-white font-bold border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:bg-[#161a22] hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: doc.dotColor }}
                      ></span>
                      <span className="truncate">{doc.shortTitle}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {doc.shortCode}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* MIDDLE COLUMN: ARTICLES LIST (md:col-span-4) */}
        <div className="md:col-span-4 bg-[#0e1014] border-r border-[#1f242d] p-3 flex flex-col space-y-3">
          
          {/* Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#1f242d]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Статті
            </span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {filteredArticles.length} / {totalArticlesCount}
            </span>
          </div>

          {/* Articles list */}
          <div className="space-y-1.5 overflow-y-auto max-h-[580px] pr-1 custom-scrollbar">
            {filteredArticles.length === 0 ? (
              <div className="text-center text-slate-500 text-xs py-12 px-4">
                Статей за даним запитом не знайдено.
              </div>
            ) : (
              filteredArticles.map((art) => {
                const isSelected = selectedArticle?.id === art.id;
                const isFav = favorites.includes(art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticleId(art.id)}
                    className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col space-y-1.5 ${
                      isSelected
                        ? 'bg-[#161d27] border-emerald-500/70 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-[#12141a] border-[#1f242d] hover:border-slate-700 hover:bg-[#151821]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded text-slate-950"
                          style={{ backgroundColor: art.dotColor }}
                        >
                          {art.shortCode}
                        </span>
                        <span className="text-xs font-bold text-white font-mono">
                          {art.articleNumber}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleFavorite(art.id, e)}
                        className="text-slate-600 hover:text-amber-400 p-1 transition-colors"
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {art.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {art.content}
                    </p>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: READING PANE (md:col-span-5) */}
        <div className="md:col-span-5 bg-[#0b0d10] p-6 flex flex-col justify-between">
          
          {selectedArticle ? (
            <div className="space-y-6">
              
              {/* Article Top Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1f242d]">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 text-xs font-mono font-bold rounded text-slate-950"
                      style={{ backgroundColor: selectedArticle.dotColor }}
                    >
                      {selectedArticle.shortCode}
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      Стаття {selectedArticle.articleNumber}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    {selectedArticle.title}
                  </h3>
                  {selectedArticle.chapter && (
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {selectedArticle.chapter} ({selectedArticle.lawName})
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleFavorite(selectedArticle.id)}
                  className="p-2 rounded-lg bg-[#161a22] border border-slate-800 text-slate-400 hover:text-amber-400 transition-all"
                  title="Додати в обране"
                >
                  <Star
                    className={`w-4 h-4 ${
                      favorites.includes(selectedArticle.id) ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Main Content Box */}
              <div className="bg-[#12151b] border border-[#1f242d] rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Текст статті:
                </span>
                <p className="text-xs text-slate-100 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedArticle.content}
                </p>
              </div>

              {/* Tags */}
              {selectedArticle.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#141720] text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1f242d] flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    handleCopy(
                      `${selectedArticle.lawName} (ст. ${selectedArticle.articleNumber}): ${selectedArticle.title} — ${selectedArticle.content}`,
                      'full'
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md"
                >
                  {copiedId === 'full' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Скопійовано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Скопіювати статтю</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    handleCopy(
                      `[${selectedArticle.shortCode} ${selectedArticle.articleNumber}]`,
                      'cite'
                    )
                  }
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161a22] hover:bg-[#1f2430] text-slate-200 font-medium text-xs border border-slate-800 transition-all"
                >
                  {copiedId === 'cite' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Скопійовано код</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Скопіювати посилання [{selectedArticle.shortCode} {selectedArticle.articleNumber}]</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2 py-20">
              <span className="text-3xl">⚖</span>
              <p className="text-xs font-medium">Виберіть статтю зі списку</p>
            </div>
          )}

          <div className="text-[10px] font-mono text-slate-600 text-right pt-4">
            База заповнена 2026 • Quant RP Protocol
          </div>

        </div>

      </div>

    </div>
  );
};
