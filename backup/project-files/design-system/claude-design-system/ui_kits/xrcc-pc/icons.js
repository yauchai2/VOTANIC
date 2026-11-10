/* Stand-in icon sprite (stroke style, 24px grid, 1.5px). The real XRCC icons live in the Figma Library
   as icon/outline/<name> (~280) and icon/solid/<name> (~50). Swap these for the real exports when available. */
(function(){
  const P={
   close:'<path d="M6 6l12 12M18 6L6 18"/>',
   search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
   bug:'<path d="M9 8a3 3 0 016 0v8a3 3 0 01-6 0V8zM12 8v10M9 11H5M15 11h4M9 15H5.5M15 15h3.5M10 5L8.5 3.5M14 5l1.5-1.5"/>',
   file:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
   warning:'<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.2v.1"/>',
   target:'<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
   more:'<path d="M6 12h.01M12 12h.01M18 12h.01" stroke-width="3"/>',
   add:'<path d="M12 5v14M5 12h14"/>',
   check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
   'check-circle':'<circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l3 3 5-6"/>',
   info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.1"/>',
   home:'<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
   setting:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
   headset:'<path d="M3 9a3 3 0 013-3h12a3 3 0 013 3v5a3 3 0 01-3 3h-3l-2-2-2 2H6a3 3 0 01-3-3z"/>',
   download:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
   package:'<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
   bell:'<path d="M6 17V11a6 6 0 0112 0v6l1.5 2h-15zM10 21h4"/>',
   play:'<path d="M8 5l11 7-11 7z"/>',
   edit:'<path d="M4 20l1-4L16 5l3 3L8 19z"/>',
   copy:'<rect x="8" y="8" width="11" height="12" rx="2"/><path d="M5 16V6a2 2 0 012-2h8"/>',
   'arrow-right':'<path d="M5 12h14M13 6l6 6-6 6"/>',
   'chevron-down':'<path d="M6 9l6 6 6-6"/>',
   'chevron-right':'<path d="M9 6l6 6-6 6"/>',
   lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
   cloud:'<path d="M7 18a4 4 0 01-.5-8 5.5 5.5 0 0110.7 1A3.5 3.5 0 0117 18z"/>',
   key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l3 3"/>',
   user:'<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0116 0"/>',
   folder:'<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
   plug:'<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4"/>',
   library:'<rect x="4" y="4" width="4" height="16" rx="1"/><rect x="10" y="4" width="4" height="16" rx="1"/><path d="M17 5l3 .8-3.5 14.4-3-.8"/>',
   trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13M10 11v6M14 11v6"/>',
   star:'<path d="M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8z"/>'
  };
  const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('style','display:none');
  s.innerHTML=Object.keys(P).map(k=>'<symbol id="i-'+k+'" viewBox="0 0 24 24">'+P[k]+'</symbol>').join('');
  document.addEventListener('DOMContentLoaded',()=>document.body.prepend(s));
  window.xrI=(n,c)=>'<svg class="xr-i '+(c||'')+'"><use href="#i-'+n+'"/></svg>';
})();
