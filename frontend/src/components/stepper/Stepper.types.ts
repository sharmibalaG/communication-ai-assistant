export interface StepItem {
  id: number;
  title: string;
  status: "completed" | "active" | "pending";
}