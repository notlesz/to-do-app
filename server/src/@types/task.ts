export interface Task {
  title: string;
  description?: string;
  runTime?: number;
  status: "A_fazer" | "Em_execucao" | "Feito";
}

