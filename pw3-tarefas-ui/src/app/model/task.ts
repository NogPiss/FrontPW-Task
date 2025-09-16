export interface Task {
  id?: number;
  titulo: string;
  descricao: string;
  dataLimite: string; // ISO format
  statusEnum: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  responsavel: string;
}
