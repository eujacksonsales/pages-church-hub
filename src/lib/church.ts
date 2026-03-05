import rosarioConfig from '../data/rosario.json';
import coracaoConfig from '../data/coracao.json';

export type ChurchId = 'rosario' | 'coracao';

export interface ChurchSchedule {
  missas: { dia: string; horarios: string[] }[];
  batismo: string;
  catequese: string;
  secretaria?: string;
}

export interface ChurchConfig {
  name: string;
  shortName: string;
  address: string;
  cep: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  schedule: ChurchSchedule;
  mapsEmbedUrl?: string;
}

const configs: Record<ChurchId, ChurchConfig> = {
  rosario: rosarioConfig as ChurchConfig,
  coracao: coracaoConfig as ChurchConfig,
};

export function getChurchId(): ChurchId {
  const id = import.meta.env.CHURCH_ID as string;
  if (id === 'rosario' || id === 'coracao') return id;
  return 'rosario';
}

export function getChurchConfig(): ChurchConfig {
  return configs[getChurchId()];
}
