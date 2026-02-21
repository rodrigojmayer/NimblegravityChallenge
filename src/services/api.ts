import type { Candidate, Job } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const getCandidateByEmail = async (
  email: string
): Promise<Candidate> => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error buscando candidato");
  }

  return data;
};

export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    throw new Error("Error buscando trabajos");
  }

  return response.json();
};

export const applyToJob = async (data: {
  applicationId: string,
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}) => {

  const response = await fetch(
    `${BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error aplicando a trabajo");
  }

  return result;

};