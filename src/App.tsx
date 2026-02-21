/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  getCandidateByEmail,
  getJobs
} from "./services/api";
import JobCard from "./components/JobCard";
import type { Candidate, Job, Success } from "./types";


function App() {
  const [email, setEmail] = useState<string>("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [success, setSuccess] = useState<Success | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async (
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();

    if (!email) {
      setError("Email es requerido.");
      return;
    }

    if (!email.includes("@")) {
        setError("Formato de email inválido.");
        return;
      }

    try {
      setLoading(true);
      setError(null);

      const candidateData = await getCandidateByEmail(email);
      const jobsData = await getJobs();

      setCandidate(candidateData);
      setJobs(jobsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Nimble Gravity Challenge</h1>

      {!candidate && (
        <div>
          <h2>Ingrese su email</h2>

          <form onSubmit={handleFetchData} noValidate>

            <input
              type="email"
              placeholder="su@email.com"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Continuar"}
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>
      )}

      {!success && candidate && (
        <>
          <div>
            <h2>Información del candidato</h2>
            <p>
              <strong>Nombre:</strong> {candidate.firstName}{" "}
              {candidate.lastName}
            </p>
            <p>
              <strong>Email:</strong> {candidate.email}
            </p>
          </div>

          <div className="card">
            <h2>Posiciones disponibles</h2>

             {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                candidate={candidate}
                setSuccess={setSuccess}
              />
            ))}
          </div>
        </>
      )}

      {success && candidate && (
        <>
          <div className="card-success">
            <h2>Aplicación exitosa</h2>
            <p>
              <strong>Nombre:</strong> {candidate.firstName}{" "} {candidate.lastName}
            </p>
            <p>
              <strong>Email:</strong> {candidate.email}
            </p>
            <p>
              <strong>Posición:</strong> {success.job}
            </p>
            <p>

              <strong>Repositorio:&nbsp;</strong> {success.repoUrl}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;