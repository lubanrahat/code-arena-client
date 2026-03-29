import { httpClient } from "@/lib/axios/httpClient";

export interface IContributeData {
  name: string;
  email: string;
  countryCode: string;
  contactNumber?: string;
  contributionType: string;
  experience: string;
  portfolioLink?: string;
  message?: string;
}

export class ContributeService {
  static async createContribution(data: IContributeData) {
    const response = await httpClient.post("/contribute", data);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getAllContributions(params?: any) {
    const response = await httpClient.get("/contribute", { params });
    return response;
  }

  static async updateStatus(id: string, status: string) {
    const response = await httpClient.patch(`/contribute/${id}`, { status });
    return response;
  }
}
