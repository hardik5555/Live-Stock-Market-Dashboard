import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, Activity } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const generateData = () => {
  const basePrice = 150;
  const data = [];
  for (let i = 0; i < 20; i++) {
    const variance = Math.random() * 10 - 5;
    data.push({
      time: `${i}:00`,
      price: +(basePrice + variance).toFixed(2),
      volume: Math.floor(Math.random() * 10000),
    });
  }
  return data;
};

const StockDashboard = () => {
  const [stockData] = useState(generateData());
  
  const currentPrice = stockData[stockData.length - 1].price;
  const previousPrice = stockData[stockData.length - 2].price;
  const priceChange = +(currentPrice - previousPrice).toFixed(2);
  const percentageChange = +((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
      {/* Main Price Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Stock Market Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">${currentPrice}</div>
              <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{Math.abs(priceChange)} ({Math.abs(percentageChange)}%)</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Volume: {stockData[stockData.length - 1].volume.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>24h Range: ${Math.min(...stockData.map(d => d.price)).toFixed(2)} - ${Math.max(...stockData.map(d => d.price)).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Price Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                  name="Stock Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                  name="Volume"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockDashboard;
