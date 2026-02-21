import { useState } from "react";
import { applyToJob } from "../services/api";
import type { Candidate, Job, Success } from "../types";

interface JobCardProps {
  job: Job;
  candidate: Candidate;
  setSuccess: (newData: Success) => void;
}

const JobCard = ({ job, candidate, setSuccess }: JobCardProps) => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!repoUrl) {
      setError("Por favor ingrese la URL de su repositorio.");
      return;
    }
    if (!repoUrl.includes("https://github.com/")) {
      setError("Formato de URL inválido.");
      return;
    }

    try {
        setLoading(true);
        setError(null);

        await applyToJob({
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            applicationId: candidate.applicationId,
            repoUrl,
        });
        
        setSuccess({job: job.title, repoUrl: repoUrl })
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Un error ha ocurrido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <input
        type="text"
        placeholder="https://github.com/tu-usuario/tu-repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Enviando postulación..." : "Enviar postulación"}
      </button>

        {error && <p className="error">{error}</p>}
    </div>
  );
};

export default JobCard;