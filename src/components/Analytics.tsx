import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const dataItems = [
  { name: 'Mon', value: 65, active: 40 },
  { name: 'Tue', value: 72, active: 45 },
  { name: 'Wed', value: 68, active: 55 },
  { name: 'Thu', value: 85, active: 60 },
  { name: 'Fri', value: 92, active: 75 },
  { name: 'Sat', value: 88, active: 85 },
  { name: 'Sun', value: 95, active: 90 },
];

const pieData = [
  { name: 'Consultations', value: 400 },
  { name: 'Lab Tests', value: 300 },
  { name: 'Medicines', value: 300 },
  { name: 'Follow-ups', value: 200 },
];

const PIE_COLORS = ['#C2410C', '#C9A87C', '#A0845A', '#EDE3D0'];

export function Analytics() {
  return (
    <section className="bg-coffee-black py-24 border-t border-sand/5" data-analytics>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-h2 text-ivory">Comprehensive Health Insights</h2>
          <p className="font-body text-body-lg text-sand mt-4 max-w-2xl mx-auto">
            Track your vitals, visualize consultation history, and stay on top of your health metrics with powerful analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Chart - Activity */}
          <div
            data-graph-left
            className="bg-graphite rounded-card border border-sand/10 shadow-card p-7"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, #1E1E1E, #120903)'
            }}
          >
            <h3 className="font-display text-h3 text-ivory mb-6">Patient Activity</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataItems} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" vertical={false} />
                  <XAxis dataKey="name" stroke="#A0845A" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A0845A" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A0D06', borderColor: '#C9A87C', borderRadius: '8px', color: '#FAF3E0' }}
                    itemStyle={{ color: '#C2410C' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#C2410C" strokeWidth={3} dot={{ r: 4, fill: '#1A0D06', stroke: '#C2410C', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="active" stroke="#C9A87C" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Chart - Services Breakdown */}
          <div
            data-graph-right
            className="bg-graphite rounded-card border border-sand/10 shadow-card p-7"
            style={{
              background: 'radial-gradient(ellipse at 70% 80%, #1E1E1E, #120903)'
            }}
          >
            <h3 className="font-display text-h3 text-ivory mb-6">Services Usage</h3>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A0D06', borderColor: '#C9A87C', borderRadius: '8px', color: '#FAF3E0' }} 
                    itemStyle={{ color: '#FAF3E0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                  <span className="text-body text-ivory-dim text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
