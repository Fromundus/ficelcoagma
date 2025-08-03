import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Card from './ui/Card';
import CountUp from 'react-countup';
import AdminPage from './ui/AdminPage';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Button from './ui/Button';
import type { RegisteredMember } from '../types/RegisteredMember';
import { useNavigate } from 'react-router-dom';
import TableDisplay from './ui/TableListDisplay';
import SettingsComponent from './SettingsComponent';

type ChartDataPoint = {
  date?: string;   // for daily
  month?: string;  // for monthly
  count: number;
};

type MemberStatsData = {
  total_members: number;
  registered_members: number;
  unregistered_members: number;
  recent_registrations: RegisteredMember[];
  daily_registrations: ChartDataPoint[];
  monthly_registrations: ChartDataPoint[];
};

const MemberStatistics: React.FC = () => {
  const [chartType, setChartType] = useState<'daily' | 'monthly'>('daily');
  const [stats, setStats] = useState<MemberStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('dashboard/stats');
        console.log(response);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if(loading){
    return (
      <AdminPage className='flex items-center justify-center min-h-[80vh]'>
        <span>Loading...</span>
      </AdminPage>
    );
  }

  if (!stats) return <div>Failed to load stats.</div>;

  return (
      <div className='w-full flex flex-col gap-4'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border flex flex-col gap-4 shadow-lg">
                  <p className="text-sm text-graphite">Total Members</p>
                  <h3 className="text-4xl font-semibold">
                    <CountUp end={stats.total_members} duration={1} />
                  </h3>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border flex flex-col gap-4 shadow-lg">
                  <p className="text-sm text-graphite">Registered Members</p>
                  <h3 className="text-4xl font-semibold">
                    <CountUp end={stats.registered_members} duration={1} />
                  </h3>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border flex flex-col gap-4 shadow-lg">
                  <p className="text-sm text-graphite">Unregistered Members</p>
                  <h3 className="text-4xl font-semibold">
                    <CountUp end={stats.unregistered_members} duration={1} />
                  </h3>
              </div>
          </div>

          <SettingsComponent />
          
          <Card childrenClassName='p-6'>
            <div className='flex items-center justify-between mb-8'>
              <span className='font-semibold'>Registration Trend</span>
              <div className="flex">
                <Button className={`rounded-l-lg text-xs px-4 rounded-none border-r-0 ${chartType === "daily" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={() => setChartType('daily')}>
                  Daily
                </Button>
                <Button className={`rounded-r-lg text-xs px-4 rounded-none border-l-0 ${chartType === "monthly" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={() => setChartType('monthly')}>
                  Monthly
                </Button>
              </div>
            </div>

            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartType === 'daily' ? stats.daily_registrations : stats.monthly_registrations}
                  margin={{ right: 30, bottom: 10 }}
                >
                  <CartesianGrid stroke="#dddddd" strokeDasharray="5 5" />
                  <XAxis dataKey={chartType === 'daily' ? 'date' : 'month'} tickMargin={20} fontSize={12} />
                  <YAxis fontSize={12} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="black" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title='Recent Registrations' childrenClassName='p-6'>
            <div className='flex flex-col gap-4 items-center w-full'>
              {stats.recent_registrations.length > 0 ? <TableDisplay list={stats.recent_registrations} /> : <span>No recent registrations.</span>}

              <Button className='bg-primary text-white' onClick={() => navigate('/admin/registered-members')}>
                See All
              </Button>
            </div>

          </Card>
      </div>


  );
};

export default MemberStatistics;
