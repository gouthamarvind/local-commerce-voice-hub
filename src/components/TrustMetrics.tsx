
import React, { useEffect, useState } from 'react';
import { Users, ShieldCheck, Package } from 'lucide-react';

interface Metric {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

export const TrustMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { icon: <Users className="w-6 h-6" />, value: 0, label: 'Active Users', suffix: '+' },
    { icon: <ShieldCheck className="w-6 h-6" />, value: 0, label: 'Verified Sellers', suffix: '+' },
    { icon: <Package className="w-6 h-6" />, value: 0, label: 'Products Listed', suffix: '+' }
  ]);

  const targetValues = [12450, 3200, 25800];

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setMetrics(prev => 
          prev.map((metric, index) => ({
            ...metric,
            value: Math.floor(targetValues[index] * easeOutQuart)
          }))
        );

        if (currentStep >= steps) {
          clearInterval(interval);
          setMetrics(prev => 
            prev.map((metric, index) => ({
              ...metric,
              value: targetValues[index]
            }))
          );
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
      {metrics.map((metric, index) => (
        <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full text-primary">
            {metric.icon}
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            {metric.value.toLocaleString()}{metric.suffix}
          </div>
          <div className="text-sm text-gray-600">{metric.label}</div>
        </div>
      ))}
    </div>
  );
};
