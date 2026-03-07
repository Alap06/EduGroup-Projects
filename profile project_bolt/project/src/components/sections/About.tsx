import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Award, Code } from 'lucide-react';
import { Card } from '../ui/Card';

export const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Code, label: 'Projets Réalisés', value: '50+' },
    { icon: Award, label: 'Années d\'Expérience', value: '5+' },
    { icon: Calendar, label: 'Clients Satisfaits', value: '30+' },
    { icon: MapPin, label: 'Tozeur, Tunisie', value: 'Localisation' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              À Propos de Moi
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Développeur passionné avec une expertise en technologies modernes et design innovant
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-6xl font-bold text-gray-700">
                    AA
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ala Amara</h3>
                <p className="text-blue-600 font-medium">Full-Stack Developer & UI/UX Designer</p>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Basé à Tozeur, Tunisie, je suis un développeur full-stack passionné par la création 
                d'expériences numériques exceptionnelles. Avec plus de 5 années d'expérience, 
                je combine expertise technique et sensibilité artistique pour donner vie aux idées.
              </p>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="p-4 text-center hover:bg-white/20">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Skills and Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Expertise Technique</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Frontend Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Next.js'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Backend Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Design & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Adobe Suite', 'Sketch', 'Storybook', 'Docker'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Philosophie</h3>
              <p className="text-gray-600 leading-relaxed">
                Je crois que la technologie doit être au service de l'humain. Chaque ligne de code 
                que j'écris, chaque interface que je conçois, a pour objectif d'améliorer l'expérience 
                utilisateur et de résoudre des problèmes concrets. L'innovation constante et l'apprentissage 
                continu sont au cœur de ma démarche.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};