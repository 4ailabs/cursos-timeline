import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import { COLORS, EASE, SAFE, SIZE, TYPE } from "../../brand/tokens";
import { Atmosphere } from "../../brand/Atmosphere";
import { BlurWords } from "../../brand/BlurWords";
import { CameraDrift } from "../../brand/CameraDrift";
import { Chip } from "../../brand/Chip";
import { CountUp } from "../../brand/CountUp";
import { InstitutoClose } from "../../brand/InstitutoClose";
import { useFonts } from "../../brand/useFonts";

// ============================================================================
// Anuncio "Los Cuatro Caminos · Formación en terapia con muñecos"
// Curso Selecto · 5 y 19 de septiembre de 2026
//
// Estándar: docs/lineamientos-video.md + PesoDiagramas.tsx — cada beat tiene una
// idea visual propia que SE CONSTRUYE EN SECUENCIA. Texto que solo aparece no
// cuenta como escena.
//
// IDENTIDAD PROPIA: este curso usa el sistema del Instituto (src/brand) y su
// motivo propio — LA HOJA rectangular con dos ejes y el muñeco que apunta. El
// dipolo y el kit del deck son de Regulación Bioeléctrica y aquí no entran.
//
// Guion de referencia:
// 03_Programas/Cursos_Selectos/Caminos_de_Vida_Playmobil/Guion_Anuncio.md
// ============================================================================

const SIDE = SAFE.landscape.side;

const ease = (frame: number, at: number, dur = 18) =>
  interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE.entrance),
  });

const enter = (frame: number, at: number) => {
  const e = ease(frame, at);
  return {
    opacity: e,
    transform: `translateY(${((1 - e) * 20).toFixed(2)}px)`,
  };
};

// ---- Envolturas de escena ---------------------------------------------------

const Izquierda: React.FC<{
  children: React.ReactNode;
  tone?: "paper" | "deep";
}> = ({ children, tone = "paper" }) => (
  <AbsoluteFill>
    <Atmosphere tone={tone} />
    <CameraDrift amount={0.7}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${SAFE.landscape.top}px ${SIDE}px`,
        }}
      >
        {children}
      </AbsoluteFill>
    </CameraDrift>
  </AbsoluteFill>
);

const FotoFondo: React.FC<{
  archivo: string;
  children?: React.ReactNode;
  foco?: string;
  oscuro?: number;
}> = ({ archivo, children, foco = "center", oscuro = 0.24 }) => {
  const frame = useCurrentFrame();
  const escala = interpolate(frame, [0, 240], [1.035, 1.095], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#071A2C", overflow: "hidden" }}>
      <Img
        src={staticFile(`images/anuncio-cuatro-caminos/${archivo}`)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: foco,
          transform: `scale(${escala})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, rgba(3,13,24,0.94) 0%, rgba(3,13,24,0.76) 34%, rgba(3,13,24,${oscuro}) 66%, rgba(3,13,24,0.08) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,8,16,0.18), transparent 44%, rgba(2,8,16,0.34))",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

// ---- 01 · La repetición, en toda la vida ------------------------------------
// Idea: cuatro muñecos caen en cuatro puntos distintos de la hoja y los cuatro
// terminan apuntando AL MISMO rumbo. La tesis del video, dicha sin palabras.

const DOMINIOS = [
  { label: "TRABAJO", fx: 0.26, fy: 0.3 },
  { label: "CUERPO", fx: 0.72, fy: 0.26 },
  { label: "DINERO", fx: 0.3, fy: 0.73 },
  { label: "ROL", fx: 0.74, fy: 0.7 },
] as const;

const EscenaRepeticion: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FotoFondo archivo="cuatro-caminos-v3.png" foco="center">
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${SAFE.landscape.top}px ${SIDE}px`,
        }}
      >
        <div style={{ width: 720 }}>
          <Chip
            label="Direcciones de vida"
            delay={2}
            color="#F3B56A"
            bg="rgba(243,181,106,0.14)"
          />
          <h1
            style={{
              fontFamily: TYPE.fraunces,
              fontWeight: 800,
              fontSize: 96,
              lineHeight: 1.02,
              color: "#FFF8EC",
              margin: "30px 0 0",
              ...enter(frame, 10),
            }}
          >
            Hay direcciones
            <br />
            que se repiten.
          </h1>
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 42,
              flexWrap: "wrap",
            }}
          >
            {DOMINIOS.map((d, i) => (
              <span
                key={d.label}
                style={{
                  fontFamily: TYPE.mono,
                  fontSize: 32,
                  letterSpacing: 2,
                  color: "#D8E5E7",
                  padding: "12px 18px",
                  border: "1px solid rgba(216,229,231,0.3)",
                  borderRadius: 999,
                  opacity: ease(frame, 28 + i * 8),
                }}
              >
                {d.label}
              </span>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </FotoFondo>
  );
};

// ---- 02 · Más allá de lo contado --------------------------------------------
// Idea: del muñeco sale su línea de dirección, que se dibuja y CRUZA el borde de
// la hoja. Lo que sostiene la dirección vive fuera del papel.

const EscenaMasAlla: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FotoFondo archivo="portada-azul.png" foco="center" oscuro={0.06}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${SAFE.landscape.top}px ${SIDE}px`,
        }}
      >
        <div style={{ width: 700 }}>
          <p
            style={{
              fontFamily: TYPE.mono,
              fontSize: 36,
              letterSpacing: 4,
              color: "#F3B56A",
              margin: 0,
              ...enter(frame, 8),
            }}
          >
            LA DIRECCIÓN APARECE
          </p>
          <h2
            style={{
              fontFamily: TYPE.fraunces,
              fontWeight: 800,
              fontSize: 104,
              lineHeight: 1,
              color: "#FFF8EC",
              margin: "26px 0 0",
              ...enter(frame, 18),
            }}
          >
            Más allá de
            <br />
            lo contado.
          </h2>
        </div>
      </AbsoluteFill>
    </FotoFondo>
  );
};

// ---- 03 · El giro y el instrumento ------------------------------------------
// Idea: los ejes se dibujan desde el centro, el muñeco cae con rebote y gira
// hasta su rumbo. El vértice destella al asentarse.

const EscenaCaida: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FotoFondo archivo="caida-en-aire.png" foco="center" oscuro={0.04}>
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: `${SAFE.landscape.top}px ${SIDE}px 104px`,
        }}
      >
        <div style={{ display: "flex", gap: 20, ...enter(frame, 26) }}>
          {["SE SUELTA", "SE OBSERVA", "SE LEE"].map((t, i) => (
            <span
              key={t}
              style={{
                fontFamily: TYPE.mono,
                fontSize: 32,
                letterSpacing: 3,
                color: i === 1 ? "#F3B56A" : "#FFF8EC",
                opacity: ease(frame, 26 + i * 14),
              }}
            >
              {t}
              {i < 2 ? "  ·" : ""}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </FotoFondo>
  );
};

// ---- 04 · El nombre ---------------------------------------------------------

const Portada: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FotoFondo archivo="portada-azul.png" foco="center" oscuro={0.02}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${SAFE.landscape.top}px ${SIDE}px`,
        }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1180 }}>
          <Chip label="Curso Selecto" delay={2} />
          <h1
            style={{
              fontFamily: TYPE.fraunces,
              fontWeight: 900,
              fontSize: SIZE.display,
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
              color: "#FFF8EC",
              margin: "32px 0 0",
              ...enter(frame, 12),
            }}
          >
            Los Cuatro
            <br />
            Caminos
          </h1>
          <div
            style={{
              width: 132,
              height: 4,
              background: COLORS.coral,
              margin: "36px 0 30px",
              transform: `scaleX(${ease(frame, 34)})`,
              transformOrigin: "left",
            }}
          />
          <p
            style={{
              fontFamily: TYPE.sans,
              fontWeight: 500,
              fontSize: SIZE.body,
              lineHeight: 1.3,
              color: "#E8F0F0",
              margin: 0,
              ...enter(frame, 40),
            }}
          >
            Formación en terapia con muñecos
          </p>
          <p
            style={{
              fontFamily: TYPE.mono,
              fontSize: 36,
              letterSpacing: 1,
              color: "#AFC5CB",
              margin: "14px 0 0",
              ...enter(frame, 50),
            }}
          >
            Lectura proyectiva de trayectoria vital
          </p>
        </div>
      </AbsoluteFill>
    </FotoFondo>
  );
};

// ---- 05 · El mapa -----------------------------------------------------------
// Idea: cada cuadrante SE ENCIENDE con un tinte cuando la voz nombra su
// dirección, y arrastra su rótulo. Al cerrar, los cuatro quedan y el tinte baja.

// Orden en que la voz los nombra: Norte, Sur, Oeste, Este.
const RUMBOS = [
  {
    dir: "NORTE",
    nombre: "Migrante",
    at: 30,
    cuad: [0.5, 0, 0.5, 0.5],
    rot: [0.5, -0.13],
  },
  {
    dir: "SUR",
    nombre: "Sufrimiento",
    at: 108,
    cuad: [0, 0.5, 0.5, 0.5],
    rot: [0.5, 1.13],
  },
  {
    dir: "OESTE",
    nombre: "Deber",
    at: 186,
    cuad: [0, 0, 0.5, 0.5],
    rot: [-0.19, 0.5],
  },
  {
    dir: "ESTE",
    nombre: "Placer",
    at: 264,
    cuad: [0.5, 0.5, 0.5, 0.5],
    rot: [1.19, 0.5],
  },
] as const;

const EscenaRumbos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FotoFondo archivo="cuatro-caminos-v3.png" foco="center" oscuro={0.04}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${SAFE.landscape.top}px ${SIDE}px`,
        }}
      >
        <div style={{ width: 700 }}>
          <p
            style={{
              fontFamily: TYPE.mono,
              color: "#F3B56A",
              fontSize: 34,
              letterSpacing: 4,
              margin: "0 0 28px",
              ...enter(frame, 4),
            }}
          >
            CUATRO DIRECCIONES DE VIDA
          </p>
          {RUMBOS.map((r) => {
            const v = ease(frame, r.at, 14);
            return (
              <div
                key={r.dir}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr",
                  alignItems: "baseline",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(255,248,236,0.16)",
                  opacity: v,
                  transform: `translateX(${(1 - v) * -26}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: TYPE.mono,
                    color: "#9FB8BE",
                    fontSize: 32,
                    letterSpacing: 3,
                  }}
                >
                  {r.dir}
                </span>
                <span
                  style={{
                    fontFamily: TYPE.fraunces,
                    color: "#FFF8EC",
                    fontSize: 52,
                  }}
                >
                  {r.nombre}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </FotoFondo>
  );
};

// ---- 06 · Los tres registros ------------------------------------------------
// Idea: la dirección arriba; debajo se apilan tres estratos unidos por una
// línea vertical. Cada estrato entra cuando la voz lo nombra.

const REGISTROS = [
  { n: "01", t: "El evento", d: "pone la dirección en marcha", at: 30 },
  { n: "02", t: "El patrón", d: "la instala en el cuerpo", at: 96 },
  { n: "03", t: "La historia familiar", d: "la sostiene desde atrás", at: 162 },
] as const;

const EscenaRegistros: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FotoFondo archivo="tres-registros-v2.png" foco="center" oscuro={0.08}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${SAFE.landscape.top}px ${SIDE}px`,
        }}
      >
        <div style={{ width: 820 }}>
          <p
            style={{
              fontFamily: TYPE.mono,
              fontSize: 34,
              letterSpacing: 4,
              color: "#F3B56A",
              margin: "0 0 22px",
              ...enter(frame, 2),
            }}
          >
            LA LECTURA CONECTA
          </p>
          {REGISTROS.map((r) => {
            const v = ease(frame, r.at, 16);
            return (
              <div
                key={r.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "76px 1fr",
                  gap: 22,
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(255,248,236,0.16)",
                  opacity: v,
                  transform: `translateY(${(1 - v) * 18}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: TYPE.mono,
                    color: "#F3B56A",
                    fontSize: 32,
                  }}
                >
                  {r.n}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: TYPE.fraunces,
                      color: "#FFF8EC",
                      fontSize: 52,
                    }}
                  >
                    {r.t}
                  </div>
                  <div
                    style={{
                      fontFamily: TYPE.sans,
                      color: "#B8C8CB",
                      fontSize: 36,
                      marginTop: 4,
                    }}
                  >
                    {r.d}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </FotoFondo>
  );
};

// ---- 07 · El acto que actualiza el patrón -----------------------------------
// ⚠️ IMAGEN RESERVADA. El ritual lo diseña el Dr.; hasta tener su forma descrita,
// esta escena se sostiene en tipografía y deja el lienzo libre. NO inventar aquí
// una mecánica (ya ocurrió una vez: "la persona mueve su muñeco con su mano").

const EscenaRitual: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FotoFondo archivo="acto-terapeutico-v2.png" foco="center" oscuro={0.08}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${SAFE.landscape.top}px ${SIDE}px`,
        }}
      >
        <div style={{ width: 780 }}>
          <BlurWords
            text="El patrón se actualiza con un acto."
            delay={4}
            stagger={5}
            punchIndex={5}
            style={{ justifyContent: "flex-start" }}
            wordStyle={{
              fontFamily: TYPE.fraunces,
              fontWeight: 600,
              fontSize: SIZE.h1,
              lineHeight: 1.16,
              color: "#FFF8EC",
            }}
          />
          <p
            style={{
              fontFamily: TYPE.sans,
              fontSize: SIZE.body,
              lineHeight: 1.45,
              color: "#B8C8CB",
              margin: "44px 0 0",
              ...enter(frame, 44),
            }}
          >
            Un ritual que se diseña para ese patrón. También se enseña.
          </p>
        </div>
      </AbsoluteFill>
    </FotoFondo>
  );
};

// ---- 08 · Qué te llevas -----------------------------------------------------
// Idea: tres cifras contando desde cero conforme la voz las dice.

const CIFRAS = [
  { n: 7, t: "pasos del protocolo", at: 16 },
  { n: 6, t: "preguntas que verifican la lectura", at: 76 },
  { n: 2, t: "catálogos de eventos", at: 140 },
] as const;

const EscenaCifras: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Izquierda>
      <div style={{ marginBottom: 56 }}>
        <Chip
          label="Dos sábados"
          delay={2}
          color={COLORS.coral}
          bg="rgba(207,87,48,0.12)"
        />
      </div>
      <div style={{ display: "flex", gap: 110 }}>
        {CIFRAS.map((c) => {
          const v = ease(frame, c.at, 14);
          return (
            <div
              key={c.t}
              style={{
                flex: 1,
                opacity: v,
                transform: `translateY(${((1 - v) * 22).toFixed(2)}px)`,
              }}
            >
              <CountUp
                to={c.n}
                delay={c.at}
                duration={22}
                style={{
                  fontFamily: TYPE.fraunces,
                  fontWeight: 900,
                  fontSize: 168,
                  lineHeight: 1,
                  color: COLORS.teal,
                  display: "block",
                }}
              />
              <div
                style={{
                  width: 88,
                  height: 3,
                  background: COLORS.coral,
                  margin: "22px 0 20px",
                  transform: `scaleX(${ease(frame, c.at + 14)})`,
                  transformOrigin: "left",
                }}
              />
              <p
                style={{
                  fontFamily: TYPE.sans,
                  fontSize: 40,
                  lineHeight: 1.36,
                  color: COLORS.muted,
                  margin: 0,
                }}
              >
                {c.t}
              </p>
            </div>
          );
        })}
      </div>
    </Izquierda>
  );
};

// ---- 09 · Cuándo ------------------------------------------------------------
// Idea: retícula de septiembre de 2026 con los dos sábados marcándose uno tras
// otro. Septiembre de 2026 arranca en martes, con lo que 5 y 19 caen en sábado.

const DIAS = ["L", "M", "M", "J", "V", "S", "D"] as const;
const PRIMER_DIA = 1; // índice 0 = lunes; septiembre 2026 arranca en martes
const MARCADOS = [5, 19] as const;

const EscenaFechas: React.FC = () => {
  const frame = useCurrentFrame();
  const celda = 108;
  const gx = 170;
  const gy = 382;

  const celdas: React.ReactNode[] = [];
  for (let d = 1; d <= 30; d++) {
    const idx = PRIMER_DIA + d - 1;
    const col = idx % 7;
    const fila = Math.floor(idx / 7);
    const x = gx + col * celda;
    const y = gy + fila * celda;
    const marcado = (MARCADOS as readonly number[]).indexOf(d);
    const base = ease(frame, 14 + fila * 4, 14);
    const marca = marcado >= 0 ? ease(frame, 62 + marcado * 40, 16) : 0;
    celdas.push(
      <g key={d} opacity={base}>
        {marca > 0 ? (
          <circle
            cx={x}
            cy={y}
            r={46 * marca}
            fill={COLORS.coral}
            opacity={0.92}
          />
        ) : null}
        <text
          x={x}
          y={y + 15}
          textAnchor="middle"
          fontFamily={marca > 0.5 ? TYPE.fraunces : TYPE.mono}
          fontWeight={marca > 0.5 ? 600 : 400}
          fontSize={marca > 0.5 ? 46 : 34}
          fill={marca > 0.5 ? "#FFFDF8" : COLORS.muted}
        >
          {d}
        </text>
      </g>,
    );
  }

  return (
    <AbsoluteFill>
      <Atmosphere />
      <CameraDrift amount={0.5}>
        <AbsoluteFill>
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
            viewBox="0 0 1920 1080"
          >
            <text
              x={SIDE}
              y={158}
              fontFamily={TYPE.fraunces}
              fontWeight={900}
              fontSize={82}
              fill={COLORS.ink}
              opacity={ease(frame, 2)}
            >
              Septiembre 2026
            </text>
            <line
              x1={SIDE}
              y1={218}
              x2={gx + celda * 6 + 54}
              y2={218}
              stroke={COLORS.line}
              strokeWidth={2}
              opacity={ease(frame, 6)}
            />
            {DIAS.map((d, i) => (
              <text
                key={`${d}-${i}`}
                x={gx + i * celda}
                y={gy - 76}
                textAnchor="middle"
                fontFamily={TYPE.mono}
                fontSize={36}
                letterSpacing={3}
                fill={COLORS.muted}
                opacity={ease(frame, 8)}
              >
                {d}
              </text>
            ))}
            {celdas}
          </svg>
          <div
            style={{ position: "absolute", right: SIDE, top: 366, width: 620 }}
          >
            <div style={{ ...enter(frame, 74) }}>
              <p
                style={{
                  fontFamily: TYPE.fraunces,
                  fontSize: 54,
                  lineHeight: 1.2,
                  color: COLORS.ink,
                  margin: 0,
                }}
              >
                10:00 a 18:00 h
              </p>
              <p
                style={{
                  fontFamily: TYPE.sans,
                  fontSize: SIZE.body,
                  lineHeight: 1.4,
                  color: COLORS.muted,
                  margin: "22px 0 0",
                }}
              >
                Presencial y por Zoom
              </p>
            </div>
            <div style={{ marginTop: 40, ...enter(frame, 112) }}>
              <Chip
                label="Cupo limitado"
                delay={112}
                color={COLORS.coral}
                bg="rgba(207,87,48,0.12)"
              />
            </div>
          </div>
        </AbsoluteFill>
      </CameraDrift>
    </AbsoluteFill>
  );
};

// ---- 10 · Cierre ------------------------------------------------------------
// El beat final se mantiene nítido hasta el último frame.

const EscenaCierre: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Atmosphere tone="deep" />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: SIDE,
        }}
      >
        <div style={{ textAlign: "center", width: 1280 }}>
          <Chip
            label="Curso selecto"
            delay={2}
            color={COLORS.teal}
            bg="rgba(15,110,86,0.10)"
          />
          <h2
            style={{
              fontFamily: TYPE.fraunces,
              fontWeight: 900,
              fontSize: SIZE.h1,
              lineHeight: 1.0,
              color: COLORS.ink,
              margin: "32px 0 0",
              ...enter(frame, 10),
            }}
          >
            Los Cuatro Caminos
          </h2>
          <p
            style={{
              fontFamily: TYPE.sans,
              fontWeight: 500,
              fontSize: SIZE.body,
              color: COLORS.muted,
              margin: "22px 0 0",
              ...enter(frame, 18),
            }}
          >
            5 y 19 de septiembre · Presencial y por Zoom
          </p>
          <div
            style={{
              display: "inline-block",
              marginTop: 52,
              ...enter(frame, 28),
            }}
          >
            <div
              style={{
                fontFamily: TYPE.mono,
                fontSize: 34,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: COLORS.coral,
                marginBottom: 16,
              }}
            >
              Solicita informes
            </div>
            <div
              style={{
                fontFamily: TYPE.fraunces,
                fontWeight: 600,
                fontSize: 64,
                color: COLORS.ink,
              }}
            >
              +52 55 7907 6626
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Cierre institucional independiente, siguiendo los anuncios landscape del
// repositorio. InstitutoClose está diseñado para formato vertical y se escala
// para conservar el mandala y el wordmark completos en 1920×1080.
const EscenaInstituto: React.FC = () => (
  <AbsoluteFill>
    <Atmosphere tone="deep" />
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transform: "scale(0.82)",
      }}
    >
      <InstitutoClose delay={8} wordmarkScale={1.45} />
    </div>
  </AbsoluteFill>
);

// ---- Estructura de beats ----------------------------------------------------

type Beat = { audio: string; Scene: React.FC };

export const SECTIONS: readonly Beat[] = [
  { audio: "beat-01.mp3", Scene: EscenaRepeticion },
  { audio: "beat-02.mp3", Scene: EscenaMasAlla },
  { audio: "beat-03.mp3", Scene: EscenaCaida },
  { audio: "beat-04.mp3", Scene: Portada },
  { audio: "beat-05.mp3", Scene: EscenaRumbos },
  { audio: "beat-06.mp3", Scene: EscenaRegistros },
  { audio: "beat-07.mp3", Scene: EscenaRitual },
  { audio: "beat-08.mp3", Scene: EscenaCifras },
  { audio: "beat-09.mp3", Scene: EscenaFechas },
  { audio: "beat-10.mp3", Scene: EscenaCierre },
] as const;

export const AUDIO_FILES = SECTIONS.map((s) => s.audio);
// Estimaciones para previsualizar sin audio. El render real las sustituye con la
// duración medida de cada mp3.
export const FALLBACK_DURATIONS_SECONDS = [
  9.3, 6.2, 9.5, 5.0, 20.9, 11.7, 12.0, 11.4, 11.8, 6,
] as const;
export const LEAD_IN_FRAMES = 24;
export const OUTRO_FRAMES = 90;
export const PAUSE_FRAMES = 14;

// `conAudio` va por beat y no global: mientras el beat del canal de contacto
// siga pendiente, los demás ya se pueden previsualizar con su voz real.
const MUSICA_VOLUMEN = 0.13;
const MUSICA_FUNDIDO = 34;

/** Cama musical bajo la voz, con fundido en los dos extremos. */
const Musica: React.FC<{ total: number }> = ({ total }) => (
  <Audio
    src={staticFile("audio/anuncio-caminos-playmobil/background.mp3")}
    volume={(f) =>
      interpolate(
        f,
        [0, MUSICA_FUNDIDO, total - MUSICA_FUNDIDO, total],
        [0, 1, 1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      ) * MUSICA_VOLUMEN
    }
  />
);

const beatFrameSchema = z.object({
  start: z.number(),
  duration: z.number(),
  conAudio: z.boolean(),
});
export const anuncioCuatroCaminosSchema = z.object({
  beatFrames: z.array(beatFrameSchema),
});
type AnuncioCuatroCaminosProps = z.infer<typeof anuncioCuatroCaminosSchema>;

export const AnuncioCuatroCaminos: React.FC<AnuncioCuatroCaminosProps> = ({
  beatFrames,
}) => {
  const fontsReady = useFonts();
  if (!fontsReady || beatFrames.length === 0) {
    return (
      <AbsoluteFill style={{ backgroundColor: "#071A2C" }} />
    );
  }
  const last = beatFrames[beatFrames.length - 1];
  const outroStart = last.start + last.duration;

  return (
    <AbsoluteFill style={{ backgroundColor: "#071A2C" }}>
      <Musica total={outroStart + OUTRO_FRAMES} />
      <Sequence durationInFrames={LEAD_IN_FRAMES}>
        <FotoFondo archivo="cuatro-caminos-v3.png" foco="center" oscuro={0.04} />
      </Sequence>
      {beatFrames.map((beat, index) => {
        const audioSrc = staticFile(
          `audio/anuncio-caminos-playmobil/${SECTIONS[index].audio}`,
        );
        const SceneComp = SECTIONS[index].Scene;
        return (
          <Sequence
            key={SECTIONS[index].audio}
            from={beat.start}
            durationInFrames={beat.duration}
            premountFor={30}
          >
            <SceneComp />
            {beat.conAudio ? <Audio src={audioSrc} /> : null}
          </Sequence>
        );
      })}
      <Sequence from={outroStart} durationInFrames={OUTRO_FRAMES}>
        <EscenaInstituto />
      </Sequence>
    </AbsoluteFill>
  );
};
