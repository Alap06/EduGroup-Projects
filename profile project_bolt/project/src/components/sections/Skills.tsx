import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card } from '../ui/Card';

export const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillsData = [
    { skill: 'React/Vue', level: 95 },
    { skill: 'TypeScript', level: 90 },
    { skill: 'Node.js', level: 85 },
    { skill: 'UI/UX Design', level: 88 },
    { skill: 'Python', level: 80 },
    { skill: 'Database', level: 82 },
  ];

  const radarData = [
    { subject: 'Frontend', A: 95, fullMark: 100 },
    { subject: 'Backend', A: 85, fullMark: 100 },
    { subject: 'Design', A: 88, fullMark: 100 },
    { subject: 'Mobile', A: 75, fullMark: 100 },
    { subject: 'DevOps', A: 70, fullMark: 100 },
    { subject: 'Database', A: 82, fullMark: 100 },
  ];

  const techUsageData = [
    { name: 'JavaScript/TypeScript', value: 35, color: '#3B82F6' },
    { name: 'Python', value: 25, color: '#8B5CF6' },
    { name: 'CSS/SCSS', value: 20, color: '#06B6D4' },
    { name: 'PHP', value: 12, color: '#10B981' },
    { name: 'Autres', value: 8, color: '#F59E0B' },
  ];

  const projectMetrics = [
    { name: 'E-commerce', completed: 12, satisfaction: 98 },
    { name: 'Mobile Apps', completed: 8, satisfaction: 95 },
    { name: 'Dashboards', completed: 15, satisfaction: 97 },
    { name: 'Landing Pages', completed: 20, satisfaction: 99 },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Compétences & Analytics
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visualisation interactive de mes compétences techniques et performances projets
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Radar des Compétences
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid gridType="polygon" className="opacity-30" />
                  <PolarAngleAxis dataKey="subject" className="text-sm font-medium" />
                  <PolarRadiusAxis
                    angle={45}
                    domain={[0, 100]}
                    tick={false}
                    tickCount={5}
                  />
                  <Radar
                    name="Compétences"
                    dataKey="A"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Technology Usage Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Utilisation des Technologies
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={techUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {techUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Utilisation']}
                    labelStyle={{ color: '#374151' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {techUsageData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skills Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Niveau de Maîtrise
              </h3>
              <div className="space-y-6">
                {skillsData.map((skill, index) => (
                  <div key={skill.skill}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.skill}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Project Metrics Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Métriques des Projets
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={projectMetrics}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="name"
                    className="text-sm"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis className="text-sm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar
                    dataKey="completed"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    name="Projets Complétés"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};