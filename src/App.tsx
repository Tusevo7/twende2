import { useEffect, useRef, useState } from "react"

type Film = {
  category: string
  title: string
  description: string
  image: string
  video: string
  credit: string
}

const films: Film[] = [
  {
    category: "TWENDE RIDES",
    title: "O teu próximo destino.",
    description: "Uma viagem pela energia urbana de Luanda.",
    image:
      "https://images.unsplash.com/photo-1630343350724-2eafe052719f?auto=format&fit=crop&w=1600&q=82",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    credit: "Fotografia: Eryxson Fonseca / Unsplash",
  },
  {
    category: "TWENDE DELIVERY",
    title: "Levamos até ti.",
    description: "Da recolha à entrega, a cidade continua em movimento.",
    image:
      "https://images.unsplash.com/photo-1764698767558-f08b537a7217?auto=format&fit=crop&w=1400&q=82",
    video: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    credit: "Fotografia: Sammy Swae / Unsplash",
  },
  {
    category: "A NOSSA VISÃO",
    title: "A cidade não pára.",
    description: "Ruas, pessoas e destinos no mesmo ritmo.",
    image:
      "https://images.unsplash.com/photo-1750112488504-cffc8c87753b?auto=format&fit=crop&w=1600&q=82",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    credit: "Fotografia: Alexandre Juca / Unsplash",
  },
  {
    category: "TWENDE PARTNERS",
    title: "Faz parte do movimento.",
    description: "Motoristas e estafetas fazem a cidade avançar.",
    image:
      "https://images.unsplash.com/photo-1767899390405-7bdbd9bf7340?auto=format&fit=crop&w=1400&q=82",
    video: "https://media.w3.org/2010/05/bunny/movie.mp4",
    credit: "Fotografia: Christian Agbede / Unsplash",
  },
  {
    category: "A EXPERIÊNCIA",
    title: "Tudo começa com um toque.",
    description: "Uma experiência simples, desenhada para o dia a dia.",
    image:
      "https://images.unsplash.com/photo-1759256243611-502772ac391b?auto=format&fit=crop&w=1600&q=82",
    video: "https://media.w3.org/2010/05/video/movie_300.mp4",
    credit: "Fotografia: Ed Wingate / Unsplash",
  },
]

function Icon({
  name,
  size = 20,
}: {
  name: "play" | "arrow" | "close" | "menu" | "location" | "sound"
  size?: number
}) {
  const paths = {
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" stroke="none" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    close: <path d="m7 7 10 10M17 7 7 17" />,
    menu: <path d="M5 9h14M5 15h14" />,
    location: (
      <>
        <path d="M12 21s6-5 6-11a6 6 0 1 0-12 0c0 6 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    sound: (
      <>
        <path d="M6 10v4h3l4 3V7l-4 3H6Z" />
        <path d="M16 9c1.4 1.7 1.4 4.3 0 6" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function Brand() {
  return (
    <span className="brand" aria-label="TWENDE">
      TWENDE<span className="brand-dot">.</span>
    </span>
  )
}

function ArrowLink({
  children,
  href,
  light = false,
}: {
  children: React.ReactNode
  href: string
  light?: boolean
}) {
  return (
    <a className={`arrow-link ${light ? "arrow-link--light" : ""}`} href={href}>
      <span>{children}</span>
      <span className="arrow-link__icon">
        <Icon name="arrow" />
      </span>
    </a>
  )
}

function Player({ film, onClose }: { film: Film; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [onClose])

  return (
    <div
      aria-label={`Reprodutor: ${film.title}`}
      aria-modal="true"
      className="player"
      role="dialog"
    >
      <div className="player__top">
        <div>
          <span>{film.category}</span>
          <strong>{film.title}</strong>
        </div>
        <button
          aria-label="Fechar vídeo"
          className="icon-button icon-button--glass"
          onClick={onClose}
          ref={closeRef}
          type="button"
        >
          <Icon name="close" size={26} />
        </button>
      </div>
      <div className="player__frame">
        <video
          autoPlay
          controls
          playsInline
          poster={film.image}
          preload="metadata"
          src={film.video}
        >
          O teu navegador não suporta reprodução de vídeo.
        </video>
      </div>
      <div className="player__note">
        <span>Filme demonstrativo — substituir pelo filme oficial TWENDE.</span>
        <span>{film.credit}</span>
      </div>
    </div>
  )
}

function FilmCard({
  film,
  index,
  onPlay,
}: {
  film: Film
  index: number
  onPlay: (film: Film, target: HTMLButtonElement) => void
}) {
  return (
    <article className={`film-card film-card--${(index % 3) + 1}`}>
      <img alt="" loading="lazy" src={film.image} />
      <div className="film-card__shade" />
      <div className="film-card__number">0{index + 1}</div>
      <button
        aria-label={`Reproduzir ${film.title}`}
        className="play-button"
        onClick={(event) => onPlay(film, event.currentTarget)}
        type="button"
      >
        <Icon name="play" size={28} />
      </button>
      <div className="film-card__content">
        <span className="eyebrow">{film.category}</span>
        <h3>{film.title}</h3>
        <p>{film.description}</p>
        <span className="demo-label">FILME DEMONSTRATIVO</span>
      </div>
    </article>
  )
}

function PhonePreview() {
  return (
    <div
      className="phone"
      aria-label="Pré-visualização simulada da aplicação TWENDE"
    >
      <div className="phone__screen">
        <div className="phone__status">
          <Brand />
          <span>•••</span>
        </div>
        <div className="phone__map">
          <svg viewBox="0 0 320 370" aria-hidden="true">
            <path d="M-10 65C55 30 85 120 151 98s73-68 179-24" />
            <path d="M15 300c64-95 125-15 178-91s78-66 140-47" />
            <path
              className="route"
              d="M64 276c26-72 77-57 101-122 17-45 57-61 94-80"
            />
          </svg>
          <span className="map-pin map-pin--start" />
          <span className="map-pin map-pin--end" />
          <div className="driver-dot">3 min</div>
        </div>
        <div className="phone__sheet">
          <span className="eyebrow">PRÉ-VISUALIZAÇÃO</span>
          <h3>Para onde vamos?</h3>
          <div className="destination">
            <Icon name="location" />
            <span>
              <small>DESTINO</small>
              Marginal de Luanda
            </span>
          </div>
          <button disabled type="button">
            Pedir uma corrida
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [partnerInterest, setPartnerInterest] = useState("")
  const [progress, setProgress] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dragging = useRef({ active: false, x: 0, scroll: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        }),
      { threshold: 0.12 },
    )
    document
      .querySelectorAll(".reveal")
      .forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const openFilm = (film: Film, target?: HTMLButtonElement) => {
    if (target) triggerRef.current = target
    setActiveFilm(film)
  }

  const closeFilm = () => {
    setActiveFilm(null)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  const updateProgress = () => {
    const node = galleryRef.current
    if (!node) return
    const max = node.scrollWidth - node.clientWidth
    setProgress(max > 0 ? node.scrollLeft / max : 0)
  }

  const moveGallery = (direction: number) => {
    galleryRef.current?.scrollBy({
      behavior: "smooth",
      left: direction * Math.min(window.innerWidth * 0.72, 760),
    })
  }

  return (
    <main>
      <header className="nav">
        <a className="nav__brand" href="#top">
          <Brand />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#filmes">Histórias</a>
          <a href="#servicos">Serviços</a>
          <a href="#app">A aplicação</a>
          <a href="#parceiros">Parceiros</a>
        </nav>
        <a className="nav__cta" href="#parceiros">
          Ser parceiro <Icon name="arrow" />
        </a>
        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          className="nav__menu"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          <Icon name={mobileOpen ? "close" : "menu"} />
        </button>
        {mobileOpen && (
          <nav aria-label="Navegação móvel" className="mobile-nav">
            {[
              ["Histórias", "#filmes"],
              ["Serviços", "#servicos"],
              ["A aplicação", "#app"],
              ["Parceiros", "#parceiros"],
            ].map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMobileOpen(false)}>
                {label}
                <Icon name="arrow" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <img
          alt="Trânsito e arquitetura urbana em Luanda"
          className="hero__image"
          src="https://images.unsplash.com/photo-1743172140481-5c7044dd23d6?auto=format&fit=crop&w=2200&q=88"
        />
        <div className="hero__overlay" />
        <svg className="hero__route" viewBox="0 0 900 900" aria-hidden="true">
          <path d="M910 40C675 90 771 268 571 298S407 486 255 513 197 761-10 830" />
        </svg>
        <span className="floating-pin floating-pin--one">
          <Icon name="location" /> LUANDA
        </span>
        <span className="floating-pin floating-pin--two">A CAMINHO</span>
        <div className="hero__content">
          <span className="eyebrow hero__eyebrow">
            MOBILIDADE FEITA PARA ÁFRICA
          </span>
          <h1>
            <span>Luanda,</span>
            <span>vamos a caminho.</span>
          </h1>
          <div className="hero__bottom">
            <p>
              Corridas para chegares onde precisas. Entregas para fazer
              acontecer. Tudo num só lugar.
            </p>
            <div className="hero__actions">
              <ArrowLink href="#filmes" light>
                Descobrir a TWENDE
              </ArrowLink>
              <a href="#parceiros">Quero ser parceiro</a>
            </div>
          </div>
        </div>
        <button
          aria-label="Reproduzir filme principal"
          className="hero__play"
          onClick={(event) => openFilm(films[2], event.currentTarget)}
          type="button"
        >
          <Icon name="play" size={36} />
          <span>VER O FILME</span>
        </button>
        <div className="scroll-cue">
          <span>DESCOBRIR</span>
          <i />
        </div>
      </section>

      <section className="manifesto section-pad">
        <div className="section-index">01 — A CIDADE</div>
        <div className="manifesto__copy reveal">
          <span className="eyebrow">MOVIMENTO É POSSIBILIDADE</span>
          <h2>
            Luanda move-se.
            <br />
            <span>Nós movemo-nos com ela.</span>
          </h2>
          <p>
            A TWENDE aproxima pessoas, destinos e negócios através de uma
            experiência de mobilidade pensada para o ritmo da cidade.
          </p>
        </div>
        <div className="marquee" aria-hidden="true">
          <span>A CIDADE NÃO ESPERA — A CIDADE NÃO ESPERA —</span>
        </div>
      </section>

      <section className="gallery-section" id="filmes">
        <div className="gallery-head section-pad reveal">
          <div>
            <span className="section-index">02 — EM MOVIMENTO</span>
            <h2>Histórias que nos levam.</h2>
          </div>
          <p>
            Cinco perspectivas sobre a cidade, as pessoas e tudo o que acontece
            entre um ponto e outro.
          </p>
        </div>
        <div
          aria-label="Galeria de filmes TWENDE"
          className="film-track"
          onPointerDown={(event) => {
            const node = galleryRef.current
            if (!node) return
            dragging.current = {
              active: true,
              x: event.clientX,
              scroll: node.scrollLeft,
            }
            node.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (!dragging.current.active || !galleryRef.current) return
            galleryRef.current.scrollLeft =
              dragging.current.scroll - (event.clientX - dragging.current.x)
          }}
          onPointerUp={() => (dragging.current.active = false)}
          onScroll={updateProgress}
          ref={galleryRef}
        >
          {films.map((film, index) => (
            <FilmCard
              film={film}
              index={index}
              key={film.title}
              onPlay={openFilm}
            />
          ))}
        </div>
        <div className="gallery-controls section-pad">
          <div className="gallery-progress">
            <span
              style={{ transform: `scaleX(${Math.max(0.08, progress)})` }}
            />
          </div>
          <div>
            <span>ARRASTA PARA EXPLORAR</span>
            <button
              aria-label="Filme anterior"
              onClick={() => moveGallery(-1)}
              type="button"
            >
              <Icon name="arrow" />
            </button>
            <button
              aria-label="Próximo filme"
              onClick={() => moveGallery(1)}
              type="button"
            >
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="services__head reveal">
          <span className="section-index">03 — UMA PLATAFORMA</span>
          <h2>Duas formas de pôr a cidade a andar.</h2>
        </div>
        <div className="service-panels">
          <article className="service-card reveal">
            <img
              alt="Automóvel em movimento numa estrada urbana à noite"
              loading="lazy"
              src="https://images.unsplash.com/photo-1624607391672-2b7d1bcafe7c?auto=format&fit=crop&w=1400&q=82"
            />
            <div className="service-card__overlay" />
            <span className="eyebrow">TWENDE RIDES</span>
            <div>
              <h3>Chega onde precisas.</h3>
              <p>Uma forma simples de pedir uma corrida e seguir caminho.</p>
              <ArrowLink href="#app" light>
                Ver a experiência
              </ArrowLink>
            </div>
          </article>
          <article className="service-card service-card--red reveal">
            <img
              alt="Motociclista atravessa uma rua urbana"
              loading="lazy"
              src="https://images.unsplash.com/photo-1782937102880-6d5fe9058aa7?auto=format&fit=crop&w=1400&q=82"
            />
            <div className="service-card__overlay" />
            <span className="eyebrow">TWENDE DELIVERY</span>
            <div>
              <h3>O que precisas, a caminho.</h3>
              <p>Recolhas e entregas para acompanhar o ritmo do teu dia.</p>
              <ArrowLink href="#app" light>
                Ver a experiência
              </ArrowLink>
            </div>
          </article>
        </div>
      </section>

      <section className="app-section section-pad" id="app">
        <div className="app-section__copy reveal">
          <span className="section-index">04 — NA TUA MÃO</span>
          <h2>Da intenção ao destino.</h2>
          <p>
            Uma experiência concebida para pedir uma corrida, solicitar uma
            entrega e acompanhar o percurso com clareza.
          </p>
          <div className="app-steps">
            {[
              "Escolhe o destino",
              "Seleciona o serviço",
              "Acompanha o percurso",
            ].map((step, index) => (
              <div key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <span className="preview-note">
            Interface ilustrativa. A experiência final pode variar.
          </span>
        </div>
        <div className="phone-stage reveal">
          <span className="phone-stage__orbit">A CIDADE NA TUA MÃO • </span>
          <PhonePreview />
        </div>
      </section>

      <section className="partners section-pad" id="parceiros">
        <svg
          className="partners__route"
          viewBox="0 0 1200 600"
          aria-hidden="true"
        >
          <path d="M-20 510c210-20 264-233 475-163s232-144 383-117 183-81 390-183" />
        </svg>
        <div className="partners__copy reveal">
          <span className="eyebrow">PARCEIROS TWENDE</span>
          <h2>Faz parte do movimento.</h2>
          <p>Aproxima pessoas, liga negócios e ajuda a cidade a avançar.</p>
        </div>
        <div className="partner-links">
          {["Motoristas", "Estafetas", "Empresas parceiras"].map((label) => (
            <button
              key={label}
              onClick={() => setPartnerInterest(label)}
              type="button"
            >
              <span>{label}</span>
              <Icon name="arrow" size={32} />
            </button>
          ))}
        </div>
        {partnerInterest && (
          <p className="partner-status" role="status">
            Interesse em {partnerInterest}: o canal oficial de candidatura será
            apresentado aqui assim que for disponibilizado pela TWENDE.
          </p>
        )}
      </section>

      <section className="final-cta section-pad">
        <div className="final-cta__mark">T</div>
        <div className="reveal">
          <span className="eyebrow">TWENDE. A CIDADE NÃO ESPERA.</span>
          <h2>Estás pronto para ir?</h2>
          <ArrowLink href="#top">Descobrir a TWENDE</ArrowLink>
        </div>
      </section>

      <footer className="footer section-pad">
        <div>
          <Brand />
          <p>Mobilidade feita para África.</p>
        </div>
        <div className="footer__links">
          <a href="#filmes">Histórias</a>
          <a href="#servicos">Serviços</a>
          <a href="#app">A aplicação</a>
          <a href="#parceiros">Parceiros</a>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} TWENDE</span>
          <a href="#top">VOLTAR AO TOPO ↑</a>
        </div>
      </footer>

      {activeFilm && <Player film={activeFilm} onClose={closeFilm} />}
    </main>
  )
}
