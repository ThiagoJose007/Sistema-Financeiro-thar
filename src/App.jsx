import { useState, useReducer, useEffect, useRef } from "react";

const I={Sun:p=><svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
Moon:p=><svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
Plus:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
ChevL:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
ChevR:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
Up:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
Down:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
Trash:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
Edit:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
X:p=><svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
Tag:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
Repeat:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
Cal:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
Zap:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
Briefcase:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
User:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
Clock:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
Phone:p=><svg {...p} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
Mail:p=><svg {...p} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
Grid:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
List:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
Eye:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
CreditCard:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
AlertCircle:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
CheckCircle:p=><svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
TrendingUp:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
Sliders:p=><svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
Menu:p=><svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

const fmt=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});const fmtS=v=>Math.abs(v)>=1000?`R$${(v/1000).toFixed(1)}k`:fmt(v);const pad=n=>String(n).padStart(2,"0");
const MO=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];const MOF=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const WD=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const firstWD2=(y,m)=>new Date(y,m,1).getDay();
const daysIn=(y,m)=>new Date(y,m+1,0).getDate();const dk=(y,m,d)=>`${y}-${pad(m+1)}-${pad(d)}`;const todayDK=()=>{const t=new Date();return dk(t.getFullYear(),t.getMonth(),t.getDate())};const uid=()=>Math.random().toString(36).slice(2,10);
const DCIN=["Salário","Freelance","Bônus","Investimento","Outros"];const DCOUT=["Alimentação","Transporte","Moradia","Saúde","Educação","Lazer","Assinaturas","Outros"];
const CC=["#E07A3A","#5B8DEF","#9B6EE8","#E05555","#3DAF6A","#E8AD1A","#6BB8C4","#D46B9D","#7EC8A0","#C4884D"];
const BSTAGES=["Proposta","Negociação","Em Andamento","Revisão","Concluído"];const diffD=(a,b)=>Math.ceil((new Date(b)-new Date(a))/(864e5));
const STCOL={"Proposta":"#9C9590","Negociação":"#E8AD1A","Em Andamento":"#5B8DEF","Revisão":"#E07A3A","Concluído":"#3DAF6A"};
const CARD_COLORS=["#1a1a2e","#16213e","#0f3460","#533483","#2b2d42","#3d405b","#1b4332","#7b2d8b"];
const CARD_BRANDS=["Visa","Mastercard","Elo","Amex","Hipercard"];

// Dado um cartão e uma data de compra (YYYY-MM-DD), retorna a data de vencimento
// que essa compra cairá. Se a compra for APÓS o closeDay, vai para o próximo ciclo.
function getCardBillingInfo(card, purchaseDateStr) {
  const [py, pm, pd] = purchaseDateStr.split("-").map(Number);
  const billingMonthOffset = pd > card.closeDay ? 1 : 0;
  const rawMonth = pm - 1 + billingMonthOffset; // 0-based
  const dueYear = py + Math.floor(rawMonth / 12);
  const dueMonth = ((rawMonth % 12) + 12) % 12; // 0-based
  return {
    dueDate: dk(dueYear, dueMonth, card.dueDay),
    dueYear, dueMonth, dueDay: card.dueDay,
  };
}

// Retorna a data padrão para uma nova compra no cartão (hoje ou próximo ciclo se fatura fechou)
function getDefaultPurchaseDate(card) {
  return todayDK();
}

/* ─── FONTE ÚNICA DE VERDADE ───────────────────────────────────────────────
   Agrega todos os gastos de cartão por dueDate exata (YYYY-MM-DD).
   Retorna: { [dueDate]: { total, byCard: { [cardId]: valor }, cardColor } }
   Usado pelo calendário (badge no dia do vencimento) e por PFCards (total da fatura).
─────────────────────────────────────────────────────────────────────────── */
function buildCardBillsMap(cards, purchases) {
  const map = {};
  cards.forEach(card => {
    purchases.filter(p => p.cardId === card.id).forEach(p => {
      const { dueDate } = getCardBillingInfo(card, p.date);
      if (!map[dueDate]) map[dueDate] = { total: 0, byCard: {}, cardColor: card.color, cardName: card.name };
      map[dueDate].total += p.amount;
      map[dueDate].byCard[card.id] = (map[dueDate].byCard[card.id] || 0) + p.amount;
    });
  });
  return map;
}

// Alias para o calendário (mantém compatibilidade com chamadas existentes)
function getCardBillsByDueDate(cards, purchases) {
  return buildCardBillsMap(cards, purchases);
}

// Retorna o total de faturas de cartão que vencem num mês (YYYY-MM-DD prefix = YYYY-MM)
// MESMA lógica que buildCardBillsMap — garante que calendário e dashboard mostrem o mesmo valor
function getCardExpForMonth(cards, purchases, yearNum, monthNum) {
  const monthKey = `${yearNum}-${pad(monthNum + 1)}`;
  const map = buildCardBillsMap(cards, purchases);
  let total = 0;
  const byCard = {};
  Object.entries(map).forEach(([dueDate, info]) => {
    if (dueDate.startsWith(monthKey)) {
      total += info.total;
      Object.entries(info.byCard).forEach(([cid, v]) => {
        byCard[cid] = (byCard[cid] || 0) + v;
      });
    }
  });
  return { total, byCard };
}

// Retorna a dueDate da fatura ABERTA AGORA para um cartão específico
// "Aberta" = a fatura que ainda aceita compras hoje (se fechou, é a próxima)
function getOpenFaturaDueDate(card) {
  const now = new Date();
  const todayStr = todayDK();
  // Usa getCardBillingInfo com a data de hoje para saber em qual fatura a compra de hoje cairia
  const { dueDate } = getCardBillingInfo(card, todayStr);
  return dueDate;
}

// Retorna todas as compras de um cartão que pertencem à fatura aberta (dueDate == openDueDate)
function getOpenFaturaData(card, purchases) {
  const openDueDate = getOpenFaturaDueDate(card);
  const map = buildCardBillsMap([card], purchases);
  const entry = map[openDueDate] || { total: 0, byCard: {}, purchases: [] };
  const faturaItems = purchases.filter(p => {
    if (p.cardId !== card.id) return false;
    const { dueDate } = getCardBillingInfo(card, p.date);
    return dueDate === openDueDate;
  });
  return { dueDate: openDueDate, total: entry.total, items: faturaItems };
}

// Retorna a fatura ANTERIOR (já fechada) para exibir como referência
function getPrevFaturaData(card, purchases) {
  const openDueDate = getOpenFaturaDueDate(card);
  const map = buildCardBillsMap([card], purchases);
  // A fatura anterior é a dueDate imediatamente antes da aberta
  const allDates = Object.keys(map)
    .filter(d => map[d].byCard[card.id] !== undefined && d < openDueDate)
    .sort();
  const prevDueDate = allDates[allDates.length - 1] || null;
  if (!prevDueDate) return { dueDate: null, total: 0, items: [] };
  const prevItems = purchases.filter(p => {
    if (p.cardId !== card.id) return false;
    const { dueDate } = getCardBillingInfo(card, p.date);
    return dueDate === prevDueDate;
  });
  return { dueDate: prevDueDate, total: (map[prevDueDate]?.byCard[card.id] || 0), items: prevItems };
}

function genData(){const txs=[],now=new Date(),y=now.getFullYear(),m=now.getMonth();
for(let i=0;i<6;i++){const mo=m-i,yr=mo<0?y-1:y,month=((mo%12)+12)%12,days=daysIn(yr,month);
txs.push({id:uid(),date:dk(yr,month,5),type:"income",amount:5200+Math.floor(Math.random()*300),category:"Salário",description:"Salário - Lab EDGE",time:"08:00",tags:["fixo"],isInstallment:false});
if(i<4)txs.push({id:uid(),date:dk(yr,month,15),type:"income",amount:1200+Math.floor(Math.random()*800),category:"Freelance",description:"Freelance UI",time:"14:30",tags:["variável"],isInstallment:false});
[{d:1,a:1200,c:"Moradia",ds:"Aluguel"},{d:3,a:85,c:"Assinaturas",ds:"Figma"},{d:5,a:400,c:"Alimentação",ds:"Supermercado"},{d:8,a:120,c:"Transporte",ds:"Combustível"},{d:10,a:200,c:"Educação",ds:"Curso UX"},{d:12,a:89,c:"Lazer",ds:"Cinema"},{d:15,a:300,c:"Alimentação",ds:"Feira"},{d:18,a:75,c:"Saúde",ds:"Farmácia"},{d:20,a:150,c:"Transporte",ds:"Manutenção"},{d:25,a:60,c:"Assinaturas",ds:"Streaming"},{d:28,a:100,c:"Alimentação",ds:"Extra"}].forEach(e=>{if(e.d<=days)txs.push({id:uid(),date:dk(yr,month,e.d),type:"expense",amount:e.a+Math.floor(Math.random()*50),category:e.c,description:e.ds,time:`${pad(8+Math.floor(Math.random()*12))}:${pad(Math.floor(Math.random()*60))}`,tags:[],isInstallment:false})})}
const c0=uid(),c1=uid();
const cp=[];
const mSafe=(base,offset)=>{const r=base+offset;if(r<0)return[y-1,12+r];if(r>11)return[y+1,r-12];return[y,r];};
[{cardId:c0,description:"iFood",amount:89.90,date:dk(y,m,3),category:"Alimentação",totalInstallments:1,installmentIndex:0},
 {cardId:c0,description:"Fone Bluetooth",amount:166.67,date:dk(y,m,8),category:"Lazer",totalInstallments:3,installmentIndex:0},
 {cardId:c0,description:"Fone Bluetooth",amount:166.67,date:dk(...mSafe(m,1),8),category:"Lazer",totalInstallments:3,installmentIndex:1},
 {cardId:c0,description:"Fone Bluetooth",amount:166.67,date:dk(...mSafe(m,2),8),category:"Lazer",totalInstallments:3,installmentIndex:2},
 {cardId:c0,description:"Spotify",amount:21.90,date:dk(y,m,2),category:"Assinaturas",totalInstallments:1,installmentIndex:0},
 {cardId:c0,description:"Curso React",amount:99,date:dk(y,m,14),category:"Educação",totalInstallments:1,installmentIndex:0},
 {cardId:c1,description:"Mercado Livre",amount:320,date:dk(y,m,5),category:"Alimentação",totalInstallments:1,installmentIndex:0},
 {cardId:c1,description:"AliExpress",amount:90,date:dk(...mSafe(m,-1),22),category:"Outros",totalInstallments:2,installmentIndex:0},
 {cardId:c1,description:"AliExpress",amount:90,date:dk(y,m,22),category:"Outros",totalInstallments:2,installmentIndex:1},
].forEach(p=>cp.push({id:uid(),...p}));
return{transactions:txs,installments:[],investments:[],customCatsIn:[...DCIN],customCatsOut:[...DCOUT],tags:["essencial","variável","fixo","investimento","lazer"],
cards:[
  {id:c0,name:"Nubank",brand:"Mastercard",lastDigits:"4321",color:"#7b2d8b",limit:5000,dueDay:10,closeDay:3},
  {id:c1,name:"Inter",brand:"Visa",lastDigits:"8876",color:"#e05a00",limit:3000,dueDay:20,closeDay:13},
],
cardPurchases:cp,
clients:[
{id:uid(),name:"Prysmian Group",cnpj:"12.345.678/0001-90",service:"UX/UI Design",serviceDesc:"Redesign do portal de gestão de cabos",phone:"(82) 99123-4567",email:"marcos@prysmian.com",contacts:[{name:"Marcos Silva",role:"PO"},{name:"Ana Duarte",role:"Dev Lead"}],value:18000,isInstallment:true,installments:3,monthlyValue:6000,startDate:dk(y,m-1<0?11:m-1,10),endDate:dk(y,m+2>11?m-10:m+2,10),deliverables:"Protótipo Figma, Design System, Handoff",stage:"Em Andamento"},
{id:uid(),name:"Game Levy",cnpj:"98.765.432/0001-10",service:"Game Design",serviceDesc:"Jogo educacional LGPD para MEC",phone:"(11) 98765-4321",email:"pedro@gamelevy.com",contacts:[{name:"Pedro Levy",role:"CEO"}],value:12000,isInstallment:false,installments:1,monthlyValue:12000,startDate:dk(y,m-2<0?m+10:m-2,1),endDate:dk(y,m+1>11?0:m+1,28),deliverables:"GDD, Assets UI, Mecânicas, Protótipo jogável",stage:"Revisão"},
{id:uid(),name:"StartupXP",cnpj:"45.678.901/0001-55",service:"Product Design",serviceDesc:"MVP plataforma de investimentos",phone:"(21) 97654-3210",email:"julia@startupxp.io",contacts:[{name:"Julia Mendes",role:"CPO"},{name:"Rafael Costa",role:"CTO"}],value:25000,isInstallment:true,installments:5,monthlyValue:5000,startDate:dk(y,m,1),endDate:dk(y,m+4>11?m-8:m+4,30),deliverables:"Research, Wireframes, UI Kit, Protótipo, Docs",stage:"Em Andamento"},
{id:uid(),name:"EduTech Brasil",cnpj:"33.222.111/0001-88",service:"UX Research",serviceDesc:"Pesquisa de usabilidade app EAD",phone:"(85) 96543-2109",email:"contato@edutechbr.com",contacts:[{name:"Carla Souza",role:"Head of Product"}],value:8000,isInstallment:false,installments:1,monthlyValue:8000,startDate:dk(y,m+1>11?0:m+1,15),endDate:dk(y,m+3>11?m-9:m+3,15),deliverables:"Relatório, Personas, Journey Maps",stage:"Proposta"},
],boardStages:[...BSTAGES]};}

function reducer(s,a){switch(a.type){
case "ADD_TX":return{...s,transactions:[...s.transactions,a.payload]};case "DEL_TX":return{...s,transactions:s.transactions.filter(t=>t.id!==a.payload)};case "EDIT_TX":return{...s,transactions:s.transactions.map(t=>t.id===a.payload.id?a.payload:t)};
case "ADD_INST":return{...s,installments:[...s.installments,a.payload]};case "DEL_INST":return{...s,installments:s.installments.filter(i=>i.id!==a.payload)};
case "ADD_RECURRING_TX":{const{base,months:mCount}=a.payload;const txs=[...s.transactions];for(let i=0;i<mCount;i++){const[yr,mo,day]=base.date.split("-").map(Number);const d=new Date(yr,mo-1+i,day);const newDate=dk(d.getFullYear(),d.getMonth(),d.getDate());txs.push({...base,id:uid(),date:newDate,description:i===0?base.description:`${base.description} (${i+1}/${mCount})`,isRecurring:true,recurringGroup:base.id})}return{...s,transactions:txs}};
case "DEL_RECURRING_GROUP":return{...s,transactions:s.transactions.filter(t=>t.recurringGroup!==a.payload&&t.id!==a.payload)};
case "ADD_CAT_IN":return{...s,customCatsIn:s.customCatsIn.includes(a.payload)?s.customCatsIn:[...s.customCatsIn,a.payload]};case "ADD_CAT_OUT":return{...s,customCatsOut:s.customCatsOut.includes(a.payload)?s.customCatsOut:[...s.customCatsOut,a.payload]};
case "DEL_CAT_IN":return{...s,customCatsIn:s.customCatsIn.filter(c=>c!==a.payload)};case "DEL_CAT_OUT":return{...s,customCatsOut:s.customCatsOut.filter(c=>c!==a.payload)};
case "ADD_TAG":return{...s,tags:s.tags.includes(a.payload)?s.tags:[...s.tags,a.payload]};case "DEL_TAG":return{...s,tags:s.tags.filter(t=>t!==a.payload)};
case "ADD_CARD":return{...s,cards:[...s.cards,a.payload]};case "EDIT_CARD":return{...s,cards:s.cards.map(c=>c.id===a.payload.id?a.payload:c)};case "DEL_CARD":return{...s,cards:s.cards.filter(c=>c.id!==a.payload),cardPurchases:(s.cardPurchases||[]).filter(p=>p.cardId!==a.payload)};
case "ADD_CARD_PURCHASE":{const{base,totalInstallments:n}=a.payload;const purchases=[...(s.cardPurchases||[])];if(n>1){const instAmt=base.amount/n;const grp=uid();for(let i=0;i<n;i++){const[pyr,pmo2,pday]=base.date.split("-").map(Number);const d2=new Date(pyr,pmo2-1+i,pday);purchases.push({...base,id:uid(),amount:instAmt,date:dk(d2.getFullYear(),d2.getMonth(),d2.getDate()),totalInstallments:n,installmentIndex:i,installmentGroup:grp,description:base.description})}}else{purchases.push({...base,id:uid(),totalInstallments:1,installmentIndex:0})}return{...s,cardPurchases:purchases}};
case "EDIT_CARD_PURCHASE":return{...s,cardPurchases:(s.cardPurchases||[]).map(p=>p.id===a.payload.id?a.payload:p)};
case "DEL_CARD_PURCHASE":return{...s,cardPurchases:(s.cardPurchases||[]).filter(p=>p.id!==a.payload)};
case "DEL_CARD_PURCHASE_GROUP":return{...s,cardPurchases:(s.cardPurchases||[]).filter(p=>p.installmentGroup!==a.payload&&p.id!==a.payload)};
case "ADD_CLIENT":return{...s,clients:[...s.clients,a.payload]};case "EDIT_CLIENT":return{...s,clients:s.clients.map(c=>c.id===a.payload.id?a.payload:c)};case "DEL_CLIENT":return{...s,clients:s.clients.filter(c=>c.id!==a.payload)};
case "MOVE_CLIENT":return{...s,clients:s.clients.map(c=>c.id===a.payload.id?{...c,stage:a.payload.stage}:c)};
case "ADD_STAGE":return{...s,boardStages:[...s.boardStages,a.payload]};
case "INSERT_STAGE_AT":{const stages=[...s.boardStages];stages.splice(a.payload.index,0,a.payload.name);return{...s,boardStages:stages}};
case "DEL_STAGE":return{...s,boardStages:s.boardStages.filter(st=>st!==a.payload)};
case "REORDER_STAGE":{const stages=[...s.boardStages];const[removed]=stages.splice(a.payload.from,1);stages.splice(a.payload.to,0,removed);return{...s,boardStages:stages}};
case "RESET":return{transactions:[],installments:[],investments:[],customCatsIn:[...DCIN],customCatsOut:[...DCOUT],tags:[],clients:[],boardStages:[...BSTAGES],cards:[],cardPurchases:[]};
default:return s;}}

const themes={light:{"--bg-0":"#F5F3EF","--bg-1":"#FFFFFF","--bg-2":"#EDE9E3","--bg-3":"#E8E4DD","--bg-modal":"rgba(0,0,0,0.3)","--c1":"#1A1714","--c2":"#6B6560","--c3":"#9C9590","--brd":"#DDD8D1","--brd2":"#EDE9E3","--acc":"#C8602A","--acc2":"#B5551F","--accL":"rgba(200,96,42,0.08)","--inc":"#2D8A56","--incBg":"rgba(45,138,86,0.08)","--exp":"#C44040","--expBg":"rgba(196,64,64,0.08)","--wrn":"#D4960A","--biz":"#5B8DEF","--bizBg":"rgba(91,141,239,0.08)","--sh":"0 1px 3px rgba(0,0,0,0.06)","--shL":"0 8px 30px rgba(0,0,0,0.1)"},
dark:{"--bg-0":"#0E0E0D","--bg-1":"#181716","--bg-2":"#222120","--bg-3":"#2C2B29","--bg-modal":"rgba(0,0,0,0.6)","--c1":"#E8E4DD","--c2":"#9C9590","--c3":"#6B6560","--brd":"#2E2D2B","--brd2":"#222120","--acc":"#E07A3A","--acc2":"#C8602A","--accL":"rgba(224,122,58,0.1)","--inc":"#3DAF6A","--incBg":"rgba(61,175,106,0.1)","--exp":"#E05555","--expBg":"rgba(224,85,85,0.1)","--wrn":"#E8AD1A","--biz":"#7BA4F7","--bizBg":"rgba(123,164,247,0.1)","--sh":"0 1px 3px rgba(0,0,0,0.2)","--shL":"0 8px 30px rgba(0,0,0,0.4)"}};

const CSS=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}:root{font-family:'DM Sans',sans-serif}.app{min-height:100vh;background:var(--bg-0);color:var(--c1);transition:background .3s,color .3s}.mono{font-family:'JetBrains Mono',monospace}
.hdr{background:var(--bg-1);border-bottom:1px solid var(--brd);padding:8px 16px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:40;gap:6px;flex-wrap:wrap}.hdr-brand{display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;flex-shrink:0}.hdr-dot{width:8px;height:8px;border-radius:50%;background:var(--acc)}.hdr-acts{display:flex;align-items:center;gap:6px;flex-wrap:wrap;flex:1;min-width:0}
.msw{display:flex;background:var(--bg-2);border-radius:8px;padding:3px;gap:2px}.msw-b{display:flex;align-items:center;gap:4px;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--c3);font-family:inherit;transition:all .15s;white-space:nowrap}.msw-b:hover{color:var(--c1)}.msw-b.on{background:var(--bg-1);color:var(--c1);box-shadow:var(--sh)}.msw-b.onb{background:var(--bizBg);color:var(--biz)}
.tabs{display:flex;gap:2px;background:var(--bg-2);border-radius:8px;padding:3px;overflow-x:auto}.tab{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer;border:none;background:transparent;color:var(--c3);transition:all .15s;white-space:nowrap;font-family:inherit}.tab:hover{color:var(--c1)}.tab.on{background:var(--bg-1);color:var(--c1);box-shadow:var(--sh)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:7px 12px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid var(--brd);background:var(--bg-1);color:var(--c1);transition:all .12s;font-family:inherit}.btn:hover{background:var(--bg-3)}.btn-a{background:var(--acc);color:#fff;border-color:var(--acc)}.btn-a:hover{background:var(--acc2)}.btn-biz{background:var(--biz);color:#fff;border-color:var(--biz)}.btn-biz:hover{opacity:.85}
.btn-s{padding:4px 8px;font-size:11px}.btn-i{padding:6px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:6px}.btn-g{border-color:transparent;background:transparent}.btn-g:hover{background:var(--bg-2)}.btn-d{color:var(--exp)}.btn-d:hover{background:var(--expBg)}
.ctr{max-width:1280px;margin:0 auto;padding:20px;flex:1}.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.cd{background:var(--bg-1);border:1px solid var(--brd);border-radius:12px;padding:18px}.cd-s{padding:12px}
.st-l{font-size:11px;color:var(--c3);font-weight:500;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.st-v{font-size:20px;font-weight:700;letter-spacing:-.5px}.st-sub{font-size:11px;color:var(--c3);margin-top:3px}
.pnav{display:flex;align-items:center;gap:10px}.pnav-l{font-size:17px;font-weight:600;min-width:160px;text-align:center}
.tx{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--brd2)}.tx:last-child{border-bottom:none}.tx-ic{width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.tx-ic.in{background:var(--incBg);color:var(--inc)}.tx-ic.out{background:var(--expBg);color:var(--exp)}.tx-nfo{flex:1;min-width:0}.tx-d{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tx-m{font-size:11px;color:var(--c3);margin-top:1px}.tx-am{font-weight:600;font-size:13px;white-space:nowrap}.tx-ac{display:flex;gap:2px;opacity:0;transition:opacity .12s}.tx:hover .tx-ac{opacity:1}
.mo-ov{position:fixed;inset:0;background:var(--bg-modal);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px;animation:fi .15s}.mo{background:var(--bg-1);border:1px solid var(--brd);border-radius:12px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:var(--shL);animation:su .2s}.mo.wide{max-width:680px}.mo-h{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--brd2)}.mo-t{font-size:15px;font-weight:600}.mo-b{padding:18px}
@keyframes fi{from{opacity:0}to{opacity:1}}@keyframes su{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.fg{margin-bottom:12px}.fl{display:block;font-size:11px;font-weight:600;color:var(--c2);margin-bottom:4px;text-transform:uppercase;letter-spacing:.3px}.fi{width:100%;padding:8px 10px;border:1px solid var(--brd);border-radius:6px;font-size:13px;background:var(--bg-0);color:var(--c1);font-family:inherit;outline:none}.fi:focus{border-color:var(--acc)}.fi::placeholder{color:var(--c3)}.fi-ta{min-height:56px;resize:vertical}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:10px}.fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}.fs{width:100%;padding:8px 10px;border:1px solid var(--brd);border-radius:6px;font-size:13px;background:var(--bg-0);color:var(--c1);font-family:inherit;outline:none;appearance:none}
.tt{display:flex;gap:3px;padding:3px;background:var(--bg-2);border-radius:8px}.tt-b{flex:1;padding:7px;border:none;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;background:transparent;color:var(--c3);font-family:inherit}.tt-b.on-i{background:var(--incBg);color:var(--inc)}.tt-b.on-e{background:var(--expBg);color:var(--exp)}
.tg{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:500;background:var(--bg-2);color:var(--c2);border:1px solid var(--brd2)}.prg{height:5px;background:var(--bg-2);border-radius:3px;overflow:hidden}.prg-f{height:100%;border-radius:3px;transition:width .5s}
.chart-col{position:relative;flex:1;display:flex;gap:2px;align-items:flex-end;height:100%;cursor:pointer}.chart-col:hover .chart-tip{display:block}.chart-tip{display:none;position:absolute;bottom:105%;left:50%;transform:translateX(-50%);background:var(--bg-1);border:1px solid var(--brd);border-radius:8px;padding:8px 10px;box-shadow:var(--shL);z-index:20;white-space:nowrap;font-size:11px;pointer-events:none}.chart-bar{flex:1;border-radius:3px 3px 0 0;min-height:2px}
.gauge-ring{transition:stroke-dashoffset .8s ease-out}
.ag-item{display:flex;gap:12px;padding:14px;border-left:4px solid var(--biz);border-radius:0 10px 10px 0;margin-bottom:8px;background:var(--bg-1);border-top:1px solid var(--brd2);border-right:1px solid var(--brd2);border-bottom:1px solid var(--brd2)}
.cal-g{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}.cal-hd{font-size:10px;font-weight:600;color:var(--c3);text-align:center;padding:4px 0;text-transform:uppercase;letter-spacing:.5px}
.cal-d{border-radius:8px;border:1px solid var(--brd2);padding:3px 4px;font-size:10px;cursor:pointer;transition:all .12s;display:flex;flex-direction:column;min-height:52px;overflow:hidden}.cal-d:hover{border-color:var(--acc)}.cal-d.today{border-color:var(--acc);background:var(--accL)}.cal-d.empty{border-color:transparent;cursor:default;background:transparent;min-height:0}.cal-d.empty:hover{border-color:transparent}
.cal-dn{font-weight:600;font-size:11px;margin-bottom:1px}.cal-dv{font-size:8px;font-weight:500;line-height:1.3}.cal-dv.pos{color:var(--inc)}.cal-dv.neg{color:var(--exp)}.cal-bal{font-size:8px;font-weight:600;margin-top:auto}
.cal-li{border-bottom:1px solid var(--brd2);padding:10px 0;display:flex;align-items:center;gap:12px;cursor:pointer;transition:background .1s}.cal-li:hover{background:var(--bg-2);margin:0 -12px;padding:10px 12px;border-radius:8px}
.cal-li-day{width:48px;text-align:center;flex-shrink:0}.cal-li-num{font-size:20px;font-weight:700;line-height:1}.cal-li-wd{font-size:10px;color:var(--c3);font-weight:500}
.cal-li-bar{height:5px;border-radius:3px;transition:width .4s}.cal-li-bal{font-size:13px;font-weight:600;text-align:right;min-width:80px}.ag-bar{height:5px;border-radius:3px;background:var(--bg-2);overflow:hidden;margin-top:6px}.ag-bar-f{height:100%;border-radius:3px;transition:width .5s}
.cl-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:5px;font-size:10px;font-weight:600}
.kb-wrap{display:flex;gap:12px;overflow-x:auto;padding-bottom:12px;min-height:380px}.kb-col{min-width:230px;max-width:260px;flex-shrink:0;background:var(--bg-2);border-radius:12px;padding:12px;display:flex;flex-direction:column}
.kb-col-hd{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--c2);padding:4px 0 10px;display:flex;justify-content:space-between;align-items:center}
.kb-card{background:var(--bg-1);border:1px solid var(--brd);border-radius:8px;padding:10px;margin-bottom:6px;cursor:grab;transition:all .15s}.kb-card:hover{border-color:var(--biz);box-shadow:var(--sh)}
.nav-drawer-backdrop{display:none}
.nav-drawer{display:none}
@keyframes drawerIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes backdropIn{from{opacity:0}to{opacity:1}}
@media(max-width:900px){.g2,.g3,.g4{grid-template-columns:1fr 1fr}.ctr{padding:16px}}
@media(max-width:600px){
  .g2,.g3{grid-template-columns:1fr}.g4{grid-template-columns:1fr 1fr}
  .fr,.fr3{grid-template-columns:1fr}
  .hdr{padding:8px 12px}
  .hdr-acts{width:100%;justify-content:space-between}
  .msw{flex:1}
  .msw-b{flex:1;justify-content:center;font-size:10px;padding:5px 6px}
  .nav-tabs{display:none!important}
  .hdr-menu-btn{display:flex!important}
  .pnav-l{font-size:13px;min-width:100px}
  .kb-col{min-width:200px}
  .ctr{padding:12px;padding-bottom:80px}
  .cd{padding:14px}
  .st-v{font-size:18px}
  .mo{border-radius:16px 16px 0 0;max-width:100%;position:fixed;bottom:0;left:0;right:0;max-height:92vh;margin:0}
  .mo-ov{align-items:flex-end;padding:0}
  .mo-b{padding:14px}
  .mo-h{padding:12px 14px}
  .sim-mo{border-radius:16px 16px 0 0;max-width:100%;position:fixed;bottom:0;left:0;right:0;max-height:92vh;margin:0}
  .sim-fab{bottom:16px;right:16px;padding:9px 14px;font-size:12px}
  .impact-row{grid-template-columns:70px 1fr;gap:6px}
  .impact-row .mono{display:none}
  .impact-row-vals{display:flex;gap:6px;grid-column:1/-1;font-size:10px}
  .cc-wrap{grid-template-columns:1fr 1fr}
  .cc-card{min-height:110px;padding:14px 16px}
  .cc-digits{font-size:11px;letter-spacing:.1em}
  .cal-li-num{font-size:17px}
  .cal-li-bal{min-width:60px;font-size:12px}
  .tx-ac{opacity:1!important}
  .ag-item{flex-wrap:wrap;gap:8px}
  .kb-wrap{min-height:300px}
  .hdr-brand span:last-child{display:none}
  .hdr-txt{display:none}
  .cal-d{min-height:44px}
  .st-v{font-size:16px}
  .g4 .st-v{font-size:15px}
  .day-sum .mono{font-size:13px!important}
  .day-sum>div{min-width:0}
  .nav-drawer-backdrop{display:block;position:fixed;inset:0;background:var(--bg-modal);z-index:38;animation:backdropIn .18s ease-out}
  .nav-drawer{display:flex;flex-direction:column;position:fixed;top:var(--hdr-h,80px);right:0;width:220px;background:var(--bg-1);border-left:1px solid var(--brd);border-bottom:1px solid var(--brd);border-radius:0 0 0 14px;z-index:39;padding:8px;gap:2px;box-shadow:-4px 6px 24px rgba(0,0,0,.18);animation:drawerIn .2s ease-out}
  .nav-drawer-item{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:8px;border:none;background:transparent;color:var(--c2);font-family:inherit;font-size:13px;font-weight:500;cursor:pointer;text-align:left;width:100%;transition:background .12s,color .12s}
  .nav-drawer-item:hover{background:var(--bg-2);color:var(--c1)}
  .nav-drawer-item.active{background:var(--accL);color:var(--acc);font-weight:600}
  .nav-drawer-item.active-biz{background:var(--bizBg);color:var(--biz);font-weight:600}
  .nav-drawer-sep{height:1px;background:var(--brd2);margin:4px 0}
}
@media(max-width:380px){
  .cc-wrap{grid-template-columns:1fr}
  .g4{grid-template-columns:1fr}
  .tab{font-size:9px;padding:4px 2px}
  .msw-b span:last-child{display:none}
}
@media(max-width:600px){
  .sim-tbl-hd{display:none!important}
  .sim-col-hide{display:none!important}
  .sim-val-mobile{display:inline!important}
  .impact-row{grid-template-columns:80px 1fr!important}
  .perf-top{grid-template-columns:1fr!important}
  .perf-top>.cd:first-child{min-width:unset!important;align-self:center}
}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--brd);border-radius:3px}
.cc-card{border-radius:14px;padding:18px 20px;color:#fff;position:relative;overflow:hidden;cursor:pointer;transition:transform .15s,box-shadow .15s;min-height:130px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 20px rgba(0,0,0,.3)}.cc-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.4)}.cc-card::before{content:"";position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.07)}.cc-card::after{content:"";position:absolute;bottom:-20px;left:20px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,.05)}
.cc-chip{width:32px;height:24px;border-radius:4px;background:linear-gradient(135deg,#d4af37,#f5d87e);margin-bottom:12px}
.cc-row{display:flex;justify-content:space-between;align-items:flex-end;position:relative;z-index:1}.cc-digits{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.15em;opacity:.85}.cc-name{font-size:13px;font-weight:600;letter-spacing:.05em}.cc-brand{font-size:11px;font-weight:700;opacity:.7;text-transform:uppercase;letter-spacing:.1em}
.cc-wrap{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-bottom:20px}
.purchase-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--brd2)}.purchase-row:last-child{border-bottom:none}.purchase-row:hover .tx-ac{opacity:1}
@media(hover:none){.tx-ac{opacity:1!important}.purchase-row .tx-ac{opacity:1!important}}
@supports(padding-bottom:env(safe-area-inset-bottom)){.sim-fab{bottom:calc(16px + env(safe-area-inset-bottom))}.ctr{padding-bottom:calc(80px + env(safe-area-inset-bottom))}}
.sim-fab{position:fixed;bottom:24px;right:24px;z-index:50;display:flex;align-items:center;gap:7px;padding:10px 18px;border-radius:50px;background:linear-gradient(135deg,var(--acc),var(--acc2));color:#fff;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,.3);transition:transform .15s,box-shadow .15s}.sim-fab:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.4)}
.sim-mo{background:var(--bg-1);border:1px solid var(--brd);border-radius:16px;width:100%;max-width:780px;max-height:92vh;overflow-y:auto;box-shadow:var(--shL);animation:su .2s}
.impact-row{display:grid;grid-template-columns:110px 1fr 90px 90px 90px;gap:8px;align-items:center;padding:8px 12px;border-radius:8px;margin-bottom:4px;font-size:12px}
.impact-bar-wrap{height:6px;background:var(--bg-3);border-radius:3px;overflow:hidden;position:relative}
.impact-bar{height:100%;border-radius:3px;transition:width .5s ease-out}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
.sim-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}`;



function Modal({title,onClose,children,wide}){return <div className="mo-ov" onClick={onClose}><div className={`mo${wide?" wide":""}`} onClick={e=>e.stopPropagation()}><div className="mo-h"><span className="mo-t">{title}</span><button className="btn btn-i btn-g" onClick={onClose}><I.X/></button></div><div className="mo-b">{children}</div></div></div>}
function PNav({label,onPrev,onNext,extra}){return <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}><div className="pnav"><button className="btn btn-i btn-g" onClick={onPrev}><I.ChevL/></button><span className="pnav-l">{label}</span><button className="btn btn-i btn-g" onClick={onNext}><I.ChevR/></button></div>{extra}</div>}

/* ── Inline confirm — replaces window.confirm (blocked in iframes) ── */
function useConfirm(){
  const [pending,setPending]=useState(null); // {id, resolve}
  const ask=(id)=>new Promise(res=>setPending({id,res}));
  const yes=()=>{pending?.res(true);setPending(null)};
  const no=()=>{pending?.res(false);setPending(null)};
  return{ask,yes,no,pendingId:pending?.id};
}
/* Renders an inline confirm row that replaces the normal row when active */
function ConfirmRow({label,onConfirm,onCancel}){
  return <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"var(--expBg)",borderRadius:8,border:"1px solid var(--exp)"}}>
    <I.AlertCircle style={{color:"var(--exp)",flexShrink:0,width:14,height:14}}/>
    <span style={{flex:1,fontSize:12,color:"var(--exp)",fontWeight:500}}>{label}</span>
    <button className="btn btn-s btn-d" style={{background:"var(--exp)",color:"#fff",borderColor:"var(--exp)"}} onClick={onConfirm}>Excluir</button>
    <button className="btn btn-s" onClick={onCancel}>Cancelar</button>
  </div>;
}

/* ── Transaction Form ── */
function TxForm({onSave,onCancel,initial,data,dp}){
  // mode: "income" | "expense" | "card"
  const [mode,setMode]=useState(initial?.type==="income"?"income":"expense");
  const [amount,setAmount]=useState(initial?.amount?.toString()||"");
  const [desc,setDesc]=useState(initial?.description||"");
  const [cat,setCat]=useState(initial?.category||"");
  const [date,setDate]=useState(initial?.date||todayDK());
  const [time,setTime]=useState(initial?.time||`${pad(new Date().getHours())}:${pad(new Date().getMinutes())}`);
  const [selTags,setSelTags]=useState(initial?.tags||[]);
  const [isInst,setIsInst]=useState(false),[instCount,setInstCount]=useState("2");
  const [isRepeat,setIsRepeat]=useState(false),[repeatCount,setRepeatCount]=useState("3");

  // Card mode state
  const cards=data.cards||[];
  const [cardId,setCardId]=useState(cards[0]?.id||"");
  const [cardInst,setCardInst]=useState("1");
  const selectedCard=cards.find(c=>c.id===cardId);
  const billingInfo=selectedCard&&date?getCardBillingInfo(selectedCard,date):null;
  const todayDay=new Date().getDate();
  const isFaturaFechada=selectedCard&&todayDay>selectedCard.closeDay;
  const nCard=Math.max(1,parseInt(cardInst)||1);
  const totalAmt=parseFloat(amount)||0;
  const instAmtCard=nCard>1?totalAmt/nCard:totalAmt;

  const cats=mode==="income"?data.customCatsIn:data.customCatsOut;

  const save=()=>{
    if(!amount||!desc)return;

    // Card purchase path
    if(mode==="card"){
      if(!cardId)return;
      dp({type:"ADD_CARD_PURCHASE",payload:{
        base:{cardId,description:desc,amount:totalAmt,date,category:cat||data.customCatsOut[0]||"Outros",totalInstallments:nCard},
        totalInstallments:nCard
      }});
      onSave();return;
    }

    // Normal tx path
    const b={id:initial?.id||uid(),type:mode,amount:parseFloat(amount),description:desc,category:cat||cats[0],date,time,tags:selTags,isInstallment:false};
    if(!initial?.id&&isInst&&parseInt(instCount)>1){
      const n=parseInt(instCount),mo=parseFloat(amount)/n;
      dp({type:"ADD_INST",payload:{id:uid(),name:desc,totalAmount:parseFloat(amount),installments:n,paidInstallments:0,monthlyAmount:mo,startDate:date,category:cat||cats[0]}});
      b.amount=mo;b.description=`${desc} (1/${n})`;b.isInstallment=true;
      dp({type:"ADD_TX",payload:b});onSave();return;
    }
    if(!initial?.id&&isRepeat&&parseInt(repeatCount)>1){
      const n=parseInt(repeatCount);const baseId=uid();
      for(let i=0;i<n;i++){
        const[yr,mo2,day2]=date.split("-").map(Number);
        const d2=new Date(yr,mo2-1+i,day2);
        const newDate=dk(d2.getFullYear(),d2.getMonth(),d2.getDate());
        dp({type:"ADD_TX",payload:{...b,id:uid(),date:newDate,isRecurring:true,recurringGroup:baseId,description:n>1?`${desc} (${i+1}/${n})`:desc}});
      }
      onSave();return;
    }
    dp({type:initial?.id?"EDIT_TX":"ADD_TX",payload:b});onSave();
  };

  const isEdit=!!initial?.id;

  return <>
    {/* Mode switcher — 3 tabs; hide card tab when editing */}
    {!isEdit&&<div className="fg"><div className="tt">
      <button className={`tt-b ${mode==="income"?"on-i":""}`} onClick={()=>{setMode("income");setCat("");setIsInst(false);setIsRepeat(false)}}>Entrada</button>
      <button className={`tt-b ${mode==="expense"?"on-e":""}`} onClick={()=>{setMode("expense");setCat("");setIsInst(false);setIsRepeat(false)}}>Saída</button>
      {cards.length>0&&<button className={`tt-b`} style={mode==="card"?{background:"var(--bizBg)",color:"var(--biz)"}:{}} onClick={()=>{setMode("card");setIsInst(false);setIsRepeat(false)}}>
        <I.CreditCard style={{width:12,height:12,display:"inline",verticalAlign:-1,marginRight:3}}/>Cartão
      </button>}
    </div></div>}
    {isEdit&&<div className="fg"><div className="tt">
      <button className={`tt-b ${mode==="income"?"on-i":""}`} onClick={()=>{setMode("income");setCat("")}}>Entrada</button>
      <button className={`tt-b ${mode==="expense"?"on-e":""}`} onClick={()=>{setMode("expense");setCat("")}}>Saída</button>
    </div></div>}

    {/* Card mode UI */}
    {mode==="card"&&<>
      <div className="fg">
        <label className="fl">Cartão</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {cards.map(c=><div key={c.id} onClick={()=>setCardId(c.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:`2px solid ${cardId===c.id?c.color:"var(--brd)"}`,cursor:"pointer",background:cardId===c.id?c.color+"22":"var(--bg-2)",transition:"all .12s"}}>
            <div style={{width:10,height:10,borderRadius:2,background:c.color,flexShrink:0}}/>
            <span style={{fontSize:12,fontWeight:600}}>{c.name}</span>
            <span className="mono" style={{fontSize:10,color:"var(--c3)"}}>••{c.lastDigits}</span>
          </div>)}
        </div>
      </div>
      {isFaturaFechada&&<div style={{padding:"8px 12px",background:"rgba(232,173,26,.1)",border:"1px solid var(--wrn)",borderRadius:8,marginBottom:12,display:"flex",gap:8,alignItems:"flex-start"}}>
        <I.AlertCircle style={{color:"var(--wrn)",flexShrink:0,marginTop:1,width:14,height:14}}/>
        <div><div style={{fontSize:12,fontWeight:600,color:"var(--wrn)"}}>Fatura fechada — dia {selectedCard?.closeDay}</div><div style={{fontSize:11,color:"var(--c2)",marginTop:2}}>Esta compra entra na próxima fatura (vence {billingInfo?.dueDate}).</div></div>
      </div>}
      <div className="fg"><label className="fl">Descrição</label><input className="fi" placeholder="ex: Amazon, iFood..." value={desc} onChange={e=>setDesc(e.target.value)}/></div>
      <div className="fr">
        <div className="fg"><label className="fl">Valor Total (R$)</label><input className="fi mono" type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)}/></div>
        <div className="fg"><label className="fl">Categoria</label><select className="fs" value={cat||data.customCatsOut[0]||""} onChange={e=>setCat(e.target.value)}>{data.customCatsOut.map(c=><option key={c}>{c}</option>)}</select></div>
      </div>
      <div className="fr">
        <div className="fg">
          <label className="fl">Data da Compra</label>
          <input className="fi" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
          {billingInfo&&<div style={{fontSize:10,color:"var(--c3)",marginTop:3}}>Fatura vence em <strong style={{color:"var(--exp)"}}>{billingInfo.dueDate}</strong></div>}
        </div>
        <div className="fg">
          <label className="fl">Parcelas</label>
          <select className="fs" value={cardInst} onChange={e=>setCardInst(e.target.value)}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,18,24].map(n=><option key={n} value={n}>{n===1?"À vista":`${n}x`}</option>)}
          </select>
        </div>
      </div>
      {nCard>1&&totalAmt>0&&<div style={{padding:"8px 12px",background:"var(--bizBg)",borderRadius:8,fontSize:12,color:"var(--biz)",marginBottom:12,fontWeight:500}}>{nCard}x de {fmt(instAmtCard)} · Total: {fmt(totalAmt)}</div>}
    </>}

    {/* Normal income/expense UI */}
    {mode!=="card"&&<>
      <div className="fr"><div className="fg"><label className="fl">Valor</label><input className="fi mono" type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)}/></div><div className="fg"><label className="fl">Categoria</label><select className="fs" value={cat||cats[0]} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div></div>
      <div className="fg"><label className="fl">Descrição</label><input className="fi" value={desc} onChange={e=>setDesc(e.target.value)}/></div>
      <div className="fr"><div className="fg"><label className="fl">Data</label><input className="fi" type="date" value={date} onChange={e=>setDate(e.target.value)}/></div><div className="fg"><label className="fl">Hora</label><input className="fi" type="time" value={time} onChange={e=>setTime(e.target.value)}/></div></div>
      {!isEdit&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
        <div className="fg">
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"var(--bg-2)",borderRadius:8,cursor:isRepeat?"not-allowed":"pointer",opacity:isRepeat?.45:1}} onClick={()=>{if(!isRepeat)setIsInst(p=>!p)}}>
            <div style={{width:16,height:16,borderRadius:4,border:"2px solid "+(isInst?"var(--acc)":"var(--brd)"),background:isInst?"var(--acc)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{isInst&&<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}</div>
            <I.Repeat style={{color:"var(--c2)"}}/><span style={{fontSize:12,fontWeight:500}}>Parcelada</span>
            {isInst&&<><input className="fi mono" type="number" min="2" value={instCount} onChange={e=>setInstCount(e.target.value)} onClick={e=>e.stopPropagation()} style={{width:50,padding:"3px",textAlign:"center"}}/><span style={{fontSize:11,color:"var(--c3)"}}>x</span></>}
          </div>
          {isInst&&amount&&parseInt(instCount)>1&&<div style={{fontSize:11,color:"var(--acc)",marginTop:4}}>{fmt(parseFloat(amount)/parseInt(instCount))} × {instCount}x</div>}
        </div>
        <div className="fg">
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"var(--bg-2)",borderRadius:8,cursor:isInst?"not-allowed":"pointer",opacity:isInst?.45:1}} onClick={()=>{if(!isInst)setIsRepeat(p=>!p)}}>
            <div style={{width:16,height:16,borderRadius:4,border:"2px solid "+(isRepeat?"var(--acc)":"var(--brd)"),background:isRepeat?"var(--acc)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{isRepeat&&<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}</div>
            <I.Cal style={{color:"var(--c2)"}}/><span style={{fontSize:12,fontWeight:500}}>Repetir mensalmente por</span>
            {isRepeat&&<><input className="fi mono" type="number" min="2" max="60" value={repeatCount} onChange={e=>setRepeatCount(e.target.value)} onClick={e=>e.stopPropagation()} style={{width:50,padding:"3px",textAlign:"center"}}/><span style={{fontSize:11,color:"var(--c3)"}}>meses</span></>}
          </div>
          {isRepeat&&amount&&parseInt(repeatCount)>1&&<div style={{fontSize:11,color:"var(--acc)",marginTop:4}}>{fmt(parseFloat(amount))} × {repeatCount} meses · Total: {fmt(parseFloat(amount)*parseInt(repeatCount))}</div>}
        </div>
      </div>}
      <div className="fg"><label className="fl">Tags</label><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{data.tags.map(t=><button key={t} className="tg" style={{cursor:"pointer",borderColor:selTags.includes(t)?"var(--acc)":"var(--brd2)",background:selTags.includes(t)?"var(--accL)":"var(--bg-2)",color:selTags.includes(t)?"var(--acc)":"var(--c2)"}} onClick={()=>setSelTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])}>{t}</button>)}</div></div>
    </>}

    <div style={{display:"flex",justifyContent:"flex-end",gap:6,marginTop:10}}>
      <button className="btn" onClick={onCancel}>Cancelar</button>
      <button className={`btn ${mode==="card"?"btn-biz":"btn-a"}`} onClick={save}>{isEdit?"Salvar":"Adicionar"}</button>
    </div>
  </>;
}

/* ── Personal Dashboard ── */
function PFDash({data,dp,year,month,setMonth,setYear}){
  const [modal,setModal]=useState(null),[selDay,setSelDay]=useState(null);
  const prefix=`${year}-${pad(month+1)}-`,dim=daysIn(year,month);
  const mTxs=data.transactions.filter(t=>t.date.startsWith(prefix));
  const tInc=mTxs.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const tExpTx=mTxs.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  // Faturas de cartão que vencem este mês
  const {total:cardExp,byCard:cardByCard}=getCardExpForMonth(data.cards||[],data.cardPurchases||[],year,month);
  const tExp=tExpTx+cardExp;
  const bal=tInc-tExp;
  const catBr={};mTxs.filter(t=>t.type==="expense").forEach(t=>{catBr[t.category]=(catBr[t.category]||0)+t.amount});
  if(cardExp>0)catBr["Cartão de Crédito"]=(catBr["Cartão de Crédito"]||0)+cardExp;
  const catArr=Object.entries(catBr).sort((a,b)=>b[1]-a[1]);const maxC=catArr[0]?.[1]||1;
  const txByDay={};data.transactions.forEach(tx=>{if(tx.date.startsWith(prefix)){const d=parseInt(tx.date.slice(8));if(!txByDay[d])txByDay[d]={i:0,e:0};if(tx.type==="income")txByDay[d].i+=tx.amount;else txByDay[d].e+=tx.amount}});
  // Adiciona faturas de cartão no dia de vencimento para o gráfico
  const cardBills=getCardBillsByDueDate(data.cards||[],data.cardPurchases||[]);
  Object.entries(cardBills).forEach(([date,info])=>{if(date.startsWith(prefix)){const d=parseInt(date.slice(8));if(!txByDay[d])txByDay[d]={i:0,e:0};txByDay[d].e+=info.total}});
  const maxF=Math.max(...Object.values(txByDay).map(v=>Math.max(v.i,v.e)),1);
  const nav=d=>{const n=month+d;if(n<0){setYear(year-1);setMonth(11)}else if(n>11){setYear(year+1);setMonth(0)}else setMonth(n)};
  const mCardPurchases=(data.cardPurchases||[]).filter(p=>p.date.startsWith(prefix)).map(p=>({...p,type:"expense",description:`\u{1F4B3} ${p.description}`,category:p.category||"Cart\u00e3o"}));
  const recent=[...mTxs,...mCardPurchases].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
  return <div>
    <PNav label={`${MOF[month]} ${year}`} onPrev={()=>nav(-1)} onNext={()=>nav(1)} extra={<button className="btn btn-a" onClick={()=>setModal(1)}><I.Plus/> Transação</button>}/>
    <div className="g4" style={{marginBottom:16}}>
      <div className="cd cd-s"><div className="st-l">Entradas</div><div className="st-v mono" style={{color:"var(--inc)"}}>{fmt(tInc)}</div></div>
      <div className="cd cd-s">
        <div className="st-l">Saídas</div>
        <div className="st-v mono" style={{color:"var(--exp)"}}>{fmt(tExp)}</div>
        {cardExp>0&&<div className="st-sub" style={{color:"var(--c3)"}}>💳 {fmt(cardExp)} cartões</div>}
      </div>
      <div className="cd cd-s"><div className="st-l">Saldo</div><div className="st-v mono" style={{color:bal>=0?"var(--inc)":"var(--exp)"}}>{fmt(bal)}</div></div>
      <div className="cd cd-s"><div className="st-l">Performance</div><div className="st-v mono" style={{color:bal>=0?"var(--inc)":"var(--exp)"}}>{tInc>0?((bal/tInc)*100).toFixed(1):0}%</div></div>
    </div>
    <div className="cd" style={{marginBottom:16}}><div style={{fontWeight:600,fontSize:13,marginBottom:12}}>Fluxo Diário</div><div style={{display:"flex",alignItems:"flex-end",gap:3,height:110}}>
      {Array.from({length:dim},(_,idx)=>{const d=idx+1,dd=txByDay[d],ic=dd?.i||0,ex=dd?.e||0,db=ic-ex;
        return <div key={d} className="chart-col" onClick={()=>setSelDay(d)} style={{cursor:"pointer"}}><div className="chart-tip"><div style={{fontWeight:600}}>Dia {d}</div>{ic>0&&<div style={{color:"var(--inc)"}}>+{fmt(ic)}</div>}{ex>0&&<div style={{color:"var(--exp)"}}>-{fmt(ex)}</div>}<div style={{fontWeight:600,color:db>=0?"var(--inc)":"var(--exp)",borderTop:"1px solid var(--brd2)",marginTop:3,paddingTop:3}}>= {fmt(db)}</div></div><div className="chart-bar" style={{height:`${(ic/maxF)*100}%`,background:"var(--inc)",opacity:.6}}/><div className="chart-bar" style={{height:`${(ex/maxF)*100}%`,background:"var(--exp)",opacity:.6}}/></div>})}
    </div></div>
    <div className="g2"><div className="cd"><div style={{fontWeight:600,fontSize:13,marginBottom:12}}>Categorias</div>{catArr.map(([c,v])=><div key={c} style={{marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{fontWeight:500}}>{c}</span><span className="mono" style={{color:"var(--c2)"}}>{fmt(v)}</span></div><div className="prg"><div className="prg-f" style={{width:`${(v/maxC)*100}%`,background:c==="Cartão de Crédito"?"var(--biz)":CC[data.customCatsOut.indexOf(c)%CC.length]}}/></div></div>)}</div>
    <div className="cd"><div style={{fontWeight:600,fontSize:13,marginBottom:10}}>Recentes</div>{recent.map(tx=><div className="tx" key={tx.id} style={{padding:"6px 0"}}><div className={`tx-ic ${tx.type==="income"?"in":"out"}`} style={{width:28,height:28}}>{tx.type==="income"?<I.Up/>:<I.Down/>}</div><div className="tx-nfo"><div className="tx-d" style={{fontSize:12}}>{tx.description}</div><div className="tx-m">{tx.category}</div></div><div className="tx-am mono" style={{color:tx.type==="income"?"var(--inc)":"var(--exp)",fontSize:12}}>{tx.type==="income"?"+":"-"}{fmt(tx.amount)}</div></div>)}</div></div>
    {modal&&<Modal title="Nova Transação" onClose={()=>setModal(null)}><TxForm initial={{date:dk(year,month,new Date().getDate())}} data={data} dp={dp} onCancel={()=>setModal(null)} onSave={()=>setModal(null)}/></Modal>}
    {selDay&&<DayDetailModal day={selDay} year={year} month={month} data={data} dp={dp} onClose={()=>setSelDay(null)}/>}
  </div>;
}

/* ── Personal Performance ── */
function PFPerf({data}){
  const now=new Date();
  const months=Array.from({length:12},(_,i)=>{
    const mi=now.getMonth()-11+i,yr=now.getFullYear()+Math.floor(mi/12),mo=((mi%12)+12)%12;
    const px=`${yr}-${pad(mo+1)}-`;
    const txs=data.transactions.filter(t=>t.date.startsWith(px));
    const ic=txs.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
    const exTx=txs.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
    const {total:cardExp}=getCardExpForMonth(data.cards||[],data.cardPurchases||[],yr,mo);
    const ex=exTx+cardExp;
    return{yr,mo,l:MO[mo],ic,ex,p:ic-ex,n:txs.length+(cardExp>0?1:0)};
  });
  const tI=months.reduce((s,m)=>s+m.ic,0),tE=months.reduce((s,m)=>s+m.ex,0),tP=tI-tE,act=months.filter(m=>m.n>0),avg=tP/Math.max(act.length,1);
  const score=Math.min(100,Math.max(0,tI>0?Math.round((tP/tI)*100):0));const gR=60,gC=2*Math.PI*gR,gO=gC-(score/100)*gC,gCol=score>=30?"var(--inc)":score>=10?"var(--wrn)":"var(--exp)";
  const mxA=Math.max(...months.map(m=>Math.abs(m.p)),1);let streak=0;for(let i=11;i>=0;i--){if(months[i].p>0&&months[i].n>0)streak++;else if(months[i].n>0)break}
  const cur=months[11],prev=months[10],delta=cur.p-prev.p;
  return <div>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}><I.Zap style={{color:"var(--acc)"}}/><span style={{fontSize:17,fontWeight:600}}>Performance</span></div>
    <div className="perf-top" style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:14,marginBottom:16}}>
      <div className="cd" style={{display:"flex",flexDirection:"column",alignItems:"center",padding:20,minWidth:170}}>
        <div style={{position:"relative",width:140,height:140}}><svg width="140" height="140" viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r={gR} fill="none" stroke="var(--bg-2)" strokeWidth="8"/><circle cx="70" cy="70" r={gR} fill="none" stroke={gCol} strokeWidth="8" strokeDasharray={gC} strokeDashoffset={gO} strokeLinecap="round" className="gauge-ring"/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span className="mono" style={{fontSize:30,fontWeight:700,color:gCol}}>{score}</span><span style={{fontSize:10,color:"var(--c3)"}}>SCORE</span></div></div>
        <div style={{fontSize:12,fontWeight:600,color:gCol,marginTop:6}}>{score>=30?"Excelente":score>=15?"Bom":"Atenção"}</div>
      </div>
      <div className="g2"><div className="cd cd-s"><div className="st-l">Performance Total</div><div className="st-v mono" style={{color:tP>=0?"var(--inc)":"var(--exp)"}}>{fmt(tP)}</div><div className="st-sub">Entrada - Saída</div></div>
      <div className="cd cd-s"><div className="st-l">Média/Mês</div><div className="st-v mono" style={{color:avg>=0?"var(--inc)":"var(--exp)"}}>{fmt(avg)}</div></div>
      <div className="cd cd-s"><div className="st-l">Mês Atual</div><div style={{display:"flex",alignItems:"center",gap:6}}><span className="st-v mono" style={{color:cur.p>=0?"var(--inc)":"var(--exp)"}}>{fmt(cur.p)}</span><span style={{fontSize:11,fontWeight:600,padding:"2px 6px",borderRadius:4,background:delta>=0?"var(--incBg)":"var(--expBg)",color:delta>=0?"var(--inc)":"var(--exp)"}}>{delta>=0?"+":""}{prev.p?((delta/Math.abs(prev.p))*100).toFixed(0):0}%</span></div></div>
      <div className="cd cd-s"><div className="st-l">Streak</div><span className="mono" style={{fontSize:24,fontWeight:700,color:streak>=3?"var(--inc)":"var(--wrn)"}}>{streak}</span><span style={{fontSize:11,color:"var(--c2)"}}> meses</span></div></div>
    </div>
    <div className="cd"><div style={{fontWeight:600,fontSize:13,marginBottom:12}}>Evolução</div><div style={{display:"flex",gap:5,height:170,alignItems:"center"}}>{months.map((m,i)=>{const h=Math.abs(m.p)/mxA*80,pos=m.p>=0;return <div key={i} className="chart-col" style={{flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div className="chart-tip"><div style={{fontWeight:600}}>{MOF[m.mo]}</div><div style={{color:"var(--inc)"}}>+{fmt(m.ic)}</div><div style={{color:"var(--exp)"}}>-{fmt(m.ex)}</div><div style={{fontWeight:600,color:pos?"var(--inc)":"var(--exp)",borderTop:"1px solid var(--brd2)",marginTop:3,paddingTop:3}}>= {fmt(m.p)}</div></div><div style={{height:"50%",display:"flex",alignItems:"flex-end",width:"100%"}}>{pos&&<div style={{width:"100%",height:`${h}%`,background:"var(--inc)",borderRadius:"4px 4px 0 0",opacity:.7,minHeight:m.n?2:0}}/>}</div><div style={{width:"100%",height:1,background:"var(--c3)",opacity:.3}}/><div style={{height:"50%",display:"flex",alignItems:"flex-start",width:"100%"}}>{!pos&&m.n>0&&<div style={{width:"100%",height:`${h}%`,background:"var(--exp)",borderRadius:"0 0 4px 4px",opacity:.7,minHeight:2}}/>}</div></div>})}</div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>{months.map((m,i)=><span key={i} style={{flex:1,textAlign:"center",fontSize:9,color:"var(--c3)"}}>{m.l}</span>)}</div></div>
  </div>;
}

/* ── Client Form ── */
function ClientForm({onSave,onCancel,initial,stages}){
  const [f,setF]=useState(initial||{name:"",cnpj:"",service:"",serviceDesc:"",phone:"",email:"",contacts:[],value:"",isInstallment:false,installments:1,monthlyValue:"",startDate:todayDK(),endDate:"",deliverables:"",stage:stages[0]});
  const [nc,setNc]=useState({name:"",role:""});const u=(k,v)=>setF(p=>({...p,[k]:v}));
  return <>
    <div className="fr"><div className="fg"><label className="fl">Empresa</label><input className="fi" value={f.name} onChange={e=>u("name",e.target.value)}/></div><div className="fg"><label className="fl">CNPJ</label><input className="fi mono" value={f.cnpj} onChange={e=>u("cnpj",e.target.value)}/></div></div>
    <div className="fr"><div className="fg"><label className="fl">Serviço</label><input className="fi" value={f.service} onChange={e=>u("service",e.target.value)}/></div><div className="fg"><label className="fl">Etapa</label><select className="fs" value={f.stage} onChange={e=>u("stage",e.target.value)}>{stages.map(s=><option key={s}>{s}</option>)}</select></div></div>
    <div className="fg"><label className="fl">Descrição do Serviço</label><textarea className="fi fi-ta" value={f.serviceDesc} onChange={e=>u("serviceDesc",e.target.value)}/></div>
    <div className="fr3"><div className="fg"><label className="fl">Telefone</label><input className="fi" value={f.phone} onChange={e=>u("phone",e.target.value)}/></div><div className="fg"><label className="fl">Email</label><input className="fi" value={f.email} onChange={e=>u("email",e.target.value)}/></div><div className="fg"><label className="fl">Valor Total (R$)</label><input className="fi mono" type="number" value={f.value} onChange={e=>u("value",e.target.value)}/></div></div>
    <div className="fg"><div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"var(--bg-2)",borderRadius:8,cursor:"pointer"}} onClick={()=>u("isInstallment",!f.isInstallment)}><div style={{width:16,height:16,borderRadius:4,border:"2px solid "+(f.isInstallment?"var(--biz)":"var(--brd)"),background:f.isInstallment?"var(--biz)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{f.isInstallment&&<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}</div><span style={{fontSize:12,fontWeight:500}}>Parcelado</span>{f.isInstallment&&<input className="fi mono" type="number" min="2" value={f.installments} onChange={e=>u("installments",e.target.value)} onClick={e=>e.stopPropagation()} style={{width:50,padding:"3px",textAlign:"center"}}/>}{f.isInstallment&&<span style={{fontSize:11,color:"var(--c3)"}}>x</span>}</div>{f.isInstallment&&f.value&&parseInt(f.installments)>1&&<div style={{fontSize:11,color:"var(--biz)",marginTop:4}}>Mensal: {fmt(parseFloat(f.value)/parseInt(f.installments))}</div>}</div>
    <div className="fr"><div className="fg"><label className="fl">Início</label><input className="fi" type="date" value={f.startDate} onChange={e=>u("startDate",e.target.value)}/></div><div className="fg"><label className="fl">Fim</label><input className="fi" type="date" value={f.endDate} onChange={e=>u("endDate",e.target.value)}/></div></div>
    <div className="fg"><label className="fl">Entregas</label><textarea className="fi fi-ta" value={f.deliverables} onChange={e=>u("deliverables",e.target.value)} placeholder="O que será entregue..."/></div>
    <div className="fg"><label className="fl">Contatos</label>{f.contacts.map((c,i)=><div key={i} style={{display:"flex",gap:4,alignItems:"center",marginBottom:3}}><span style={{fontSize:12,flex:1}}><strong>{c.name}</strong> — {c.role}</span><button className="btn btn-i btn-g btn-s btn-d" onClick={()=>u("contacts",f.contacts.filter((_,j)=>j!==i))}><I.X style={{width:10,height:10}}/></button></div>)}
    <div style={{display:"flex",gap:4}}><input className="fi" placeholder="Nome" value={nc.name} onChange={e=>setNc(p=>({...p,name:e.target.value}))} style={{flex:1}}/><input className="fi" placeholder="Cargo" value={nc.role} onChange={e=>setNc(p=>({...p,role:e.target.value}))} style={{flex:1}}/><button className="btn btn-s" onClick={()=>{if(nc.name){u("contacts",[...f.contacts,{...nc}]);setNc({name:"",role:""})}}}>+</button></div></div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:6,marginTop:10}}><button className="btn" onClick={onCancel}>Cancelar</button><button className="btn btn-biz" onClick={()=>{if(!f.name||!f.service||!f.value)return;const val=parseFloat(f.value),inst=f.isInstallment?parseInt(f.installments)||1:1;onSave({...f,id:initial?.id||uid(),value:val,installments:inst,monthlyValue:f.isInstallment?val/inst:val})}}>{initial?.id?"Salvar":"Cadastrar"}</button></div>
  </>;
}

/* ── Biz Dashboard ── */
function BizDashboard({data}){
  const td=todayDK(),now=new Date();
  const clients=data.clients||[];
  const totalRevenue=clients.reduce((s,c)=>s+c.value,0);
  const activeClients=clients.filter(c=>c.stage!=="Concluído");
  const completedClients=clients.filter(c=>c.stage==="Concluído");
  const overdueClients=clients.filter(c=>c.endDate&&c.endDate<td&&c.stage!=="Concluído");
  const dueSoonClients=clients.filter(c=>c.endDate&&c.endDate>=td&&diffD(td,c.endDate)<=14&&c.stage!=="Concluído");

  // Revenue by stage
  const byStage={};data.boardStages.forEach(s=>{byStage[s]=clients.filter(c=>c.stage===s).reduce((sum,c)=>sum+c.value,0)});

  // Monthly pipeline (next 6 months — clients with installments)
  const pipeline=Array.from({length:6},(_,i)=>{
    const d=new Date(now.getFullYear(),now.getMonth()+i,1);
    const key=`${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const mo=clients.filter(c=>c.isInstallment&&c.startDate&&c.endDate&&c.startDate.slice(0,7)<=key&&c.endDate.slice(0,7)>=key).reduce((s,c)=>s+c.monthlyValue,0);
    return{label:`${MO[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`,value:mo};
  });
  const maxPipe=Math.max(...pipeline.map(p=>p.value),1);

  return <div>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}><I.Briefcase style={{color:"var(--biz)"}}/><span style={{fontSize:17,fontWeight:600}}>Dashboard Empresarial</span></div>
    <div className="g4" style={{marginBottom:16}}>
      <div className="cd cd-s"><div className="st-l">Receita Total</div><div className="st-v mono" style={{color:"var(--biz)"}}>{fmt(totalRevenue)}</div></div>
      <div className="cd cd-s"><div className="st-l">Projetos Ativos</div><div className="st-v" style={{color:"var(--inc)"}}>{activeClients.length}</div></div>
      <div className="cd cd-s"><div className="st-l">Concluídos</div><div className="st-v" style={{color:"var(--c3)"}}>{completedClients.length}</div></div>
      <div className="cd cd-s"><div className="st-l">Em Atraso</div><div className="st-v" style={{color:overdueClients.length>0?"var(--exp)":"var(--c3)"}}>{overdueClients.length}</div></div>
    </div>

    <div className="g2" style={{marginBottom:16}}>
      {/* Pipeline mensal */}
      <div className="cd">
        <div style={{fontWeight:600,fontSize:13,marginBottom:14}}>Pipeline Mensal</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:4,height:90}}>
          {pipeline.map((p,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{fontSize:9,color:"var(--c3)",fontWeight:500}}>{p.value>0?fmtS(p.value):""}</div>
            <div style={{width:"100%",background:i===0?"var(--biz)":"var(--bizBg)",borderRadius:"4px 4px 0 0",minHeight:3,height:`${(p.value/maxPipe)*72}px`,border:i===0?"none":"1px solid var(--biz)",opacity:i===0?1:.6,transition:"height .4s"}}/>
            <div style={{fontSize:9,color:"var(--c3)"}}>{p.label}</div>
          </div>)}
        </div>
      </div>

      {/* Por etapa */}
      <div className="cd">
        <div style={{fontWeight:600,fontSize:13,marginBottom:14}}>Por Etapa</div>
        {data.boardStages.map(s=>{const v=byStage[s]||0,cnt=clients.filter(c=>c.stage===s).length,col=STCOL[s]||"var(--biz)",pct=totalRevenue>0?(v/totalRevenue)*100:0;return <div key={s} style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:2,background:col,display:"inline-block",flexShrink:0}}/><span style={{fontWeight:500}}>{s}</span><span style={{color:"var(--c3)",fontSize:11}}>{cnt}</span></div>
            <span className="mono" style={{color:"var(--c2)"}}>{v>0?fmt(v):"—"}</span>
          </div>
          <div className="prg"><div className="prg-f" style={{width:`${pct}%`,background:col}}/></div>
        </div>})}
      </div>
    </div>

    {/* Alertas */}
    {(overdueClients.length>0||dueSoonClients.length>0)&&<div className="cd" style={{marginBottom:16}}>
      <div style={{fontWeight:600,fontSize:13,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><I.AlertCircle style={{color:"var(--wrn)"}}/> Atenção</div>
      {overdueClients.map(c=><div key={c.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:"var(--expBg)",marginBottom:6}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:"var(--exp)",flexShrink:0}}/>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:"var(--c3)"}}>Prazo vencido em {c.endDate} · {Math.abs(diffD(td,c.endDate))}d de atraso</div></div>
        <span className="cl-badge" style={{background:"var(--expBg)",color:"var(--exp)"}}>{c.stage}</span>
      </div>)}
      {dueSoonClients.map(c=><div key={c.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:"rgba(232,173,26,.08)",marginBottom:6}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:"var(--wrn)",flexShrink:0}}/>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:"var(--c3)"}}>Vence em {c.endDate} · {diffD(td,c.endDate)}d restantes</div></div>
        <span className="cl-badge" style={{background:"rgba(232,173,26,.15)",color:"var(--wrn)"}}>{c.stage}</span>
      </div>)}
    </div>}

    {/* Projetos recentes */}
    <div className="cd">
      <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>Projetos Recentes</div>
      {clients.length===0?<div style={{textAlign:"center",padding:"20px 0",color:"var(--c3)",fontSize:12}}>Nenhum projeto cadastrado.</div>
      :[...clients].sort((a,b)=>b.startDate.localeCompare(a.startDate)).slice(0,5).map(c=>{
        const sc=STCOL[c.stage]||"var(--biz)";
        const el=Math.max(0,diffD(c.startDate,td)),tot=c.endDate?Math.max(1,diffD(c.startDate,c.endDate)):90,pct=Math.min(100,(el/tot)*100);
        return <div key={c.id} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid var(--brd2)",alignItems:"center"}}>
          <div style={{width:36,height:36,borderRadius:8,background:"var(--bizBg)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--biz)",fontWeight:700,fontSize:12}}>{c.name.slice(0,2).toUpperCase()}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
            <div style={{fontSize:11,color:"var(--c3)",marginBottom:3}}>{c.service}</div>
            <div className="prg"><div className="prg-f" style={{width:`${pct}%`,background:sc,height:4}}/></div>
          </div>
          <span className="cl-badge" style={{background:sc+"18",color:sc,flexShrink:0}}>{c.stage}</span>
          <span className="mono" style={{fontSize:12,fontWeight:600,color:"var(--biz)",flexShrink:0}}>{fmt(c.value)}</span>
        </div>;
      })}
    </div>
  </div>;
}

/* ── Biz Clients ── */
function BizClients({data,dp}){
  const [modal,setModal]=useState(null),[detail,setDetail]=useState(null);
  const total=data.clients.reduce((s,c)=>s+c.value,0),active=data.clients.filter(c=>c.stage!=="Concluído");
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}><span style={{fontSize:17,fontWeight:600}}>Empresas & Projetos</span><button className="btn btn-biz" onClick={()=>setModal("add")}><I.Plus/> Nova Empresa</button></div>
    <div className="g3" style={{marginBottom:16}}><div className="cd cd-s"><div className="st-l">Projetos</div><div className="st-v">{data.clients.length}</div></div><div className="cd cd-s"><div className="st-l">Ativos</div><div className="st-v" style={{color:"var(--biz)"}}>{active.length}</div></div><div className="cd cd-s"><div className="st-l">Receita Total</div><div className="st-v mono" style={{color:"var(--inc)"}}>{fmt(total)}</div></div></div>
    <div className="cd">{data.clients.map(c=>{const td=todayDK(),el=Math.max(0,diffD(c.startDate,td)),tot=c.endDate?Math.max(1,diffD(c.startDate,c.endDate)):90,pct=Math.min(100,(el/tot)*100);const sc=STCOL[c.stage]||"var(--biz)";
      return <div key={c.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--brd2)",alignItems:"center",cursor:"pointer"}} onClick={()=>setDetail(c)}>
        <div style={{width:40,height:40,borderRadius:10,background:"var(--bizBg)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--biz)",fontWeight:700,fontSize:13}}>{c.name.slice(0,2).toUpperCase()}</div>
        <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:"var(--c3)"}}>{c.service} · {c.startDate} → {c.endDate||"TBD"}</div><div className="ag-bar" style={{marginTop:3,height:4}}><div className="ag-bar-f" style={{width:`${pct}%`,background:sc}}/></div></div>
        <span className="cl-badge" style={{background:sc+"18",color:sc}}>{c.stage}</span>
        <span className="mono" style={{fontSize:13,fontWeight:600,color:"var(--biz)"}}>{fmt(c.value)}</span>
        <div style={{display:"flex",gap:2}}><button className="btn btn-i btn-g btn-s" onClick={e=>{e.stopPropagation();setModal({e:c})}}><I.Edit/></button><button className="btn btn-i btn-g btn-s btn-d" onClick={e=>{e.stopPropagation();dp({type:"DEL_CLIENT",payload:c.id})}}><I.Trash/></button></div>
      </div>})}</div>
    {detail&&<Modal title={detail.name} onClose={()=>setDetail(null)} wide><div className="g2" style={{marginBottom:12}}><div><div className="fl">CNPJ</div><div className="mono" style={{fontSize:13}}>{detail.cnpj||"—"}</div></div><div><div className="fl">Serviço</div><div style={{fontWeight:500}}>{detail.service}</div></div></div>
      <div className="fg"><div className="fl">Descrição</div><div style={{fontSize:13,color:"var(--c2)"}}>{detail.serviceDesc||"—"}</div></div>
      <div className="g3" style={{marginBottom:12}}><div><div className="fl">Valor</div><div className="mono" style={{fontSize:16,fontWeight:700,color:"var(--biz)"}}>{fmt(detail.value)}</div>{detail.isInstallment&&<div style={{fontSize:11,color:"var(--c3)"}}>{detail.installments}x de {fmt(detail.monthlyValue)}</div>}</div><div><div className="fl">Prazo</div><div style={{fontSize:13}}>{detail.startDate} → {detail.endDate||"TBD"}</div></div><div><div className="fl">Etapa</div><span className="cl-badge" style={{background:"var(--bizBg)",color:"var(--biz)"}}>{detail.stage}</span></div></div>
      <div className="fg"><div className="fl">Entregas</div><div style={{fontSize:13,color:"var(--c2)"}}>{detail.deliverables||"—"}</div></div>
      <div className="g2"><div><div className="fl">Contato</div><div style={{fontSize:12}}>{detail.phone&&<div style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}><I.Phone/>{detail.phone}</div>}{detail.email&&<div style={{display:"flex",alignItems:"center",gap:4}}><I.Mail/>{detail.email}</div>}</div></div><div><div className="fl">Colaboradores</div>{detail.contacts?.length>0?detail.contacts.map((c,i)=><div key={i} style={{fontSize:12}}><strong>{c.name}</strong> — {c.role}</div>):<span style={{fontSize:12,color:"var(--c3)"}}>—</span>}</div></div>
    </Modal>}
    {modal&&<Modal title={modal==="add"?"Nova Empresa":"Editar"} onClose={()=>setModal(null)} wide><ClientForm initial={modal!=="add"?modal.e:null} stages={data.boardStages} onCancel={()=>setModal(null)} onSave={c=>{dp({type:modal==="add"?"ADD_CLIENT":"EDIT_CLIENT",payload:c});setModal(null)}}/></Modal>}
  </div>;
}

/* ── Biz Agenda ── */
function BizAgenda({data}){
  const [view,setView]=useState("cal");
  const sorted=[...data.clients].sort((a,b)=>a.startDate.localeCompare(b.startDate));
  const td=todayDK();
  const now=new Date();
  const [calYear,setCalYear]=useState(now.getFullYear());
  const [calMonth,setCalMonth]=useState(now.getMonth());
  const navCal=d=>{const nm=calMonth+d;if(nm<0){setCalYear(calYear-1);setCalMonth(11)}else if(nm>11){setCalYear(calYear+1);setCalMonth(0)}else setCalMonth(nm)};

  // Build calendar events: each client contributes start + end + deadline events
  const calEvents={}; // day → [{client,type}]
  const prefix=`${calYear}-${pad(calMonth+1)}-`;
  const dim=daysIn(calYear,calMonth);
  data.clients.forEach(c=>{
    // Mark days the project spans (start and end within this month)
    if(c.startDate&&c.startDate.startsWith(prefix)){const d=parseInt(c.startDate.slice(8));if(!calEvents[d])calEvents[d]=[];calEvents[d].push({c,type:"start"})}
    if(c.endDate&&c.endDate.startsWith(prefix)){const d=parseInt(c.endDate.slice(8));if(!calEvents[d])calEvents[d]=[];calEvents[d].push({c,type:"end"})}
    // Mark ongoing projects (spans this entire month)
    if(c.startDate&&c.endDate&&c.startDate.slice(0,7)<prefix.slice(0,7)&&c.endDate.slice(0,7)>prefix.slice(0,7)){
      for(let d=1;d<=dim;d++){if(!calEvents[d])calEvents[d]=[];calEvents[d].push({c,type:"span"})}
    }
  });

  const fw=firstWD2(calYear,calMonth),isCurMo=now.getFullYear()===calYear&&now.getMonth()===calMonth;

  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
      <span style={{fontSize:17,fontWeight:600}}>Agenda</span>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        {view==="cal"&&<div style={{display:"flex",alignItems:"center",gap:6}}>
          <button className="btn btn-i btn-g" onClick={()=>navCal(-1)}><I.ChevL/></button>
          <span style={{fontSize:13,fontWeight:600,minWidth:130,textAlign:"center"}}>{MOF[calMonth]} {calYear}</span>
          <button className="btn btn-i btn-g" onClick={()=>navCal(1)}><I.ChevR/></button>
        </div>}
        <div className="tabs">
          <button className={`tab ${view==="cal"?"on":""}`} onClick={()=>setView("cal")}><I.Grid style={{width:12,height:12}}/> Calendário</button>
          <button className={`tab ${view==="list"?"on":""}`} onClick={()=>setView("list")}><I.List style={{width:12,height:12}}/> Lista</button>
          <button className={`tab ${view==="gantt"?"on":""}`} onClick={()=>setView("gantt")}><I.Cal style={{width:12,height:12}}/> Gantt</button>
        </div>
      </div>
    </div>

    {view==="cal"&&<div className="cd">
      <div className="cal-g" style={{marginBottom:4}}>
        {WD.map(w=><div key={w} className="cal-hd">{w}</div>)}
        {Array.from({length:fw},(_,i)=><div key={`e${i}`} className="cal-d empty"/>)}
        {Array.from({length:dim},(_,i)=>{
          const d=i+1,isToday=isCurMo&&d===now.getDate(),evs=calEvents[d]||[];
          const uniq=[...new Map(evs.map(e=>[e.c.id+e.type,e])).values()];
          const startEvs=uniq.filter(e=>e.type==="start");
          const endEvs=uniq.filter(e=>e.type==="end");
          const spanEvs=uniq.filter(e=>e.type==="span");
          return <div key={d} className={`cal-d ${isToday?"today":""}`} style={{minHeight:60,gap:1}}>
            <span className="cal-dn">{d}</span>
            {startEvs.slice(0,2).map(e=>{const sc=STCOL[e.c.stage]||"var(--biz)";return <span key={e.c.id} style={{fontSize:7,background:sc,color:"#fff",borderRadius:3,padding:"1px 3px",display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:1}} title={e.c.name}>▶ {e.c.name}</span>})}
            {endEvs.slice(0,2).map(e=>{const sc=STCOL[e.c.stage]||"var(--biz)";const over=e.c.endDate<td&&e.c.stage!=="Concluído";return <span key={e.c.id} style={{fontSize:7,background:over?"var(--exp)":sc+"99",color:"#fff",borderRadius:3,padding:"1px 3px",display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:1}} title={e.c.name}>■ {e.c.name}</span>})}
            {spanEvs.length>0&&<span style={{fontSize:7,color:"var(--biz)",fontWeight:600}}>{spanEvs.length} ativo{spanEvs.length>1?"s":""}</span>}
          </div>;
        })}
      </div>
      {/* Legend */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",paddingTop:10,borderTop:"1px solid var(--brd2)",fontSize:10,color:"var(--c3)"}}>
        <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{background:"var(--biz)",width:8,height:8,borderRadius:2,display:"inline-block"}}/>Início</span>
        <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{background:"var(--biz)",opacity:.6,width:8,height:8,borderRadius:2,display:"inline-block"}}/>Entrega</span>
        <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{background:"var(--exp)",width:8,height:8,borderRadius:2,display:"inline-block"}}/>Atrasado</span>
      </div>
    </div>}

    {view==="list"&&<div>{sorted.map(c=>{const el=Math.max(0,diffD(c.startDate,td)),tot=c.endDate?Math.max(1,diffD(c.startDate,c.endDate)):90,pct=Math.min(100,(el/tot)*100);const dd=c.endDate?diffD(td,c.endDate):null;const over=dd!==null&&dd<0;const sc=STCOL[c.stage]||"var(--biz)";
      return <div className="ag-item" key={c.id} style={{borderLeftColor:sc}}>
        <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontWeight:600,fontSize:14}}>{c.name}</span><span className="cl-badge" style={{background:sc+"18",color:sc}}>{c.stage}</span></div>
        <div style={{fontSize:12,color:"var(--c2)",marginBottom:2}}>{c.service}{c.isInstallment?` · ${c.installments}x ${fmt(c.monthlyValue)}`:""}</div>
        <div style={{display:"flex",gap:12,fontSize:11,color:"var(--c3)",alignItems:"center"}}><span><I.Cal style={{width:11,height:11,verticalAlign:-2}}/> {c.startDate}</span><span>→</span><span style={{color:over?"var(--exp)":"var(--c3)"}}>{c.endDate||"TBD"}</span>{dd!==null&&<span style={{fontWeight:600,color:over?"var(--exp)":dd<=7?"var(--wrn)":"var(--c3)"}}>{over?`${Math.abs(dd)}d atrasado`:`${dd}d`}</span>}</div>
        <div className="ag-bar"><div className="ag-bar-f" style={{width:`${pct}%`,background:over?"var(--exp)":sc}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span className="mono" style={{fontSize:12,fontWeight:600,color:"var(--biz)"}}>{fmt(c.value)}</span><span style={{fontSize:10,color:"var(--c3)"}}>{c.deliverables?.split(",")[0]}</span></div></div>
      </div>})}</div>}

    {view==="gantt"&&<div className="cd" style={{overflowX:"auto"}}>
      {(()=>{const now2=new Date(),mths=Array.from({length:6},(_,i)=>{const d=new Date(now2.getFullYear(),now2.getMonth()+i-1,1);return{y:d.getFullYear(),m:d.getMonth(),l:MO[d.getMonth()]+" "+d.getFullYear()}});
        const mn=new Date(mths[0].y,mths[0].m,1),mx=new Date(mths[5].y,mths[5].m+1,0),tD=diffD(mn.toISOString().slice(0,10),mx.toISOString().slice(0,10));
        const toP=d=>Math.max(0,Math.min(100,(diffD(mn.toISOString().slice(0,10),d)/tD)*100));
        return <div style={{position:"relative",paddingLeft:90,minHeight:sorted.length*42+40}}>
          <div style={{display:"flex",borderBottom:"1px solid var(--brd2)",marginBottom:12}}>{mths.map((m2,i)=><div key={i} style={{flex:daysIn(m2.y,m2.m),textAlign:"center",fontSize:10,fontWeight:600,color:"var(--c3)",padding:"4px 0",borderRight:i<5?"1px solid var(--brd2)":"none"}}>{m2.l}</div>)}</div>
          <div style={{position:"absolute",left:`calc(90px + ${toP(td)}%)`,top:30,bottom:0,width:2,background:"var(--acc)",opacity:.4,zIndex:1}}/>
          {sorted.map(c=>{const sP=toP(c.startDate),eP=c.endDate?toP(c.endDate):Math.min(sP+10,100);const sc=STCOL[c.stage]||"var(--biz)";
            return <div key={c.id} style={{position:"relative",height:34,marginBottom:6}}>
              <div style={{position:"absolute",left:-90,top:"50%",transform:"translateY(-50%)",fontSize:11,fontWeight:600,width:85,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
              <div style={{position:"absolute",left:`${sP}%`,width:`${Math.max(eP-sP,2)}%`,top:3,height:28,borderRadius:6,background:sc,opacity:.75,display:"flex",alignItems:"center",paddingLeft:8,fontSize:10,fontWeight:600,color:"#fff",overflow:"hidden",whiteSpace:"nowrap"}}>{c.service}</div>
            </div>})}
        </div>})()}
    </div>}
  </div>;
}

/* ── Biz Kanban ── */
function BizBoard({data,dp}){
  const [dragId,setDragId]=useState(null),[dragStageFrom,setDragStageFrom]=useState(null);
  const [dragStageId,setDragStageId]=useState(null); // dragging a stage column
  const [stageModal,setStageModal]=useState(false);
  const [newStName,setNewStName]=useState("");
  const [newStPos,setNewStPos]=useState("end"); // "end" | index string

  const addStage=()=>{
    if(!newStName.trim())return;
    const idx=newStPos==="end"?data.boardStages.length:parseInt(newStPos);
    dp({type:"INSERT_STAGE_AT",payload:{name:newStName.trim(),index:idx}});
    setNewStName("");setNewStPos("end");setStageModal(false);
  };

  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
      <span style={{fontSize:17,fontWeight:600}}>Board</span>
      <button className="btn btn-biz btn-s" onClick={()=>setStageModal(true)}><I.Plus style={{width:12,height:12}}/> Nova Etapa</button>
    </div>

    <div className="kb-wrap">
      {data.boardStages.map((stage,stIdx)=>{
        const items=data.clients.filter(c=>c.stage===stage);
        const col=STCOL[stage]||"var(--biz)";
        return <div key={stage} className="kb-col"
          style={{outline:dragStageId===stage?"2px solid var(--biz)":""}}
          onDragOver={e=>{e.preventDefault()}}
          onDrop={e=>{
            // Card drop
            if(dragId){dp({type:"MOVE_CLIENT",payload:{id:dragId,stage}});setDragId(null);setDragStageFrom(null)}
            // Stage reorder drop
            if(dragStageId&&dragStageId!==stage){
              const from=data.boardStages.indexOf(dragStageId);
              const to=data.boardStages.indexOf(stage);
              dp({type:"REORDER_STAGE",payload:{from,to}});
              setDragStageId(null);
            }
          }}>
          <div className="kb-col-hd"
            draggable
            onDragStart={e=>{e.stopPropagation();setDragStageId(stage)}}
            onDragEnd={()=>setDragStageId(null)}
            style={{cursor:"grab",userSelect:"none"}}>
            <span style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0}}/>
              {stage}
              <span style={{fontSize:10,color:"var(--c3)",fontWeight:400}}>({items.length})</span>
            </span>
            <div style={{display:"flex",gap:2,alignItems:"center"}}>
              {/* Move left/right buttons */}
              {stIdx>0&&<button className="btn btn-i btn-g btn-s" style={{width:18,height:18,padding:0}} title="Mover para esquerda"
                onClick={e=>{e.stopPropagation();dp({type:"REORDER_STAGE",payload:{from:stIdx,to:stIdx-1}})}}
              ><I.ChevL style={{width:10,height:10}}/></button>}
              {stIdx<data.boardStages.length-1&&<button className="btn btn-i btn-g btn-s" style={{width:18,height:18,padding:0}} title="Mover para direita"
                onClick={e=>{e.stopPropagation();dp({type:"REORDER_STAGE",payload:{from:stIdx,to:stIdx+1}})}}
              ><I.ChevR style={{width:10,height:10}}/></button>}
              {!BSTAGES.includes(stage)&&<button className="btn btn-i btn-g btn-s btn-d" style={{width:20,height:20}} onClick={e=>{e.stopPropagation();dp({type:"DEL_STAGE",payload:stage})}}><I.X style={{width:10,height:10}}/></button>}
            </div>
          </div>
          {items.map(c=><div key={c.id} className="kb-card" draggable
            onDragStart={e=>{e.stopPropagation();setDragId(c.id);setDragStageFrom(stage)}}
            onDragEnd={()=>{setDragId(null);setDragStageFrom(null)}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{c.name}</div>
            <div style={{fontSize:11,color:"var(--c3)",marginBottom:4}}>{c.service}</div>
            <div className="mono" style={{fontSize:12,fontWeight:600,color:"var(--biz)"}}>{fmt(c.value)}{c.isInstallment?<span style={{fontWeight:400,opacity:.7}}> ({c.installments}x)</span>:""}</div>
            <div style={{fontSize:10,color:"var(--c3)",marginTop:4,display:"flex",gap:4,alignItems:"center"}}><I.Clock/>{c.startDate} → {c.endDate||"TBD"}</div>
            <div style={{display:"flex",gap:3,marginTop:6,flexWrap:"wrap"}}>{data.boardStages.filter(s=>s!==stage).map(s=><button key={s} className="btn btn-s btn-g" style={{fontSize:9,padding:"2px 5px"}} onClick={()=>dp({type:"MOVE_CLIENT",payload:{id:c.id,stage:s}})}>{s}</button>)}</div>
          </div>)}
          {items.length===0&&<div style={{textAlign:"center",padding:"20px 0",fontSize:11,color:"var(--c3)",opacity:.6}}>Arraste aqui</div>}
        </div>;
      })}
    </div>

    {/* Modal nova etapa */}
    {stageModal&&<Modal title="Nova Etapa" onClose={()=>setStageModal(false)}>
      <div className="fg">
        <label className="fl">Nome da Etapa</label>
        <input className="fi" placeholder="ex: Revisão Final, QA, Deploy..." value={newStName} onChange={e=>setNewStName(e.target.value)} autoFocus/>
      </div>
      <div className="fg">
        <label className="fl">Posição no Board</label>
        <select className="fs" value={newStPos} onChange={e=>setNewStPos(e.target.value)}>
          <option value="0">Primeira posição</option>
          {data.boardStages.map((s,i)=><option key={i+1} value={i+1}>Após "{s}"</option>)}
          <option value="end">Última posição</option>
        </select>
      </div>
      {/* Preview */}
      <div style={{marginBottom:14}}>
        <label className="fl">Pré-visualização da Ordem</label>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {(()=>{
            const pos=newStPos==="end"?data.boardStages.length:parseInt(newStPos);
            const preview=[...data.boardStages];
            if(newStName.trim())preview.splice(pos,0,newStName.trim());
            return preview.map((s,i)=><span key={i} style={{padding:"3px 8px",borderRadius:5,fontSize:11,fontWeight:600,background:s===newStName.trim()?"var(--bizBg)":"var(--bg-2)",color:s===newStName.trim()?"var(--biz)":"var(--c2)",border:s===newStName.trim()?"1px solid var(--biz)":"1px solid var(--brd2)"}}>{i+1}. {s}</span>);
          })()}
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:6}}>
        <button className="btn" onClick={()=>setStageModal(false)}>Cancelar</button>
        <button className="btn btn-biz" onClick={addStage}>Criar Etapa</button>
      </div>
    </Modal>}
  </div>;
}

/* ═══ MAIN ═══ */

/* ── Day Detail Modal ── */
function DayDetailModal({day,year,month,data,dp,onClose}){
  const dateKey=dk(year,month,day);
  const [editTx,setEditTx]=useState(null);
  const [confirmId,setConfirmId]=useState(null);
  const txs=data.transactions.filter(t=>t.date===dateKey).sort((a,b)=>a.time?.localeCompare(b.time||"")||0);
  const income=txs.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const expense=txs.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  const bal=income-expense;
  const wd=WD[new Date(year,month,day).getDay()];
  return <Modal title={`${pad(day)} de ${MOF[month]} — ${wd}`} onClose={onClose}>
    {editTx?<>
      <div style={{fontSize:12,color:"var(--c2)",marginBottom:12}}>Editando: <strong>{editTx.description}</strong></div>
      <TxForm initial={editTx} data={data} dp={dp} onCancel={()=>setEditTx(null)} onSave={()=>setEditTx(null)}/>
    </>:<>
      <div className="day-sum" style={{display:"flex",gap:10,marginBottom:16}}>
        <div style={{flex:1,padding:"10px 12px",background:"var(--incBg)",borderRadius:8,borderLeft:"3px solid var(--inc)"}}><div style={{fontSize:10,color:"var(--inc)",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Entradas</div><div className="mono" style={{fontSize:16,fontWeight:700,color:"var(--inc)"}}>{fmt(income)}</div></div>
        <div style={{flex:1,padding:"10px 12px",background:"var(--expBg)",borderRadius:8,borderLeft:"3px solid var(--exp)"}}><div style={{fontSize:10,color:"var(--exp)",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Saídas</div><div className="mono" style={{fontSize:16,fontWeight:700,color:"var(--exp)"}}>{fmt(expense)}</div></div>
        <div style={{flex:1,padding:"10px 12px",background:"var(--bg-2)",borderRadius:8,borderLeft:`3px solid ${bal>=0?"var(--inc)":"var(--exp)"}`}}><div style={{fontSize:10,color:"var(--c3)",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Saldo do dia</div><div className="mono" style={{fontSize:16,fontWeight:700,color:bal>=0?"var(--inc)":"var(--exp)"}}>{fmt(bal)}</div></div>
      </div>
      {txs.length===0
        ?<div style={{textAlign:"center",padding:"32px 0",color:"var(--c3)",fontSize:13}}>Nenhuma transação neste dia.</div>
        :<div>{txs.map(tx=>(
          confirmId===tx.id
            ?<div key={tx.id} style={{padding:"6px 0"}}><ConfirmRow label={`Excluir "${tx.description}"?`} onConfirm={()=>{dp({type:"DEL_TX",payload:tx.id});setConfirmId(null)}} onCancel={()=>setConfirmId(null)}/></div>
            :<div key={tx.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid var(--brd2)"}}>
              <div className={`tx-ic ${tx.type==="income"?"in":"out"}`} style={{width:32,height:32,flexShrink:0}}>{tx.type==="income"?<I.Up/>:<I.Down/>}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tx.description}</div>
                <div style={{fontSize:11,color:"var(--c3)",marginTop:1,display:"flex",gap:6,alignItems:"center"}}>
                  <span>{tx.category}</span>
                  {tx.time&&<span>· {tx.time}</span>}
                  {tx.isInstallment&&<span style={{color:"var(--acc)",fontWeight:600}}>· Parcela</span>}
                  {tx.isRecurring&&<span style={{color:"var(--wrn)",fontWeight:600}}>· Recorrente</span>}
                </div>
                {(tx.tags||[]).length>0&&<div style={{display:"flex",gap:3,marginTop:3,flexWrap:"wrap"}}>{tx.tags.map(t=><span key={t} className="tg">{t}</span>)}</div>}
              </div>
              <div className="mono" style={{color:tx.type==="income"?"var(--inc)":"var(--exp)",fontWeight:600,fontSize:13,flexShrink:0}}>{tx.type==="income"?"+":"-"}{fmt(tx.amount)}</div>
              <div style={{display:"flex",gap:2,flexShrink:0}}>
                <button className="btn btn-i btn-g btn-s" title="Editar" onClick={()=>setEditTx(tx)}><I.Edit/></button>
                <button className="btn btn-i btn-g btn-s btn-d" title="Excluir" onClick={()=>setConfirmId(tx.id)}><I.Trash/></button>
              </div>
            </div>
        ))}</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14,paddingTop:12,borderTop:"1px solid var(--brd2)"}}>
        <span style={{fontSize:12,color:"var(--c3)"}}>{txs.length} transaç{txs.length===1?"ão":"ões"}</span>
        <button className="btn btn-a btn-s" onClick={()=>setEditTx({date:dateKey,type:"expense"})}><I.Plus style={{width:12,height:12}}/> Adicionar</button>
      </div>
    </>}
  </Modal>;
}

/* ── Personal Calendar ── */
function PFCalendar({data,dp,year,month,setMonth,setYear}){
  const [view,setView]=useState("grid"),[modal,setModal]=useState(null),[selDay,setSelDay]=useState(null);
  const dim=daysIn(year,month),fw=firstWD2(year,month),today=new Date(),isCur=today.getFullYear()===year&&today.getMonth()===month;
  const txByDay={};data.transactions.forEach(tx=>{const prefix=`${year}-${pad(month+1)}-`;if(tx.date.startsWith(prefix)){const d=parseInt(tx.date.slice(8));if(!txByDay[d])txByDay[d]={income:0,expense:0,n:0};if(tx.type==="income")txByDay[d].income+=tx.amount;else txByDay[d].expense+=tx.amount;txByDay[d].n++}});
  let running=0;const dayBal={};for(let d=1;d<=dim;d++){const dd=txByDay[d];if(dd)running+=dd.income-dd.expense;dayBal[d]=running}
  const maxDay=Math.max(...Object.values(txByDay).map(v=>Math.max(v.income,v.expense)),1);
  const nav=dir=>{const nm=month+dir;if(nm<0){setYear(year-1);setMonth(11)}else if(nm>11){setYear(year+1);setMonth(0)}else setMonth(nm)};

  // Card bills due this month
  const cardBills=getCardBillsByDueDate(data.cards||[],data.cardPurchases||[]);
  const prefix2=`${year}-${pad(month+1)}-`;
  const cardBillsThisMonth={};
  Object.entries(cardBills).forEach(([date,info])=>{
    if(date.startsWith(prefix2)){
      const d=parseInt(date.slice(8));
      cardBillsThisMonth[d]=info;
    }
  });

  const gridCells=[];for(let i=0;i<fw;i++)gridCells.push(<div key={`e${i}`} className="cal-d empty"/>);
  for(let d=1;d<=dim;d++){const isToday=isCur&&d===today.getDate(),dd=txByDay[d],bal=dayBal[d],bill=cardBillsThisMonth[d];
    gridCells.push(<div key={d} className={`cal-d ${isToday?"today":""}`} onClick={()=>setSelDay(d)}>
      <span className="cal-dn">{d}</span>
      {dd?<>{dd.income>0&&<span className="cal-dv pos">+{fmtS(dd.income)}</span>}{dd.expense>0&&<span className="cal-dv neg">-{fmtS(dd.expense)}</span>}<span className="cal-bal" style={{color:bal>=0?"var(--inc)":"var(--exp)"}}>{fmtS(bal)}</span></>:<span className="cal-bal" style={{color:"var(--c3)"}}>{d>1?fmtS(dayBal[d]):"—"}</span>}
      {bill&&<span style={{fontSize:7,fontWeight:700,color:"#fff",background:bill.cardColor,borderRadius:3,padding:"1px 3px",marginTop:1,display:"block",textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>💳 {fmtS(bill.total)}</span>}
    </div>)}
  return <div>
    <PNav label={`${MOF[month]} ${year}`} onPrev={()=>nav(-1)} onNext={()=>nav(1)} extra={<div style={{display:"flex",gap:6}}><div className="tabs"><button className={`tab ${view==="grid"?"on":""}`} onClick={()=>setView("grid")}><I.Grid style={{width:13,height:13}}/></button><button className={`tab ${view==="list"?"on":""}`} onClick={()=>setView("list")}><I.List style={{width:13,height:13}}/></button></div><button className="btn btn-a" onClick={()=>setModal(1)}><I.Plus/> Transação</button></div>}/>
    {view==="grid"?<div className="cd"><div className="cal-g">{WD.map(w=><div key={w} className="cal-hd">{w}</div>)}{gridCells}</div>
      {Object.keys(cardBillsThisMonth).length>0&&<div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10,paddingTop:10,borderTop:"1px solid var(--brd2)"}}>
        {(data.cards||[]).filter(c=>Object.values(cardBillsThisMonth).some(b=>b.byCard[c.id])).map(c=>{
          const entry=Object.entries(cardBillsThisMonth).find(([,b])=>b.byCard[c.id]);
          if(!entry)return null;
          const[dateStr,info]=entry;
          return <div key={c.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,padding:"4px 8px",borderRadius:6,background:c.color+"22",border:`1px solid ${c.color}44`}}>
            <div style={{width:8,height:8,borderRadius:2,background:c.color,flexShrink:0}}/>
            <span style={{fontWeight:600}}>{c.name}</span>
            <span style={{color:"var(--c3)"}}>vence dia {parseInt(dateStr.slice(8))}</span>
            <span className="mono" style={{fontWeight:700,color:"var(--exp)"}}>{fmt(info.byCard[c.id])}</span>
          </div>;
        })}
      </div>}
    </div>
    :<div className="cd" style={{padding:"12px 16px"}}>{Array.from({length:dim},(_,i)=>i+1).map(d=>{const isToday=isCur&&d===today.getDate(),dd=txByDay[d],bal=dayBal[d],wd=WD[new Date(year,month,d).getDay()],isWE=[0,6].includes(new Date(year,month,d).getDay()),bill=cardBillsThisMonth[d];
      return <div key={d} className="cal-li" onClick={()=>setSelDay(d)} style={isToday?{background:"var(--accL)",margin:"0 -12px",padding:"10px 12px",borderRadius:8}:{}}>
        <div className="cal-li-day"><div className="cal-li-num" style={{color:isWE?"var(--c3)":"var(--c1)"}}>{pad(d)}</div><div className="cal-li-wd">{wd}</div></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
          {dd?<><div style={{display:"flex",gap:4}}><div className="cal-li-bar" style={{width:`${(dd.income/maxDay)*100}%`,background:"var(--inc)",opacity:.6}}/></div><div style={{display:"flex",gap:4}}><div className="cal-li-bar" style={{width:`${(dd.expense/maxDay)*100}%`,background:"var(--exp)",opacity:.6}}/></div><div style={{display:"flex",gap:10,fontSize:11}}><span style={{color:"var(--inc)"}}>+{fmtS(dd.income)}</span><span style={{color:"var(--exp)"}}>-{fmtS(dd.expense)}</span><span style={{color:"var(--c3)"}}>{dd.n} tx</span></div></>:<div style={{fontSize:11,color:"var(--c3)",padding:"4px 0"}}>sem movimentação</div>}
          {bill&&<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{Object.keys(bill.byCard).map(cid=>{const cc=(data.cards||[]).find(c=>c.id===cid);return cc?<span key={cid} style={{fontSize:10,padding:"1px 6px",borderRadius:4,background:cc.color+"30",border:`1px solid ${cc.color}55`,color:"var(--c1)",fontWeight:600}}>💳 {cc.name}: {fmt(bill.byCard[cid])}</span>:null})}</div>}
        </div>
        <div className="cal-li-bal mono" style={{color:bal>=0?"var(--inc)":"var(--exp)"}}>{fmtS(bal)}</div></div>})}</div>}
    {modal&&<Modal title="Nova Transação" onClose={()=>setModal(null)}><TxForm initial={{date:dk(year,month,1)}} data={data} dp={dp} onCancel={()=>setModal(null)} onSave={()=>setModal(null)}/></Modal>}
    {selDay&&<DayDetailModal day={selDay} year={year} month={month} data={data} dp={dp} onClose={()=>setSelDay(null)}/>}
  </div>;
}

/* ── Personal Tags & Categories ── */
function PFTags({data,dp}){
  const [newIn,setNewIn]=useState(""),[newOut,setNewOut]=useState(""),[newTag,setNewTag]=useState("");
  const catSpend={},catInc={},tagSpend={};
  data.transactions.filter(t=>t.type==="expense").forEach(t=>{catSpend[t.category]=(catSpend[t.category]||0)+t.amount});
  data.transactions.filter(t=>t.type==="income").forEach(t=>{catInc[t.category]=(catInc[t.category]||0)+t.amount});
  data.transactions.filter(t=>t.type==="expense").forEach(t=>{(t.tags||[]).forEach(tg=>{tagSpend[tg]=(tagSpend[tg]||0)+t.amount})});
  return <div>
    <div style={{fontSize:17,fontWeight:600,marginBottom:18}}>Categorias & Tags</div>
    <div className="g2" style={{marginBottom:16}}>
      <div className="cd"><div style={{fontWeight:600,fontSize:14,marginBottom:12,color:"var(--inc)"}}>Categorias de Entrada</div>
        <div style={{display:"flex",gap:6,marginBottom:12}}><input className="fi" placeholder="Nova categoria..." value={newIn} onChange={e=>setNewIn(e.target.value)} style={{flex:1}}/><button className="btn btn-a btn-s" onClick={()=>{if(newIn.trim()){dp({type:"ADD_CAT_IN",payload:newIn.trim()});setNewIn("")}}}>Criar</button></div>
        {data.customCatsIn.map((c,i)=><div key={c} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:"1px solid var(--brd2)"}}><div style={{width:10,height:10,borderRadius:3,background:CC[i%CC.length],flexShrink:0}}/><span style={{flex:1,fontSize:13,fontWeight:500}}>{c}</span><span className="mono" style={{fontSize:12,color:"var(--inc)"}}>{catInc[c]?fmt(catInc[c]):"—"}</span>{!DCIN.includes(c)&&<button className="btn btn-i btn-g btn-s btn-d" onClick={()=>dp({type:"DEL_CAT_IN",payload:c})}><I.Trash/></button>}</div>)}
      </div>
      <div className="cd"><div style={{fontWeight:600,fontSize:14,marginBottom:12,color:"var(--exp)"}}>Categorias de Saída</div>
        <div style={{display:"flex",gap:6,marginBottom:12}}><input className="fi" placeholder="Nova categoria..." value={newOut} onChange={e=>setNewOut(e.target.value)} style={{flex:1}}/><button className="btn btn-a btn-s" onClick={()=>{if(newOut.trim()){dp({type:"ADD_CAT_OUT",payload:newOut.trim()});setNewOut("")}}}>Criar</button></div>
        {data.customCatsOut.map((c,i)=><div key={c} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:"1px solid var(--brd2)"}}><div style={{width:10,height:10,borderRadius:3,background:CC[i%CC.length],flexShrink:0}}/><span style={{flex:1,fontSize:13,fontWeight:500}}>{c}</span><span className="mono" style={{fontSize:12,color:"var(--exp)"}}>{catSpend[c]?fmt(catSpend[c]):"—"}</span>{!DCOUT.includes(c)&&<button className="btn btn-i btn-g btn-s btn-d" onClick={()=>dp({type:"DEL_CAT_OUT",payload:c})}><I.Trash/></button>}</div>)}
      </div>
    </div>
    <div className="cd"><div style={{fontWeight:600,fontSize:14,marginBottom:12}}>Tags</div>
      <div style={{display:"flex",gap:6,marginBottom:12}}><input className="fi" placeholder="Nova tag..." value={newTag} onChange={e=>setNewTag(e.target.value)} style={{flex:1}}/><button className="btn btn-a btn-s" onClick={()=>{if(newTag.trim()){dp({type:"ADD_TAG",payload:newTag.trim().toLowerCase()});setNewTag("")}}}>Criar</button></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{data.tags.map(t=><div key={t} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"var(--bg-2)",borderRadius:8,border:"1px solid var(--brd2)"}}><I.Tag style={{width:12,height:12,color:"var(--c3)"}}/><span style={{fontSize:13,fontWeight:500}}>{t}</span><span className="mono" style={{fontSize:11,color:tagSpend[t]?"var(--exp)":"var(--c3)"}}>{tagSpend[t]?fmt(tagSpend[t]):"—"}</span><button className="btn btn-i btn-g btn-s btn-d" style={{width:22,height:22}} onClick={()=>dp({type:"DEL_TAG",payload:t})}><I.X style={{width:10,height:10}}/></button></div>)}</div>
    </div>
  </div>;
}

/* ── Credit Card Visual ── */
function CardVisual({card,onClick,selected}){
  return <div className="cc-card" style={{background:card.color,outline:selected?"2px solid #fff":"none",outlineOffset:2}} onClick={onClick}>
    <div style={{position:"relative",zIndex:1}}>
      <div className="cc-chip"/>
      <div className="cc-digits">•••• •••• •••• {card.lastDigits}</div>
    </div>
    <div className="cc-row">
      <div><div className="cc-name">{card.name}</div><div style={{fontSize:10,opacity:.6,marginTop:1}}>Venc. dia {card.dueDay}</div></div>
      <div className="cc-brand">{card.brand}</div>
    </div>
  </div>;
}

/* ── Card Form (create/edit card) ── */
function CardForm({onSave,onCancel,initial}){
  const [f,setF]=useState(initial||{name:"",brand:"Visa",lastDigits:"",color:CARD_COLORS[0],limit:"",dueDay:"10",closeDay:"3"});
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  return <>
    <div className="fr"><div className="fg"><label className="fl">Nome do Cartão</label><input className="fi" placeholder="ex: Nubank" value={f.name} onChange={e=>u("name",e.target.value)}/></div>
    <div className="fg"><label className="fl">Bandeira</label><select className="fs" value={f.brand} onChange={e=>u("brand",e.target.value)}>{CARD_BRANDS.map(b=><option key={b}>{b}</option>)}</select></div></div>
    <div className="fr"><div className="fg"><label className="fl">4 Últimos Dígitos</label><input className="fi mono" maxLength={4} placeholder="0000" value={f.lastDigits} onChange={e=>u("lastDigits",e.target.value.replace(/\D/g,""))}/></div>
    <div className="fg"><label className="fl">Limite (R$)</label><input className="fi mono" type="number" value={f.limit} onChange={e=>u("limit",e.target.value)}/></div></div>
    <div className="fr"><div className="fg"><label className="fl">Dia de Vencimento</label><input className="fi mono" type="number" min="1" max="31" value={f.dueDay} onChange={e=>u("dueDay",e.target.value)}/></div>
    <div className="fg"><label className="fl">Dia de Fechamento</label><input className="fi mono" type="number" min="1" max="31" value={f.closeDay} onChange={e=>u("closeDay",e.target.value)}/></div></div>
    <div className="fg"><label className="fl">Cor do Cartão</label>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {CARD_COLORS.map(c=><div key={c} onClick={()=>u("color",c)} style={{width:28,height:28,borderRadius:6,background:c,cursor:"pointer",outline:f.color===c?"2px solid var(--acc)":"2px solid transparent",outlineOffset:2,transition:"outline .1s"}}/>)}
        <input type="color" value={f.color} onChange={e=>u("color",e.target.value)} style={{width:28,height:28,borderRadius:6,border:"1px solid var(--brd)",cursor:"pointer",padding:0,background:"none"}} title="Cor personalizada"/>
      </div>
    </div>
    <div style={{marginBottom:14}}><label className="fl">Pré-visualização</label>
      <div style={{maxWidth:260}}><CardVisual card={{...f,dueDay:f.dueDay||"?",lastDigits:f.lastDigits||"0000"}}/></div>
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:6}}><button className="btn" onClick={onCancel}>Cancelar</button>
    <button className="btn btn-a" onClick={()=>{if(!f.name||!f.lastDigits)return;onSave({...f,id:initial?.id||uid(),limit:parseFloat(f.limit)||0,dueDay:parseInt(f.dueDay)||10,closeDay:parseInt(f.closeDay)||3})}}>{initial?.id?"Salvar":"Cadastrar"}</button></div>
  </>;
}

/* ── Card Purchase Form ── */
function CardPurchaseForm({onSave,onCancel,initial,cards,cats}){
  const [f,setF]=useState(initial||{cardId:cards[0]?.id||"",description:"",amount:"",date:todayDK(),category:cats[0]||"Outros",totalInstallments:"1"});
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  const n=parseInt(f.totalInstallments)||1;
  const instAmt=f.amount&&n>1?parseFloat(f.amount)/n:parseFloat(f.amount)||0;

  // Billing cycle awareness
  const selectedCard=cards.find(c=>c.id===f.cardId);
  const billingInfo=selectedCard&&f.date?getCardBillingInfo(selectedCard,f.date):null;
  const today=new Date();
  const todayDay=today.getDate();
  const isFaturaFechada=selectedCard&&todayDay>selectedCard.closeDay;

  // When card changes, adjust default date
  const handleCardChange=(cardId)=>{
    const c=cards.find(x=>x.id===cardId);
    if(!c)return u("cardId",cardId);
    const todayStr=todayDK();
    const [ty,tm,td2]=todayStr.split("-").map(Number);
    // If already past closeDay, default date stays today (compra cai na próxima fatura)
    u("cardId",cardId);
  };

  return <>
    <div className="fg"><label className="fl">Cartão</label>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {cards.map(c=><div key={c.id} onClick={()=>handleCardChange(c.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 10px",borderRadius:8,border:`2px solid ${f.cardId===c.id?c.color:"var(--brd)"}`,cursor:"pointer",background:f.cardId===c.id?c.color+"22":"var(--bg-2)",transition:"all .12s"}}>
          <div style={{width:10,height:10,borderRadius:2,background:c.color,flexShrink:0}}/>
          <span style={{fontSize:12,fontWeight:600}}>{c.name}</span>
          <span className="mono" style={{fontSize:10,color:"var(--c3)"}}>••{c.lastDigits}</span>
        </div>)}
      </div>
    </div>

    {/* Fatura fechada — aviso contextual */}
    {isFaturaFechada&&!initial?.id&&<div style={{padding:"8px 12px",background:"var(--wrnBg,rgba(232,173,26,.1))",border:"1px solid var(--wrn)",borderRadius:8,marginBottom:12,display:"flex",gap:8,alignItems:"flex-start"}}>
      <I.AlertCircle style={{color:"var(--wrn)",flexShrink:0,marginTop:1}}/>
      <div>
        <div style={{fontSize:12,fontWeight:600,color:"var(--wrn)"}}>Fatura fechada — dia {selectedCard?.closeDay}</div>
        <div style={{fontSize:11,color:"var(--c2)",marginTop:2}}>Esta compra entrará na <strong>próxima fatura</strong> (vence dia {selectedCard?.dueDay} do próximo mês).</div>
      </div>
    </div>}

    <div className="fg"><label className="fl">Descrição</label><input className="fi" placeholder="ex: Amazon, iFood..." value={f.description} onChange={e=>u("description",e.target.value)}/></div>
    <div className="fr"><div className="fg"><label className="fl">Valor Total (R$)</label><input className="fi mono" type="number" step="0.01" value={f.amount} onChange={e=>u("amount",e.target.value)}/></div>
    <div className="fg"><label className="fl">Categoria</label><select className="fs" value={f.category} onChange={e=>u("category",e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div></div>
    <div className="fr"><div className="fg">
        <label className="fl">Data da Compra</label>
        <input className="fi" type="date" value={f.date} onChange={e=>u("date",e.target.value)}/>
        {billingInfo&&<div style={{fontSize:10,color:"var(--c3)",marginTop:3}}>
          Fatura: vence em <strong style={{color:"var(--exp)"}}>{billingInfo.dueDate}</strong>
        </div>}
      </div>
      <div className="fg"><label className="fl">Parcelas</label>
        <select className="fs" value={f.totalInstallments} onChange={e=>u("totalInstallments",e.target.value)}>
          {[1,2,3,4,5,6,7,8,9,10,11,12,18,24].map(n2=><option key={n2} value={n2}>{n2===1?"À vista":`${n2}x`}</option>)}
        </select>
      </div>
    </div>
    {n>1&&f.amount&&<div style={{padding:"8px 12px",background:"var(--accL)",borderRadius:8,fontSize:12,color:"var(--acc)",marginBottom:12,fontWeight:500}}>{n}x de {fmt(instAmt)} · Total: {fmt(parseFloat(f.amount))}</div>}
    <div style={{display:"flex",justifyContent:"flex-end",gap:6}}><button className="btn" onClick={onCancel}>Cancelar</button>
    <button className="btn btn-a" onClick={()=>{if(!f.cardId||!f.description||!f.amount)return;onSave({base:{...f,amount:parseFloat(f.amount),totalInstallments:n},totalInstallments:n})}}>{initial?.id?"Salvar":"Adicionar"}</button></div>
  </>;
}

/* ── Personal Cards (Cartões) ── */
function PFCards({data,dp}){
  const [selCard,setSelCard]=useState(data.cards?.[0]?.id||null);
  const [modal,setModal]=useState(null);
  const [confirmId,setConfirmId]=useState(null);
  // Month navigation: null = "fatura aberta atual", or a specific dueDate string "YYYY-MM-DD"
  const [viewDueDate,setViewDueDate]=useState(null);

  const cards=data.cards||[];
  const purchases=data.cardPurchases||[];
  const now=new Date(),todayDay=now.getDate();
  const todayStr=todayDK();

  const card=cards.find(c=>c.id===selCard);

  // When card changes, reset to current fatura
  const handleSelectCard=(id)=>{setSelCard(id);setViewDueDate(null);setConfirmId(null)};

  // Build the full bills map for this card (all dueDates with data)
  const billsMap=card?buildCardBillsMap([card],purchases):{};

  // Fatura aberta (hoje)
  const openDueDate=card?getOpenFaturaDueDate(card):null;

  // Effective dueDate being viewed — default to open fatura
  const activeDueDate=viewDueDate||openDueDate;

  // Navigate: collect all known dueDates for this card + open + prev/next months
  // We show a rolling window: allow going back as far as purchases exist, forward up to 3 months ahead
  const knownDueDates=card?[...new Set([
    ...Object.keys(billsMap),
    // Also include future dueDates with no purchases (for navigation context)
    ...Array.from({length:3},(_,i)=>{
      if(!openDueDate)return null;
      const[dy,dm]=openDueDate.split("-").map(Number);
      const rawM=dm-1+i+1; // +1 so we start 1 month ahead
      const ny=dy+Math.floor(rawM/12),nm=((rawM%12)+12)%12;
      return dk(ny,nm,card.dueDay);
    }).filter(Boolean)
  ])].filter(d=>{
    // Only dueDates that belong to this card's dueDay
    return parseInt(d.slice(8))===card.dueDay;
  }).sort():[];

  // Nav helpers
  const navMonth=(dir)=>{
    if(!activeDueDate||!card)return;
    const[dy,dm]=activeDueDate.split("-").map(Number);
    const rawM=dm-1+dir;
    const ny=dy+Math.floor(rawM/12),nm=((rawM%12)+12)%12;
    const newDate=dk(ny,nm,card.dueDay);
    setViewDueDate(newDate===openDueDate?null:newDate);
    setConfirmId(null);
  };

  // Is the viewed fatura the open one?
  const isViewingOpen=!viewDueDate||viewDueDate===openDueDate;
  // Is the viewed fatura in the future?
  const isViewingFuture=activeDueDate&&activeDueDate>openDueDate;
  // Is the viewed fatura the past?
  const isViewingPast=activeDueDate&&activeDueDate<openDueDate;

  // Purchases for the viewed fatura
  const viewedPurchases=card?purchases.filter(p=>{
    if(p.cardId!==card.id)return false;
    const{dueDate}=getCardBillingInfo(card,p.date);
    return dueDate===activeDueDate;
  }):[];
  const viewedTotal=viewedPurchases.reduce((s,p)=>s+p.amount,0);

  // For the "open" fatura (used in banner)
  const {total:currentFaturaTotal}=card?getOpenFaturaData(card,purchases):{total:0};
  const isClosed=card&&todayDay>card.closeDay;

  // Month label for navigation
  const monthLabel=activeDueDate?`${MOF[parseInt(activeDueDate.slice(5,7))-1]} ${activeDueDate.slice(0,4)}`:"—";

  const usageP=card?(viewedTotal/card.limit)*100:0;
  const usageColor=usageP>90?"var(--exp)":usageP>70?"var(--wrn)":"var(--inc)";

  // Parcelas em andamento (todos os cartões, para o painel de finalizando em breve)
  const activeGroups=new Map();
  purchases.forEach(p=>{
    if(p.totalInstallments>1&&p.installmentGroup){
      if(!activeGroups.has(p.installmentGroup))activeGroups.set(p.installmentGroup,[]);
      activeGroups.get(p.installmentGroup).push(p);
    }
  });
  const activeInstallmentGroups=[...activeGroups.entries()].map(([grpId,ps])=>{
    const sorted=ps.sort((a,b)=>a.date.localeCompare(b.date));
    const remaining=sorted.filter(p=>p.date>=todayStr);
    const card2=cards.find(c=>c.id===ps[0]?.cardId);
    return{grpId,description:ps[0]?.description,totalInstallments:ps[0]?.totalInstallments,paidCount:ps.length-remaining.length,remaining:remaining.length,nextDate:remaining[0]?.date,amountPerInstallment:ps[0]?.amount,cardColor:card2?.color||"var(--c3)",cardName:card2?.name||"—",cardId:ps[0]?.cardId};
  }).filter(g=>g.remaining>0);


  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><I.CreditCard style={{color:"var(--acc)"}}/><span style={{fontSize:17,fontWeight:600}}>Cartões de Crédito</span></div>
      <button className="btn btn-a" onClick={()=>setModal("addCard")}><I.Plus/> Novo Cartão</button>
    </div>

    {cards.length===0?<div className="cd" style={{textAlign:"center",padding:"40px 20px",color:"var(--c3)"}}>
      <I.CreditCard style={{width:40,height:40,margin:"0 auto 12px",opacity:.3}}/>
      <div style={{fontSize:14,fontWeight:500}}>Nenhum cartão cadastrado</div>
      <div style={{fontSize:12,marginTop:6}}>Adicione um cartão para começar a controlar seus gastos</div>
    </div>:<>
      <div className="cc-wrap">
        {cards.map(c=><div key={c.id} style={{position:"relative"}}>
          <CardVisual card={c} selected={selCard===c.id} onClick={()=>handleSelectCard(c.id)}/>
          <div style={{position:"absolute",top:8,right:8,display:"flex",gap:3}}>
            <button className="btn btn-i btn-g btn-s" style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:24,height:24}} onClick={e=>{e.stopPropagation();setModal({editCard:c})}}><I.Edit style={{width:11,height:11}}/></button>
            <button className="btn btn-i btn-g btn-s btn-d" style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:24,height:24}} onClick={e=>{e.stopPropagation();setConfirmId("card:"+c.id)}}><I.Trash style={{width:11,height:11}}/></button>
          </div>
        </div>)}
        <div className="cc-card" style={{background:"var(--bg-2)",border:"2px dashed var(--brd)",boxShadow:"none",alignItems:"center",justifyContent:"center",color:"var(--c3)",cursor:"pointer",minHeight:130}} onClick={()=>setModal("addCard")}>
          <I.Plus style={{width:22,height:22,marginBottom:6,opacity:.5}}/>
          <span style={{fontSize:12}}>Adicionar cartão</span>
        </div>
      </div>

      {confirmId&&confirmId.startsWith("card:")&&<div style={{marginBottom:12}}>
        <ConfirmRow label={`Excluir "${cards.find(c=>c.id===confirmId.slice(5))?.name}"? Todos os gastos serão removidos.`} onConfirm={()=>{dp({type:"DEL_CARD",payload:confirmId.slice(5)});setConfirmId(null);handleSelectCard(cards.find(c=>c.id!==confirmId.slice(5))?.id||null)}} onCancel={()=>setConfirmId(null)}/>
      </div>}

      {card&&<>
        {/* ── Navegador de mês ── */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,padding:"10px 14px",background:"var(--bg-1)",border:"1px solid var(--brd)",borderRadius:10}}>
          <button className="btn btn-i btn-g" onClick={()=>navMonth(-1)}><I.ChevL/></button>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:15,fontWeight:700}}>{monthLabel}</div>
            <div style={{fontSize:11,color:"var(--c3)",marginTop:1}}>
              {isViewingOpen
                ?<span style={{color:"var(--inc)",fontWeight:600}}>Fatura atual{isClosed?" (fechada)":""}</span>
                :isViewingFuture
                  ?<span style={{color:"var(--biz)",fontWeight:600}}>Fatura futura</span>
                  :<span style={{color:"var(--c3)"}}>Fatura passada</span>
              }
              {activeDueDate&&<span style={{marginLeft:6}}>· Vence dia {activeDueDate.slice(8)}/{activeDueDate.slice(5,7)}</span>}
            </div>
          </div>
          <button className="btn btn-i btn-g" onClick={()=>navMonth(1)}><I.ChevR/></button>
        </div>

        {/* Banner status — só na fatura atual */}
        {isViewingOpen&&<div style={{padding:"10px 14px",borderRadius:10,marginBottom:14,background:isClosed?"rgba(232,173,26,.08)":"var(--incBg)",border:`1px solid ${isClosed?"var(--wrn)":"var(--inc)"}`,display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:isClosed?"var(--wrn)":"var(--inc)",flexShrink:0}}/>
          <div style={{flex:1}}>
            {isClosed
              ?<><span style={{fontSize:12,fontWeight:600,color:"var(--wrn)"}}>Fatura fechada — dia {card.closeDay}</span><span style={{fontSize:11,color:"var(--c2)",marginLeft:6}}>Novas compras entram na próxima fatura</span></>
              :<><span style={{fontSize:12,fontWeight:600,color:"var(--inc)"}}>Fatura aberta</span><span style={{fontSize:11,color:"var(--c2)",marginLeft:6}}>Fecha dia {card.closeDay} · Vence {activeDueDate}</span></>
            }
          </div>
        </div>}

        {/* Stats */}
        <div className="g3" style={{marginBottom:16}}>
          <div className="cd cd-s">
            <div className="st-l">{isViewingFuture?"Previsto":isViewingPast?"Total pago":"Fatura"}</div>
            <div className="st-v mono" style={{color:"var(--exp)"}}>{fmt(viewedTotal)}</div>
            <div className="st-sub">de {fmt(card.limit)} de limite</div>
          </div>
          <div className="cd cd-s">
            <div className="st-l">Disponível</div>
            <div className="st-v mono" style={{color:usageColor}}>{fmt(Math.max(0,card.limit-viewedTotal))}</div>
            <div className="st-sub">{usageP.toFixed(0)}% utilizado</div>
          </div>
          <div className="cd cd-s">
            <div className="st-l">Vencimento</div>
            <div className="st-v">Dia {card.dueDay}</div>
            <div className="st-sub">Fecha dia {card.closeDay}</div>
          </div>
        </div>

        {/* Barra utilização */}
        <div className="cd" style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
            <span style={{fontWeight:600}}>Utilização do limite</span>
            <span className="mono" style={{color:usageColor}}>{usageP.toFixed(1)}%</span>
          </div>
          <div className="prg" style={{height:8}}>
            <div className="prg-f" style={{width:`${Math.min(100,usageP)}%`,background:usageColor,transition:"width .6s"}}/>
          </div>
        </div>

        {/* Parcelas em andamento — só fatura atual */}
        {isViewingOpen&&activeInstallmentGroups.filter(g=>g.cardId===selCard).length>0&&<div className="cd" style={{marginBottom:16}}>
          <div style={{fontWeight:600,fontSize:13,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><I.Repeat style={{color:"var(--wrn)"}}/> Parcelas em Andamento</div>
          {activeInstallmentGroups.filter(g=>g.cardId===selCard).map(g=><div key={g.grpId} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--brd2)"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:500}}>{g.description}</div>
              <div style={{fontSize:11,color:"var(--c3)",marginTop:1}}>{g.paidCount}/{g.totalInstallments} pagas · Próxima: {g.nextDate}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="mono" style={{fontSize:13,fontWeight:600,color:"var(--exp)"}}>{fmt(g.amountPerInstallment)}<span style={{fontSize:10,color:"var(--c3)"}}>/mês</span></div>
              <div style={{fontSize:10,color:"var(--c3)"}}>{g.remaining} restante{g.remaining!==1?"s":""}</div>
            </div>
            <button className="btn btn-i btn-g btn-s btn-d" onClick={()=>setConfirmId("grp:"+g.grpId)}><I.Trash/></button>
          </div>)}
        </div>}

        {confirmId&&confirmId.startsWith("grp:")&&<div style={{marginBottom:12}}>
          <ConfirmRow label="Excluir todas as parcelas restantes?" onConfirm={()=>{dp({type:"DEL_CARD_PURCHASE_GROUP",payload:confirmId.slice(4)});setConfirmId(null)}} onCancel={()=>setConfirmId(null)}/>
        </div>}

        {/* Lista de gastos do mês visualizado */}
        <div className="cd">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div>
              <span style={{fontWeight:600,fontSize:13}}>Gastos — {monthLabel}</span>
              {!isViewingOpen&&<span style={{fontSize:11,color:"var(--c3)",marginLeft:8}}>{isViewingFuture?"futuro":"passado"}</span>}
            </div>
            {isViewingOpen&&<button className="btn btn-a btn-s" onClick={()=>setModal("addPurchase")}><I.Plus style={{width:12,height:12}}/> Adicionar Gasto</button>}
          </div>
          {viewedPurchases.length===0
            ?<div style={{textAlign:"center",padding:"20px 0",color:"var(--c3)",fontSize:12}}>
                Nenhum gasto {isViewingFuture?"previsto":"registrado"} nesta fatura.
                {isViewingFuture&&<div style={{marginTop:6,fontSize:11}}>Parcelas de compras parceladas aparecerão aqui quando chegarem.</div>}
              </div>
            :<div>{[...viewedPurchases].sort((a,b)=>b.date.localeCompare(a.date)).map(p=>{
              const isInst=p.totalInstallments>1;
              return confirmId===`p:${p.id}`
                ?<div key={p.id} style={{padding:"6px 0"}}><ConfirmRow label={`Excluir "${p.description}"?`} onConfirm={()=>{dp({type:"DEL_CARD_PURCHASE",payload:p.id});setConfirmId(null)}} onCancel={()=>setConfirmId(null)}/></div>
                :<div key={p.id} className="purchase-row">
                  <div style={{width:32,height:32,borderRadius:8,background:"var(--expBg)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--exp)"}}><I.CreditCard style={{width:14,height:14}}/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.description}{isInst?<span style={{fontSize:10,color:"var(--acc)",marginLeft:4,fontWeight:600}}>{p.installmentIndex+1}/{p.totalInstallments}</span>:""}</div>
                    <div style={{fontSize:11,color:"var(--c3)",marginTop:1}}>{p.category} · {p.date}</div>
                  </div>
                  <div className="mono" style={{color:"var(--exp)",fontWeight:600,fontSize:13,flexShrink:0}}>{fmt(p.amount)}</div>
                  <div className="tx-ac" style={{display:"flex",gap:2,flexShrink:0}}>
                    <button className="btn btn-i btn-g btn-s" title="Editar" onClick={()=>setModal({editPurchase:p})}><I.Edit/></button>
                    <button className="btn btn-i btn-g btn-s btn-d" title="Excluir" onClick={()=>setConfirmId(`p:${p.id}`)}><I.Trash/></button>
                  </div>
                </div>;
            })}</div>}
          {viewedPurchases.length>0&&<div style={{display:"flex",justifyContent:"flex-end",borderTop:"1px solid var(--brd2)",paddingTop:10,marginTop:6}}>
            <span style={{fontSize:13,fontWeight:700}}>Total: <span className="mono" style={{color:"var(--exp)"}}>{fmt(viewedTotal)}</span></span>
          </div>}
        </div>
      </>}

      {activeInstallmentGroups.length>0&&<div className="cd" style={{marginTop:16}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><I.AlertCircle style={{color:"var(--wrn)"}}/> Parcelas Finalizando em Breve</div>
        {activeInstallmentGroups.filter(g=>g.remaining<=2).length===0
          ?<div style={{fontSize:12,color:"var(--c3)"}}>Nenhuma parcela encerrando nos próximos meses.</div>
          :activeInstallmentGroups.filter(g=>g.remaining<=2).map(g=><div key={g.grpId} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:"var(--bg-2)",marginBottom:6}}>
            <div style={{width:8,height:8,borderRadius:50,background:g.cardColor,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:500}}>{g.description}</div>
              <div style={{fontSize:11,color:"var(--c3)"}}>{g.cardName} · {g.paidCount}/{g.totalInstallments} pagas</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="mono" style={{fontSize:12,fontWeight:600,color:g.remaining===1?"var(--inc)":"var(--wrn)"}}>{g.remaining===1?"Última parcela":"2 restantes"}</div>
              <div style={{fontSize:11,color:"var(--c3)"}}>{fmt(g.amountPerInstallment)}/mês</div>
            </div>
          </div>)}
      </div>}
    </>}

    {modal==="addCard"&&<Modal title="Novo Cartão" onClose={()=>setModal(null)} wide><CardForm onCancel={()=>setModal(null)} onSave={c=>{dp({type:"ADD_CARD",payload:c});handleSelectCard(c.id);setModal(null)}}/></Modal>}
    {modal?.editCard&&<Modal title="Editar Cartão" onClose={()=>setModal(null)} wide><CardForm initial={modal.editCard} onCancel={()=>setModal(null)} onSave={c=>{dp({type:"EDIT_CARD",payload:c});setModal(null)}}/></Modal>}
    {modal==="addPurchase"&&<Modal title="Novo Gasto no Cartão" onClose={()=>setModal(null)}><CardPurchaseForm cards={cards} cats={data.customCatsOut} onCancel={()=>setModal(null)} onSave={({base,totalInstallments:n})=>{dp({type:"ADD_CARD_PURCHASE",payload:{base:{...base,cardId:selCard},totalInstallments:n}});setModal(null)}}/></Modal>}
    {modal?.editPurchase&&<Modal title="Editar Gasto" onClose={()=>setModal(null)}><CardPurchaseForm initial={{...modal.editPurchase,totalInstallments:String(modal.editPurchase.totalInstallments||1)}} cards={cards} cats={data.customCatsOut} onCancel={()=>setModal(null)} onSave={({base})=>{dp({type:"EDIT_CARD_PURCHASE",payload:{...modal.editPurchase,...base,amount:base.amount,totalInstallments:modal.editPurchase.totalInstallments}});setModal(null)}}/></Modal>}
  </div>;
}


/* ══════════════════════════════════════════
   SIMULADOR DE COMPRA
   ══════════════════════════════════════════ */
function PurchaseSimulator({data,onClose}){
  const now=new Date(),curY=now.getFullYear(),curM=now.getMonth();

  // ── Form state ──────────────────────────────────────────
  const [amount,setAmount]=useState("");
  const [desc,setDesc]=useState("");
  const [installments,setInstallments]=useState("1");
  const [useCard,setUseCard]=useState(false);
  const [cardId,setCardId]=useState(data.cards?.[0]?.id||"");
  const [incomeEst,setIncomeEst]=useState(""); // override renda mensal

  const cards=data.cards||[];
  const n=Math.max(1,parseInt(installments)||1);
  const totalAmt=parseFloat(amount)||0;
  const instAmt=totalAmt/n;

  // ── Build baseline: renda e gastos fixos mensais ─────────
  // Últimos 3 meses de renda média
  const last3Inc=Array.from({length:3},(_,i)=>{
    const mo=curM-1-i,yr=curY+Math.floor(mo/12);
    const m2=((mo%12)+12)%12;
    const px=`${yr}-${pad(m2+1)}-`;
    return data.transactions.filter(t=>t.type==="income"&&t.date.startsWith(px)).reduce((s,t)=>s+t.amount,0);
  });
  const avgInc=last3Inc.filter(v=>v>0).reduce((s,v)=>s+v,0)/Math.max(last3Inc.filter(v=>v>0).length,1);

  // Gastos fixos: média dos últimos 3 meses de despesas (excluindo transações de cartão — essas entram pela fatura)
  const last3Exp=Array.from({length:3},(_,i)=>{
    const mo=curM-1-i,yr=curY+Math.floor(mo/12);
    const m2=((mo%12)+12)%12;
    const px=`${yr}-${pad(m2+1)}-`;
    return data.transactions.filter(t=>t.type==="expense"&&t.date.startsWith(px)).reduce((s,t)=>s+t.amount,0);
  });
  const avgExp=last3Exp.reduce((s,v)=>s+v,0)/3;

  // Faturas de cartão existentes, mês a mês (próximos 6 meses)
  const existingCardBills={}; // "YYYY-MM" → total
  if(data.cardPurchases&&cards.length>0){
    data.cardPurchases.forEach(p=>{
      const card=cards.find(c=>c.id===p.cardId);
      if(!card)return;
      const{dueDate}=getCardBillingInfo(card,p.date);
      const key=dueDate.slice(0,7);
      existingCardBills[key]=(existingCardBills[key]||0)+p.amount;
    });
  }

  // Renda efetiva: usa o override se preenchido
  const effectiveInc=parseFloat(incomeEst)||avgInc;

  // ── Projeta 6 meses ──────────────────────────────────────
  const MONTHS=6;
  const projection=Array.from({length:MONTHS},(_,i)=>{
    const rawM=curM+i;
    const projY=curY+Math.floor(rawM/12);
    const projM=rawM%12;
    const monthKey=`${projY}-${pad(projM+1)}`;
    const label=`${MO[projM]}/${String(projY).slice(2)}`;

    // Gastos base (excl. simulação)
    const baseExp=avgExp;
    // Faturas existentes de cartão neste mês
    const cardBill=existingCardBills[monthKey]||0;

    // Parcela da compra simulada neste mês
    let simParc=0;
    if(totalAmt>0&&i<n){
      if(useCard&&cardId){
        // Cai como fatura do cartão — determina em qual mês a fatura vence
        const card=cards.find(c=>c.id===cardId);
        if(card){
          const purchaseDate=dk(curY,curM,Math.min(now.getDate(),card.closeDay)); // assume compra hoje
          const{dueDate}=getCardBillingInfo(card,purchaseDate);
          const[dy,dm]=dueDate.split("-").map(Number);
          // parcela i cai em dm-1+i
          const parcM=dm-1+i;
          const parcMonthKey=`${dy+Math.floor(parcM/12)}-${pad(((parcM%12)+12)%12+1)}`;
          if(parcMonthKey===monthKey)simParc=instAmt;
        }
      } else {
        // débito direto / dinheiro — parcela i cai no mês i
        simParc=instAmt;
      }
    }

    const totalOut=baseExp+cardBill+simParc;
    const balance=effectiveInc-totalOut;
    const pct=effectiveInc>0?Math.min(100,(totalOut/effectiveInc)*100):100;

    // Impacto apenas da parcela simulada
    const simImpact=effectiveInc>0?(simParc/effectiveInc)*100:0;

    return{label,monthKey,projM,projY,baseExp,cardBill,simParc,totalOut,balance,pct,simImpact,isNegative:balance<0};
  });

  // ── Classificação de impacto ─────────────────────────────
  function getImpact(pct,isNegative){
    if(isNegative)return{level:"crítico",color:"#E05555",bg:"rgba(224,85,85,.12)",label:"Déficit"};
    if(pct>=90)  return{level:"alto",   color:"#E07A3A",bg:"rgba(224,122,58,.12)",label:"Alto risco"};
    if(pct>=75)  return{level:"médio",  color:"#E8AD1A",bg:"rgba(232,173,26,.12)",label:"Atenção"};
    if(pct>=55)  return{level:"baixo",  color:"#3DAF6A",bg:"rgba(61,175,106,.12)",label:"Saudável"};
    return        {level:"ótimo",       color:"#3DAF6A",bg:"rgba(61,175,106,.08)",label:"Ótimo"};
  }

  const worstMonth=projection.reduce((a,b)=>b.pct>a.pct?b:a,projection[0]);
  const totalSimCost=projection.reduce((s,m)=>s+m.simParc,0);
  const overallImpact=getImpact(worstMonth.pct,worstMonth.isNegative);

  // Card selecionado
  const selectedCard=cards.find(c=>c.id===cardId);

  return <div className="mo-ov" onClick={onClose}>
    <div className="sim-mo" onClick={e=>e.stopPropagation()}>
      {/* Header */}
      <div className="mo-h" style={{background:"linear-gradient(135deg,var(--acc),var(--acc2))",borderRadius:"14px 14px 0 0",border:"none",padding:"16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <I.TrendingUp style={{color:"#fff",width:18,height:18}}/>
          <span className="mo-t" style={{color:"#fff",fontSize:16}}>Simulador de Compra</span>
        </div>
        <button className="btn btn-i btn-g" style={{color:"rgba(255,255,255,.8)",border:"none"}} onClick={onClose}><I.X/></button>
      </div>

      <div style={{padding:"20px"}}>
        {/* Inputs da simulação */}
        <div style={{background:"var(--bg-2)",borderRadius:12,padding:"16px",marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:600,color:"var(--c2)",textTransform:"uppercase",letterSpacing:.5,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><I.Sliders style={{width:13,height:13}}/> Configurar Compra</div>
          <div className="fr" style={{marginBottom:10}}>
            <div className="fg" style={{marginBottom:0}}>
              <label className="fl">Valor Total (R$)</label>
              <input className="fi mono" type="number" step="0.01" placeholder="0,00" value={amount} onChange={e=>setAmount(e.target.value)} style={{fontSize:16,fontWeight:600}}/>
            </div>
            <div className="fg" style={{marginBottom:0}}>
              <label className="fl">Parcelas</label>
              <select className="fs" value={installments} onChange={e=>setInstallments(e.target.value)}>
                {[1,2,3,4,5,6,7,8,9,10,11,12,18,24].map(x=><option key={x} value={x}>{x===1?"À vista":`${x}x de ${totalAmt?fmt(totalAmt/x):"—"}`}</option>)}
              </select>
            </div>
          </div>
          <div className="fg" style={{marginBottom:10}}>
            <label className="fl">Descrição (opcional)</label>
            <input className="fi" placeholder="ex: iPhone 16, Geladeira nova..." value={desc} onChange={e=>setDesc(e.target.value)}/>
          </div>

          {/* Toggle cartão */}
          {cards.length>0&&<div style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"var(--bg-1)",borderRadius:8,cursor:"pointer",marginBottom:useCard?8:0}} onClick={()=>setUseCard(p=>!p)}>
              <div style={{width:16,height:16,borderRadius:4,border:"2px solid "+(useCard?"var(--acc)":"var(--brd)"),background:useCard?"var(--acc)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {useCard&&<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <I.CreditCard style={{color:"var(--c2)",width:13,height:13}}/>
              <span style={{fontSize:12,fontWeight:500}}>Comprar no cartão de crédito</span>
            </div>
            {useCard&&<div style={{display:"flex",gap:6,flexWrap:"wrap",paddingLeft:4}}>
              {cards.map(c=><div key={c.id} onClick={()=>setCardId(c.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:7,border:`2px solid ${cardId===c.id?c.color:"var(--brd)"}`,cursor:"pointer",background:cardId===c.id?c.color+"22":"var(--bg-1)",transition:"all .12s"}}>
                <div style={{width:8,height:8,borderRadius:2,background:c.color}}/>
                <span style={{fontSize:11,fontWeight:600}}>{c.name}</span>
                <span className="mono" style={{fontSize:10,color:"var(--c3)"}}>••{c.lastDigits}</span>
              </div>)}
            </div>}
          </div>}

          {/* Renda override */}
          <div className="fg" style={{marginBottom:0}}>
            <label className="fl">Renda Mensal Estimada (deixe em branco para usar a média de {fmt(avgInc)})</label>
            <input className="fi mono" type="number" placeholder={avgInc.toFixed(0)} value={incomeEst} onChange={e=>setIncomeEst(e.target.value)}/>
          </div>
        </div>

        {/* Resultado só aparece se tem valor */}
        {totalAmt>0?<>
          {/* Badge de impacto geral */}
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,background:overallImpact.bg,border:`1.5px solid ${overallImpact.color}`,marginBottom:20}}>
            <div className="sim-dot" style={{background:overallImpact.color,width:14,height:14,animation:overallImpact.level==="crítico"?"pulse-dot 1s infinite":""}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:overallImpact.color}}>{overallImpact.label} — {desc||"Compra simulada"}</div>
              <div style={{fontSize:12,color:"var(--c2)",marginTop:2}}>
                {n>1?`${n}x de ${fmt(instAmt)} `:`Pagamento único de `}{fmt(totalAmt)} total
                {useCard&&selectedCard?` · Cartão ${selectedCard.name}`:" · Débito/dinheiro"}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="mono" style={{fontSize:20,fontWeight:700,color:overallImpact.color}}>{fmt(totalSimCost)}</div>
              <div style={{fontSize:11,color:"var(--c3)"}}>impacto total</div>
            </div>
          </div>

          {/* Cabeçalho da tabela — hidden on mobile via CSS */}
          <div className="sim-tbl-hd" style={{fontSize:11,fontWeight:600,color:"var(--c3)",textTransform:"uppercase",letterSpacing:.5,marginBottom:6,padding:"0 12px",display:"grid",gridTemplateColumns:"110px 1fr 90px 90px 90px",gap:8}}>
            <span>Mês</span><span>Uso do orçamento</span><span style={{textAlign:"right"}}>Parcela</span><span style={{textAlign:"right"}}>Saída</span><span style={{textAlign:"right"}}>Saldo</span>
          </div>

          {/* Linhas de projeção */}
          {projection.map((mo,i)=>{
            const imp=getImpact(mo.pct,mo.isNegative);
            const isSimMonth=mo.simParc>0;
            return <div key={i} className="impact-row" style={{background:isSimMonth?imp.bg:"var(--bg-2)",border:isSimMonth?`1px solid ${imp.color}44`:"1px solid transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div className="sim-dot" style={{background:isSimMonth?imp.color:"var(--brd)",opacity:isSimMonth?1:.4}}/>
                <span style={{fontWeight:isSimMonth?600:400,color:isSimMonth?imp.color:"var(--c2)"}}>{mo.label}</span>
              </div>
              <div style={{gridColumn:"span 1"}}>
                <div className="impact-bar-wrap">
                  <div className="impact-bar" style={{position:"absolute",left:0,top:0,width:`${Math.min(100,(mo.baseExp+mo.cardBill)/effectiveInc*100)}%`,background:"var(--c3)",opacity:.35}}/>
                  {isSimMonth&&<div className="impact-bar" style={{position:"absolute",left:0,top:0,width:`${Math.min(100,mo.pct)}%`,background:imp.color,opacity:.7}}/>}
                  <div style={{position:"absolute",left:"100%",top:-2,width:2,height:10,background:"var(--exp)",opacity:.5,transform:"translateX(-1px)"}}/>
                </div>
                <div style={{fontSize:10,color:"var(--c3)",marginTop:2,display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span>{mo.pct.toFixed(0)}% da renda</span>
                  <span className="sim-val-mobile" style={{display:"none"}}>
                    {isSimMonth&&<span style={{color:imp.color,fontWeight:600}}>{fmt(mo.simParc)} · </span>}
                    <span style={{color:mo.isNegative?"var(--exp)":"var(--inc)",fontWeight:700}}>{mo.isNegative?"-":""}{fmt(Math.abs(mo.balance))}</span>
                  </span>
                </div>
              </div>
              <span className="mono sim-col-hide" style={{textAlign:"right",fontSize:12,fontWeight:600,color:isSimMonth?imp.color:"var(--c3)"}}>
                {isSimMonth?fmt(mo.simParc):"—"}
              </span>
              <span className="mono sim-col-hide" style={{textAlign:"right",fontSize:12,color:"var(--exp)"}}>{fmt(mo.totalOut)}</span>
              <span className="mono sim-col-hide" style={{textAlign:"right",fontSize:12,fontWeight:700,color:mo.isNegative?"var(--exp)":"var(--inc)"}}>
                {mo.isNegative?"-":""}{fmt(Math.abs(mo.balance))}
              </span>
            </div>;
          })}

          {/* Legenda de cores */}
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:14,paddingTop:12,borderTop:"1px solid var(--brd2)"}}>
            {[
              {color:"#3DAF6A",label:"Ótimo (<55%)"},
              {color:"#3DAF6A",label:"Saudável (55–74%)"},
              {color:"#E8AD1A",label:"Atenção (75–89%)"},
              {color:"#E07A3A",label:"Alto risco (90–99%)"},
              {color:"#E05555",label:"Déficit (>100%)"},
            ].map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"var(--c3)"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:l.color,flexShrink:0}}/>
              {l.label}
            </div>)}
          </div>

          {/* Resumo textual */}
          <div style={{marginTop:16,padding:"12px 14px",background:"var(--bg-2)",borderRadius:10,fontSize:12,lineHeight:1.6,color:"var(--c2)"}}>
            {worstMonth.isNegative
              ?<><strong style={{color:"var(--exp)"}}>⚠ Atenção:</strong> em <strong>{worstMonth.label}</strong>, seu saldo ficaria <strong style={{color:"var(--exp)"}}>{fmt(Math.abs(worstMonth.balance))} negativo</strong>. Considere parcelar em mais vezes ou aguardar um mês com menos compromissos.</>
              :worstMonth.pct>=90
              ?<><strong style={{color:"var(--wrn)"}}>Risco alto</strong> em <strong>{worstMonth.label}</strong>: {worstMonth.pct.toFixed(0)}% da renda comprometida. Pouca margem para imprevistos.</>
              :worstMonth.pct>=75
              ?<><strong style={{color:"var(--wrn)"}}>Atenção</strong>: no pior mês (<strong>{worstMonth.label}</strong>) você usaria {worstMonth.pct.toFixed(0)}% da renda. Fique de olho nos gastos variáveis.</>
              :<><strong style={{color:"var(--inc)"}}>Compra viável.</strong> O maior impacto será em <strong>{worstMonth.label}</strong> ({worstMonth.pct.toFixed(0)}% da renda). Seu saldo permanece positivo em todos os meses.</>
            }
          </div>
        </>:<div style={{textAlign:"center",padding:"32px 20px",color:"var(--c3)"}}>
          <I.TrendingUp style={{width:40,height:40,margin:"0 auto 12px",opacity:.2}}/>
          <div style={{fontSize:14,fontWeight:500}}>Digite um valor para simular</div>
          <div style={{fontSize:12,marginTop:6}}>A simulação usa sua renda e gastos médios dos últimos 3 meses como base.</div>
        </div>}
      </div>
    </div>
  </div>;
}

/* ─── PERSISTÊNCIA localStorage ─────────────────────────────────────────────
   useLs: lê do localStorage na 1ª renderização, salva a cada mudança.
   usePersistentReducer: igual ao useReducer, mas hidrata e persiste o estado.
─────────────────────────────────────────────────────────────────────────── */
function useLs(key,def){
  const[v,sv]=useState(()=>{
    try{const s=localStorage.getItem(key);return s!=null?JSON.parse(s):def;}
    catch{return def;}
  });
  const set=(val)=>{
    try{localStorage.setItem(key,JSON.stringify(val));}catch{}
    sv(val);
  };
  return[v,set];
}

export default function App(){
  const [theme,setTheme]=useLs("fp_theme","dark");
  const [mode,setMode]=useLs("fp_mode","personal");
  const [pTab,setPTab]=useLs("fp_ptab","dashboard");
  const [bTab,setBTab]=useLs("fp_btab","clients");
  const [showReset,setShowReset]=useState(false),[showSim,setShowSim]=useState(false),[drawerOpen,setDrawerOpen]=useState(false);
  const now=new Date();const [year,setYear]=useState(now.getFullYear()),[month,setMonth]=useState(now.getMonth());
  const [data,dp]=useReducer(reducer,null,()=>{
    try{const s=localStorage.getItem("fp_data");if(s)return JSON.parse(s);}catch{}
    return genData();
  });
  useEffect(()=>{try{localStorage.setItem("fp_data",JSON.stringify(data));}catch{}},[data]);
  const hdrRef=useRef();
  useEffect(()=>{const u=()=>{if(hdrRef.current)document.documentElement.style.setProperty('--hdr-h',hdrRef.current.offsetHeight+'px')};u();window.addEventListener('resize',u);return()=>window.removeEventListener('resize',u)},[]);
  const rs=Object.entries(themes[theme]).reduce((a,[k,v])=>({...a,[k]:v}),{});

  const personalTabs=[{id:"dashboard",l:"Dashboard",ic:<I.Zap style={{width:15,height:15}}/>},{id:"calendar",l:"Calendário",ic:<I.Cal style={{width:15,height:15}}/>},{id:"cards",l:"Cartões",ic:<I.CreditCard style={{width:15,height:15}}/>},{id:"performance",l:"Performance",ic:<I.TrendingUp style={{width:15,height:15}}/>},{id:"tags",l:"Tags",ic:<I.Tag style={{width:15,height:15}}/>}];
  const bizTabs=[{id:"bizDash",l:"Dashboard",ic:<I.Zap style={{width:15,height:15}}/>},{id:"clients",l:"Empresas",ic:<I.Briefcase style={{width:15,height:15}}/>},{id:"agenda",l:"Agenda",ic:<I.Cal style={{width:15,height:15}}/>},{id:"board",l:"Board",ic:<I.Grid style={{width:15,height:15}}/>}];
  const curTabs=mode==="personal"?personalTabs:bizTabs;
  const curTab=mode==="personal"?pTab:bTab;

  const navigate=(id)=>{
    mode==="personal"?setPTab(id):setBTab(id);
    setDrawerOpen(false);
  };

  return <div className="app" style={rs}><style>{CSS}</style>
    <header className="hdr" ref={hdrRef} style={{position:"relative"}}>
      <div className="hdr-brand"><span className="hdr-dot"/>Fluxo<span style={{fontWeight:400,color:"var(--c3)",fontSize:12}}>financeiro</span></div>
      <div className="hdr-acts">
        <div className="msw">
          <button className={`msw-b ${mode==="personal"?"on":""}`} onClick={()=>{setMode("personal");setDrawerOpen(false)}}><I.User style={{width:12,height:12}}/> Pessoal</button>
          <button className={`msw-b ${mode==="business"?"onb":""}`} onClick={()=>{setMode("business");setDrawerOpen(false)}}><I.Briefcase style={{width:12,height:12}}/> Empresarial</button>
        </div>
        {/* Desktop tabs — hidden on mobile via CSS */}
        <nav className="tabs nav-tabs">{curTabs.map(t=><button key={t.id} className={`tab ${curTab===t.id?"on":""}`} onClick={()=>navigate(t.id)}>{t.l}</button>)}</nav>
        <button className="btn btn-i btn-g" onClick={()=>setTheme(theme==="dark"?"light":"dark")}>{theme==="dark"?<I.Sun/>:<I.Moon/>}</button>
        <button className="btn btn-s" style={{color:"var(--exp)",borderColor:"var(--exp)",background:"var(--expBg)",flexShrink:0}} onClick={()=>setShowReset(true)}><I.Trash style={{width:12,height:12}}/><span className="hdr-txt"> Limpar</span></button>
        {/* Hamburger — only visible on mobile via CSS */}
        <button className="btn btn-i btn-g hdr-menu-btn" style={{display:"none",flexShrink:0}} onClick={()=>setDrawerOpen(p=>!p)}>
          {drawerOpen?<I.X/>:<I.Menu/>}
        </button>
      </div>
    </header>

    {/* Mobile nav drawer */}
    {drawerOpen&&<>
      <div className="nav-drawer-backdrop" onClick={()=>setDrawerOpen(false)}/>
      <nav className="nav-drawer">
        {curTabs.map((t,i)=><button key={t.id} className={`nav-drawer-item${curTab===t.id?(mode==="personal"?" active":" active-biz"):""}`} onClick={()=>navigate(t.id)}>
          {t.ic}
          {t.l}
        </button>)}
        <div className="nav-drawer-sep"/>
        <button className="nav-drawer-item" style={{color:"var(--c3)",fontSize:12}} onClick={()=>{setShowSim(true);setDrawerOpen(false)}}>
          <I.TrendingUp style={{width:15,height:15}}/>
          Simular Compra
        </button>
      </nav>
    </>}

    {showReset&&<Modal title="Limpar Todos os Dados" onClose={()=>setShowReset(false)}>
      <div style={{textAlign:"center",padding:"10px 0"}}>
        <div style={{width:56,height:56,borderRadius:16,background:"var(--expBg)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:"var(--exp)"}}><I.Trash style={{width:24,height:24}}/></div>
        <div style={{fontSize:16,fontWeight:600,marginBottom:8}}>Tem certeza?</div>
        <div style={{fontSize:13,color:"var(--c2)",marginBottom:20,lineHeight:1.5}}>Isso vai apagar todas as transações, empresas, investimentos, parcelamentos e tags. As categorias padrão serão mantidas. Essa ação não pode ser desfeita.</div>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
          <button className="btn" onClick={()=>setShowReset(false)} style={{minWidth:100}}>Cancelar</button>
          <button className="btn btn-d" style={{minWidth:100,background:"var(--expBg)",borderColor:"var(--exp)"}} onClick={()=>{dp({type:"RESET"});setShowReset(false)}}>Apagar Tudo</button>
        </div>
      </div>
    </Modal>}
    <main className="ctr">
      {mode==="personal"&&pTab==="dashboard"&&<PFDash data={data} dp={dp} year={year} month={month} setMonth={setMonth} setYear={setYear}/>}
      {mode==="personal"&&pTab==="calendar"&&<PFCalendar data={data} dp={dp} year={year} month={month} setMonth={setMonth} setYear={setYear}/>}
      {mode==="personal"&&pTab==="cards"&&<PFCards data={data} dp={dp}/>}
      {mode==="personal"&&pTab==="performance"&&<PFPerf data={data}/>}
      {mode==="personal"&&pTab==="tags"&&<PFTags data={data} dp={dp}/>}
      {mode==="business"&&bTab==="bizDash"&&<BizDashboard data={data}/>}
      {mode==="business"&&bTab==="clients"&&<BizClients data={data} dp={dp}/>}
      {mode==="business"&&bTab==="agenda"&&<BizAgenda data={data}/>}
      {mode==="business"&&bTab==="board"&&<BizBoard data={data} dp={dp}/>}
    </main>
    <button className="sim-fab" onClick={()=>setShowSim(true)}>
      <I.TrendingUp style={{width:15,height:15}}/>
      Simular Compra
    </button>
    {showSim&&<PurchaseSimulator data={data} onClose={()=>setShowSim(false)}/>}
  </div>;
}
