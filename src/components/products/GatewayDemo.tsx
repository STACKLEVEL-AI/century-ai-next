"use client";

import { useState } from "react";
import { Activity, ArrowDownToLine, ChartNoAxesCombined, Check, ShieldCheck } from "lucide-react";

type Period = "7d" | "30d" | "90d";
type View = "overview" | "usage" | "controls";
const periods: Record<Period, { label: string; spend: number; requests: number; series: number[]; shares: number[] }> = {
  "7d": { label: "7 days", spend: 326.4, requests: 18420, series: [18, 57, 103, 145, 212, 275, 326.4], shares: [28, 47, 25] },
  "30d": { label: "30 days", spend: 1428.2, requests: 82460, series: [70, 152, 255, 368, 514, 651, 835, 1009, 1198, 1428.2], shares: [22, 51, 27] },
  "90d": { label: "90 days", spend: 4250.8, requests: 246380, series: [230, 580, 920, 1290, 1740, 2180, 2695, 3200, 3730, 4250.8], shares: [25, 46, 29] },
};
const teams = ["Operations", "Customer support", "Internal services"];
const formatMoney = (value: number) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(value);
const formatNumber = (value: number) => new Intl.NumberFormat("en-GB").format(value);

function sampleRows(period: Period) {
  const data = periods[period];
  const firstRequests = Math.round(data.requests * data.shares[0] / 100);
  const secondRequests = Math.round(data.requests * data.shares[1] / 100);
  const firstSpend = Math.round(data.spend * data.shares[0]) / 100;
  const secondSpend = Math.round(data.spend * data.shares[1]) / 100;
  return teams.map((team, index) => ({
    team,
    requests: index === 0 ? firstRequests : index === 1 ? secondRequests : data.requests - firstRequests - secondRequests,
    spend: index === 0 ? firstSpend : index === 1 ? secondSpend : Math.round((data.spend - firstSpend - secondSpend) * 100) / 100,
    share: data.shares[index],
  }));
}

function csvFor(period: Period) {
  return ["sample_data,period,team,requests,estimated_cost_eur", ...sampleRows(period).map(row => `true,${period},${row.team},${row.requests},${row.spend.toFixed(2)}`)].join("\r\n");
}

function UsageTable({ period }: { period: Period }) {
  return <div className="gateway-table-wrap"><table className="gateway-table"><caption>Illustrative usage by team — {periods[period].label}</caption><thead><tr><th scope="col">Team</th><th scope="col">Requests</th><th scope="col">Sample cost</th></tr></thead><tbody>{sampleRows(period).map(row => <tr key={row.team}><th scope="row">{row.team}</th><td>{formatNumber(row.requests)}</td><td>{formatMoney(row.spend)}</td></tr>)}</tbody><tfoot><tr><th scope="row">Total</th><td>{formatNumber(periods[period].requests)}</td><td>{formatMoney(periods[period].spend)}</td></tr></tfoot></table></div>;
}

export default function GatewayDemo() {
  const [period, setPeriod] = useState<Period>("30d");
  const [view, setView] = useState<View>("overview");
  const data = periods[period];
  const points = data.series.map((value, index) => `${35 + index * 605 / (data.series.length - 1)},${186 - value / data.spend * 145}`).join(" ");
  const area = `35,186 ${points} 640,186`;
  const views = [{ id: "overview" as const, label: "Overview", Icon: ChartNoAxesCombined }, { id: "usage" as const, label: "Team usage", Icon: Activity }, { id: "controls" as const, label: "Control examples", Icon: ShieldCheck }];

  return <div className="gateway-demo">
    <div className="gateway-demo-top"><div><span className="brand-mark" /><strong>Century Gateway</strong></div><span className="gateway-demo-badge">Interactive example · sample data</span></div>
    <div className="gateway-demo-layout">
      <nav className="gateway-sidebar" aria-label="Gateway demonstration views"><p>Workspace</p>{views.map(({ id, label, Icon }) => <button type="button" key={id} aria-pressed={view === id} onClick={() => setView(id)}><Icon size={17} aria-hidden="true" />{label}</button>)}<div className="gateway-sidebar-note"><ShieldCheck size={17} aria-hidden="true" /><span>Explore the controls.<br />No live account connected.</span></div></nav>
      <div className="gateway-main">
        <div className="gateway-toolbar"><div><p className="prod-kicker">Illustrative workspace</p><h3>{views.find(item => item.id === view)?.label}</h3></div><div className="gateway-actions"><div className="gateway-periods" role="group" aria-label="Sample reporting period">{(Object.keys(periods) as Period[]).map(key => <button type="button" aria-pressed={period === key} key={key} onClick={() => setPeriod(key)}>{key}</button>)}</div><a className="gateway-export" href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvFor(period))}`} download={`century-sample-usage-${period}.csv`}><ArrowDownToLine size={15} aria-hidden="true" /><span>Export CSV</span></a></div></div>
        <p className="gateway-live-status" aria-live="polite">Showing illustrative data for {data.label}. Values are examples, not customer results or pricing.</p>
        {view === "overview" && <>
          <div className="gateway-metrics"><div><span>Sample cost</span><strong>{formatMoney(data.spend)}</strong></div><div><span>Requests</span><strong>{formatNumber(data.requests)}</strong></div><div><span>Teams in this example</span><strong>3</strong></div></div>
          <div className="gateway-chart-panel"><div className="gateway-panel-title"><h4>Cumulative sample cost</h4><span><i />{data.label}</span></div><svg className="gateway-chart" viewBox="0 0 680 220" role="img" aria-label={`Illustrative cumulative cost rises to ${formatMoney(data.spend)} over ${data.label}.`}>{[41, 89, 137, 186].map(y => <line key={y} x1="35" x2="640" y1={y} y2={y} stroke="#e4e3ef" strokeDasharray="4 5" />)}<polygon points={area} fill="#210dff" opacity=".06" /><polyline points={points} fill="none" stroke="#210dff" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" /><circle cx="640" cy="41" r="4" fill="#210dff" /><text x="35" y="211">Period start</text><text x="640" y="211" textAnchor="end">Period end</text></svg></div>
          <div className="gateway-breakdown"><h4>Share of sample cost</h4>{sampleRows(period).map(row => <div className="gateway-breakdown-row" key={row.team}><span>{row.team}</span><div><i style={{ width: `${row.share}%` }} /></div><strong>{row.share}%</strong></div>)}</div>
        </>}
        {view === "usage" && <UsageTable period={period} />}
        {view === "controls" && <div className="gateway-control-examples"><h4>Questions to resolve before rollout</h4>{[{ title: "Model access", text: "Which teams may use which models, and for what work?" }, { title: "Usage budgets", text: "Who reviews usage and approves changes to an agreed budget?" }, { title: "Sensitive information", text: "Which data may leave your environment, and under what conditions?" }, { title: "Operational ownership", text: "Who reviews activity, investigates exceptions and changes the rules?" }].map(item => <div key={item.title}><Check size={17} aria-hidden="true" /><div><h5>{item.title}</h5><p>{item.text}</p></div></div>)}</div>}
        <noscript><div className="gateway-fallback"><UsageTable period="30d" /><p>The default view shows a 30-day sample. The CSV link downloads that same illustrative dataset.</p></div></noscript>
      </div>
    </div>
  </div>;
}
