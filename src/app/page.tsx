import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Sample backend fetch simulation
type BeltDistribution = {
  white: number;
  blue: number;
  purple: number;
  brown: number;
  black: number;
};
type Belt = 'white' | 'blue' | 'purple' | 'brown' | 'black';
const fetchClassEnrollment = async (): Promise<BeltDistribution> => {
  // Simulated API call to backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ white: 3, blue: 2, purple: 1, brown: 0, black: 1 });
    }, 1000);
  });
};

export default function TechniqueDashboard() {
  const [beltDistribution, setBeltDistribution] = useState<BeltDistribution>({ white: 0, blue: 0, purple: 0, brown: 0, black: 0 });
  const [suggestedTechniques, setSuggestedTechniques] = useState<string[]>([]);


  useEffect(() => {
    const updateEnrollment = async () => {
      const data = await fetchClassEnrollment();
      setBeltDistribution(data);
    };
    updateEnrollment();

    const interval = setInterval(updateEnrollment, 10000); // update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateTechniques = () => {
      const techniques = [];
      if (beltDistribution.white > 0) techniques.push('Basic Armbar from Guard');
      if (beltDistribution.blue > 0) techniques.push('Triangle to Omoplata Transition');
      if (beltDistribution.purple > 0) techniques.push('Lapel Guard Sweep');
      if (beltDistribution.brown > 0) techniques.push('Leg Drag to Back Take');
      if (beltDistribution.black > 0) techniques.push('Berimbolo Entry to Back');
      setSuggestedTechniques(techniques);
    };

    generateTechniques();
  }, [beltDistribution]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Jiu-Jitsu Curriculum Dashboard</h1>
      <Tabs defaultValue="class" className="w-full">
        <TabsList>
          <TabsTrigger value="class">Class Setup</TabsTrigger>
          <TabsTrigger value="techniques">Suggested Techniques</TabsTrigger>
        </TabsList>

        <TabsContent value="class">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Class Roster Input</h2>
              {(['white', 'blue', 'purple', 'brown', 'black'] as Belt[]).map((belt) => (
                <div key={belt} className="flex items-center space-x-2">
                  <Label className="capitalize w-24">{belt} belts</Label>
                  <Input
                    type="number"
                    value={beltDistribution[belt]}
                    onChange={(e) => setBeltDistribution({
                      ...beltDistribution,
                      [belt]: parseInt(e.target.value) || 0,
                    })}
                    className="w-24"
                  />
                </div>
              ))}
              <p className="text-sm text-gray-500">Auto-updates every 10 seconds from class enrollment API.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="techniques">
          <Card>
            <CardContent className="space-y-2">
              <h2 className="text-xl font-semibold">Suggested Curriculum</h2>
              {suggestedTechniques.map((technique, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded-xl">
                  {technique}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

