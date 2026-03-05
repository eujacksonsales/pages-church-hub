const API_URL = 'https://liturgia.up.railway.app/v2/';

export interface Leitura {
  referencia?: string;
  texto?: string;
}

export interface LiturgiaData {
  liturgia?: string;
  cor?: string;
  leituras?: {
    primeiraLeitura?: Leitura[];
    salmo?: Leitura[];
    segundaLeitura?: Leitura[];
    evangelho?: Leitura[];
  };
}

export async function fetchLiturgia(dia: number, mes: number): Promise<LiturgiaData> {
  const res = await fetch(`${API_URL}?dia=${dia}&mes=${mes}`);
  if (!res.ok) throw new Error('Falha ao carregar liturgia');
  return res.json();
}

export const CANCAO_NOVA_URL = 'https://liturgia.cancaonova.com/pb/';
