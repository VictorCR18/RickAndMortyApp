import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";
import { getCharacters } from "./api";
import { CharacterCard } from "./components/CharacterCard";
import { CharacterModal } from "./components/CharacterModal";
import { Pagination } from "./components/Pagination";
import type { Character } from "./types";

const THEME_STORAGE_KEY = "rick-and-morty-theme";
const PAGE_STORAGE_KEY = "rick-and-morty-last-page";

function getStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === "light" ? "light" : "dark";
}

function getStoredPage(): number {
  if (typeof window === "undefined") {
    return 1;
  }

  const storedPage = Number.parseInt(window.localStorage.getItem(PAGE_STORAGE_KEY) ?? "", 10);
  return Number.isFinite(storedPage) && storedPage > 0 ? storedPage : 1;
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(getStoredTheme);
  const [currentPage, setCurrentPage] = useState(getStoredPage);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCharacters(currentPage, {
          name: searchTerm.trim(),
          status: statusFilter || undefined,
          species: speciesFilter || undefined,
        });

        if (isMounted) {
          setCharacters(data);
          setTotalPages(10);
        }
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar os personagens neste momento.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadCharacters();

    return () => {
      isMounted = false;
    };
  }, [currentPage, searchTerm, statusFilter, speciesFilter]);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(PAGE_STORAGE_KEY, String(currentPage));
  }, [currentPage]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setSpeciesFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openCharacterModal = (character: Character) => {
    setSelectedCharacter(character)
    setIsModalOpen(true)
  }

  const closeCharacterModal = () => {
    setIsModalOpen(false)
    setSelectedCharacter(null)
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <main className={`app-shell ${theme}`}>
      <header className="app-header">
        <div className="header-top">
          <div>
            <p className="eyebrow">Rick and Morty</p>
            <h1>Personagens</h1>
            <p className="subtitle">
              Explore personagens com busca e filtros aplicados diretamente na
              API.
            </p>
          </div>

          <button
            type="button"
            className="theme-switch"
            onClick={toggleTheme}
            aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
          >
            <span className="theme-icon">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </span>
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>

      <section className="toolbar" aria-label="Busca e filtros">
        <label className="field">
          <span>Buscar por nome</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Digite o nome"
          />
        </label>

        <label className="field">
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">Todos</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>

        <label className="field">
          <span>Espécie</span>
          <select
            value={speciesFilter}
            onChange={(event) => setSpeciesFilter(event.target.value)}
          >
            <option value="">Todas</option>
            <option value="human">Human</option>
            <option value="alien">Alien</option>
            <option value="humanoid">Humanoid</option>
            <option value="animal">Animal</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>

        <button type="button" className="clear-button" onClick={clearFilters}>
          Limpar filtros
        </button>
      </section>

      {loading && (
        <div className="loading-state" role="status" aria-live="polite">
          <div className="portal-loader" aria-hidden="true" />
          <p className="status">Carregando personagens...</p>
        </div>
      )}

      {error && <p className="status error">{error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p className="status">
          Nenhum personagem encontrado com os filtros aplicados.
        </p>
      )}

      <section className="card-grid" aria-label="Lista de personagens">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} onSelect={openCharacterModal} />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={closeCharacterModal}
      />
    </main>
  );
}

export default App;
