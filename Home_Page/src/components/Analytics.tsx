import { SectionLabel } from './ui/SectionLabel';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const vitalData = [
  { month: 'Jan', heartRate: 72, bloodPressure: 118, oxygen: 98 },
  { month: 'Feb', heartRate: 75, bloodPressure: 115, oxygen: 97 },
  { month: 'Mar', heartRate: 70, bloodPressure: 120, oxygen: 99 },
  { month: 'Apr', heartRate: 78, bloodPressure: 112, oxygen: 96 },
  { month: 'May', heartRate: 74, bloodPressure: 117, oxygen: 98 },
  { month: 'Jun', heartRate: 71, bloodPressure: 119, oxygen: 99 },
];

const activityData = [
  { name: 'Active', value: 4200 },
  { name: 'Rest', value: 2100 },
  { name: 'Sleep', value: 22.4 },
];
const COLORS = ['#C2410C', '#C9A87C', '#A0845A'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E1E1E] border border-[rgba(201,168,124,0.2)] rounded-xl p-3 shadow-card z-50">
        <p className="text-sand text-xs mb-2 font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Analytics() {
  return (
    <section className="py-24 bg-coffee-black relative z-10 overflow-hidden border-t border-sand/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-block">
          <SectionLabel>Analytics</SectionLabel>
          <h2 className="text-h3 md:text-h2 text-ivory mt-2 font-display">Monthly Health Graphs</h2>
          <p className="text-sand/80 mt-4 max-w-xl mx-auto">Track your vital anomalies and activity streaks visually with smart integrations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Main Vital Line Chart */}
          <div data-graph-left className="bg-graphite-dark rounded-card border border-sand/10 shadow-card p-6 md:p-8 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 20%, #1E1E1E, #120903)' }}>
            <h3 className="text-xl font-bold text-ivory mb-8 font-display">Vital Trends</h3>
            <div className="h-48 md:h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,124,0.1)" vertical={false} />
                  <XAxis dataKey="month" stroke="#C9A87C" tick={{ fontSize: 12, fill: '#C9A87C', opacity: 0.8 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="#C9A87C" tick={{ fontSize: 12, fill: '#C9A87C', opacity: 0.8 }} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" name="Heart Rate" dataKey="heartRate" stroke="#C2410C" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#C2410C', stroke: '#120903', strokeWidth: 2 }} />
                  <Line type="monotone" name="Blood Pressure" dataKey="bloodPressure" stroke="#C9A87C" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" name="Oxygen" dataKey="oxygen" stroke="rgba(250,243,224,0.3)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center border-t border-sand/10 pt-6">
              <div className="text-center">
                <div className="text-[10px] text-sand/60 font-semibold mb-1 uppercase tracking-wider">Avg Heart</div>
                <div className="text-xl font-mono text-orange-burnt font-bold">72 bpm</div>
              </div>
              <div className="w-px h-8 bg-sand/10"></div>
              <div className="text-center">
                <div className="text-[10px] text-sand/60 font-semibold mb-1 uppercase tracking-wider">Avg Blood</div>
                <div className="text-xl font-mono text-sand font-bold">116 sys</div>
              </div>
              <div className="w-px h-8 bg-sand/10"></div>
              <div className="text-center">
                <div className="text-[10px] text-sand/60 font-semibold mb-1 uppercase tracking-wider">Avg Oxygen</div>
                <div className="text-xl font-mono text-ivory/60 font-bold">98%</div>
              </div>
            </div>
          </div>

          {/* Activity Donut Chart */}
          <div data-graph-right className="bg-graphite-dark rounded-card border border-sand/10 shadow-card p-6 md:p-8 relative overflow-hidden flex flex-col" style={{ background: 'radial-gradient(ellipse at 70% 20%, #1E1E1E, #120903)' }}>
            <h3 className="text-xl font-bold text-ivory mb-2 font-display">Activity Pulse</h3>
            
            <div className="h-48 md:h-64 relative flex items-center justify-center mb-6 mt-4 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="95%"
                    dataKey="value"
                    stroke="none"
                    paddingAngle={3}
                    cornerRadius={4}
                  >
                    {activityData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-3xl font-mono font-bold text-orange-burnt">4.2k</div>
                <div className="text-[10px] text-sand/60 uppercase tracking-widest font-semibold mt-1">Steps</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-sand/10 pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[0] }} />
                <span className="text-xs font-semibold text-sand">2.1h <span className="text-sand/50 font-normal ml-0.5">Active</span></span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[1] }} />
                <span className="text-xs font-semibold text-sand">6.2h <span className="text-sand/50 font-normal ml-0.5">Rest</span></span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[2] }} />
                <span className="text-xs font-semibold text-sand">7.4h <span className="text-sand/50 font-normal ml-0.5">Sleep</span></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
