import { ExerciseCategory } from '../../../domain/models/Exercise';
import { DifficultyLevel } from '../../../domain/models/Progress';
import { CategoryItem } from './CategoryCard';

export interface CategoryConfig extends CategoryItem {
  id: ExerciseCategory;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'suma',
    title: 'Sumas',
    subtitle: 'Aprende a sumar números',
    badge: '1 + 2 = 3',
    icon: '➕',
    color: '#0284C7',
  },
  {
    id: 'resta',
    title: 'Restas',
    subtitle: 'Practica restas sin negativos',
    badge: '5 − 2 = 3',
    icon: '➖',
    color: '#E11D48',
  },
  {
    id: 'comparacion',
    title: 'Mayor, menor o igual',
    subtitle: 'Compara números con >, < o =',
    badge: '7 > 4',
    icon: '⚖️',
    color: '#7C3AED',
  },
  {
    id: 'anterior_posterior',
    title: 'Anterior y posterior',
    subtitle: 'Encuentra el número antes o después',
    badge: '__ , 7 , __',
    icon: '↔️',
    color: '#059669',
  },
  {
    id: 'suma_incompleta',
    title: 'Sumas incompletas',
    subtitle: 'Encuentra el sumando que falta',
    badge: '3 + __ = 8',
    icon: '🧩',
    color: '#D97706',
  },
  {
    id: 'resta_incompleta',
    title: 'Restas incompletas',
    subtitle: 'Completa el número que falta',
    badge: '9 − __ = 4',
    icon: '🔍',
    color: '#4F46E5',
  },
];

export const getDifficultyLabel = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'easy':
      return 'Fácil (1-10)';
    case 'medium':
      return 'Medio (1-20)';
    case 'hard':
      return 'Avanzado (1-50)';
    case 'expert':
      return '3 Cifras / Columna (100-999) 📝';
    default:
      return 'Fácil (1-10)';
  }
};
