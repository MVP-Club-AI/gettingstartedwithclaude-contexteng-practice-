import React, { useState } from "react";

const STEPS = [
  {
    id: "welcome",
    title: "Your First Vibe Code",
    subtitle: "You're about to build something real with AI.",
  },
  {
    id: "demystify",
    title: "Code Is Just Files",
    subtitle: "The single mental model that changes everything.",
  },
  {
    id: "plan",
    title: "Think Before You Build",
    subtitle: "Great projects start with clear thinking, not code.",
  },
  {
    id: "prompt",
    title: "Start Your Project",
    subtitle: "Paste this prompt and watch what happens.",
  },
  {
    id: "permissions",
    title: "When Claude Asks Permission",
    subtitle: 'The "scary" moments explained.',
  },
  {
    id: "localhost",
    title: "See It Live",
    subtitle: "Your creation is running on your computer.",
  },
  {
    id: "iterate",
    title: "Make It Yours",
    subtitle: "Your first iteration. This is where it gets fun.",
  },
  {
    id: "deploy",
    title: "Share It With the World",
    subtitle: "Put it on the internet. Send the link.",
  },
  {
    id: "done",
    title: "You Just Vibe Coded",
    subtitle: "What you learned, and where to go next.",
  },
];

type PermissionKey =
  | "npm_install"
  | "mkdir"
  | "dev_server"
  | "create_files"
  | "git";

const PERMISSIONS: Record<
  PermissionKey,
  { scary: string; simple: string; verdict: string; icon: string }
> = {
  npm_install: {
    scary: '"Install npm packages" or "Run npm install"',
    simple:
      "Claude wants to download pre-built tools that other developers made. Think of it like installing apps on your phone — these are common, trusted building blocks so Claude doesn't have to write everything from scratch.",
    verdict: "Say yes. This is normal for every project.",
    icon: "📦",
  },
  mkdir: {
    scary: '"Create directory" or "Make folder"',
    simple:
      "Claude is organizing your project into folders, just like you'd make folders in Finder or File Explorer to keep things tidy.",
    verdict: "Say yes. It's just making folders on your computer.",
    icon: "📁",
  },
  dev_server: {
    scary: '"Start the dev server" or "Run npm run dev"',
    simple:
      "This turns your files into a live preview you can see in your browser. It's running on YOUR computer only — nobody else can see it yet.",
    verdict: "Say yes. This is how you preview your work.",
    icon: "🖥️",
  },
  create_files: {
    scary: '"Write to file" or "Create file"',
    simple:
      "Claude is creating or editing the actual files that make up your project. This is the core of what it does — writing the code files for you.",
    verdict: "Say yes. This is literally the point.",
    icon: "📝",
  },
  git: {
    scary: '"Initialize git" or "git init"',
    simple:
      'Git is a save-point system for code. Think of it like "version history" in Google Docs. It lets you go back to earlier versions if needed.',
    verdict: "Say yes. It's a safety net, not a risk.",
    icon: "💾",
  },
};

/* ─── Visual Components ─────────────────────────────────────────── */

const FolderTree = () => {
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  const fileExplanations: Record<string, { what: string; color: string }> = {
    "index.html": {
      what: "The skeleton — tells the browser what content exists on the page",
      color: "#e76f51",
    },
    "style.css": {
      what: "The outfit — colors, fonts, spacing, layout. How things look.",
      color: "#2a9d8f",
    },
    "App.jsx": {
      what: "The brain — the logic and interactive behavior of your site",
      color: "#e9c46a",
    },
    "package.json": {
      what: "The shopping list — which pre-built tools your project uses",
      color: "#264653",
    },
  };

  const TreeItem = ({
    name,
    indent,
    isFolder,
    children,
  }: {
    name: string;
    indent: number;
    isFolder?: boolean;
    children?: React.ReactNode;
  }) => {
    const explanation = fileExplanations[name];
    const isHovered = hoveredFile === name;
    return (
      <div>
        <div
          onMouseEnter={() => !isFolder && setHoveredFile(name)}
          onMouseLeave={() => setHoveredFile(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: indent * 20,
            padding: `6px 12px 6px ${indent * 20 + 12}px`,
            borderRadius: 8,
            background: isHovered ? "#f0f9ff" : "transparent",
            cursor: isFolder ? "default" : "pointer",
            transition: "background 0.15s ease",
          }}
        >
          <span style={{ fontSize: 16 }}>{isFolder ? "📁" : "📄"}</span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              color: isFolder ? "#6d28d9" : "#334155",
              fontWeight: isFolder ? 700 : 500,
            }}
          >
            {name}
          </span>
          {explanation && (
            <span
              style={{
                fontSize: 11,
                color: explanation.color,
                fontWeight: 600,
                opacity: isHovered ? 1 : 0.5,
                transition: "opacity 0.15s ease",
                marginLeft: "auto",
              }}
            >
              {isHovered ? "" : "hover me"}
            </span>
          )}
        </div>
        {isHovered && explanation && (
          <div
            style={{
              marginLeft: indent * 20 + 12,
              padding: "8px 14px",
              background: "#f8fafc",
              borderLeft: `3px solid ${explanation.color}`,
              borderRadius: "0 8px 8px 0",
              fontSize: 13,
              color: "#475569",
              lineHeight: 1.5,
              marginBottom: 4,
            }}
          >
            {explanation.what}
          </div>
        )}
        {children}
      </div>
    );
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        padding: "16px 8px",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1,
          padding: "0 12px 10px",
          borderBottom: "1px solid #f1f5f9",
          marginBottom: 8,
        }}
      >
        Your project is just this:
      </div>
      <TreeItem name="my-website" indent={0} isFolder>
        <TreeItem name="index.html" indent={1} />
        <TreeItem name="style.css" indent={1} />
        <TreeItem name="src" indent={1} isFolder>
          <TreeItem name="App.jsx" indent={2} />
        </TreeItem>
        <TreeItem name="package.json" indent={1} />
      </TreeItem>
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "#94a3b8",
          marginTop: 10,
          fontStyle: "italic",
        }}
      >
        {hoveredFile
          ? ""
          : "Hover over a file to see what it does"}
      </div>
    </div>
  );
};

const WebsiteAnatomyDiagram = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const layers = [
    {
      id: "html",
      label: "HTML",
      color: "#e76f51",
      bg: "#fff5f3",
      metaphor: "The skeleton",
      desc: "Defines WHAT is on the page — headings, paragraphs, images, buttons. Like the frame of a house before walls and paint.",
      visual: (
        <div
          style={{
            border: `2px dashed #e76f51`,
            borderRadius: 12,
            padding: 16,
            background: "#fff5f3",
          }}
        >
          <div
            style={{
              height: 14,
              width: "60%",
              background: "#e76f51",
              borderRadius: 4,
              marginBottom: 8,
              opacity: 0.7,
            }}
          />
          <div
            style={{
              height: 8,
              width: "90%",
              background: "#e76f51",
              borderRadius: 4,
              marginBottom: 4,
              opacity: 0.3,
            }}
          />
          <div
            style={{
              height: 8,
              width: "75%",
              background: "#e76f51",
              borderRadius: 4,
              marginBottom: 12,
              opacity: 0.3,
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                height: 40,
                flex: 1,
                border: `1px dashed #e76f51`,
                borderRadius: 6,
                opacity: 0.5,
              }}
            />
            <div
              style={{
                height: 40,
                flex: 1,
                border: `1px dashed #e76f51`,
                borderRadius: 6,
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "css",
      label: "CSS",
      color: "#2a9d8f",
      bg: "#f0fdf9",
      metaphor: "The outfit",
      desc: "Controls HOW things look — colors, fonts, spacing, layout. Same skeleton, totally different vibe depending on the CSS.",
      visual: (
        <div
          style={{
            borderRadius: 12,
            padding: 16,
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
          }}
        >
          <div
            style={{
              height: 14,
              width: "60%",
              background: "linear-gradient(90deg, #2a9d8f, #6ee7b7)",
              borderRadius: 20,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              height: 8,
              width: "90%",
              background: "#475569",
              borderRadius: 4,
              marginBottom: 4,
            }}
          />
          <div
            style={{
              height: 8,
              width: "75%",
              background: "#475569",
              borderRadius: 4,
              marginBottom: 12,
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                height: 40,
                flex: 1,
                background: "linear-gradient(135deg, #1e3a5f, #2a9d8f)",
                borderRadius: 10,
              }}
            />
            <div
              style={{
                height: 40,
                flex: 1,
                background: "linear-gradient(135deg, #1e3a5f, #2a9d8f)",
                borderRadius: 10,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "js",
      label: "JavaScript",
      color: "#e9c46a",
      bg: "#fffbeb",
      metaphor: "The brain",
      desc: "Defines WHAT HAPPENS — when you click a button, when data loads, when something animates. It makes the page interactive.",
      visual: (
        <div
          style={{
            borderRadius: 12,
            padding: 16,
            background: "#fffbeb",
            border: "1px solid #fde68a",
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div
              style={{
                padding: "8px 20px",
                background: "#e9c46a",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                color: "#78350f",
                cursor: "pointer",
              }}
            >
              Click me!
            </div>
            <div
              style={{
                padding: "8px 20px",
                background: "#fde68a",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                color: "#92400e",
              }}
            >
              I respond!
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#92400e",
              fontStyle: "italic",
            }}
          >
            JS makes buttons do things, pages update, content change
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 12,
        }}
      >
        The three layers of every website
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {layers.map((l) => (
          <button
            key={l.id}
            onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
            style={{
              flex: 1,
              padding: "12px 8px",
              borderRadius: 12,
              border:
                activeLayer === l.id
                  ? `2px solid ${l.color}`
                  : "2px solid #e2e8f0",
              background: activeLayer === l.id ? l.bg : "white",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: l.color,
                marginBottom: 2,
              }}
            >
              {l.label}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#94a3b8",
                fontStyle: "italic",
              }}
            >
              {l.metaphor}
            </div>
          </button>
        ))}
      </div>
      {activeLayer && (
        <div>
          {layers
            .filter((l) => l.id === activeLayer)
            .map((l) => (
              <div key={l.id}>
                <div style={{ marginBottom: 12 }}>{l.visual}</div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#475569",
                    lineHeight: 1.7,
                    margin: 0,
                    padding: "0 4px",
                  }}
                >
                  {l.desc}
                </p>
              </div>
            ))}
        </div>
      )}
      {!activeLayer && (
        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#94a3b8",
            padding: 12,
            fontStyle: "italic",
          }}
        >
          Tap a layer to see what it does
        </div>
      )}
    </div>
  );
};

const FrontendBackendVisual = () => (
  <div
    style={{
      display: "flex",
      gap: 0,
      marginBottom: 20,
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid #e2e8f0",
    }}
  >
    <div
      style={{
        flex: 1,
        padding: 20,
        background: "linear-gradient(180deg, #ede9fe, #f5f3ff)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>👁️</div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: "#6d28d9",
          marginBottom: 6,
        }}
      >
        Frontend
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#7c3aed",
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        What people see
      </div>
      <div
        style={{
          marginTop: 12,
          padding: "8px 12px",
          background: "white",
          borderRadius: 8,
          fontSize: 11,
          color: "#64748b",
          lineHeight: 1.6,
        }}
      >
        Buttons, text, colors, layout, animations
      </div>
      <div
        style={{
          marginTop: 8,
          padding: "6px 14px",
          background: "#7c3aed",
          borderRadius: 20,
          fontSize: 11,
          color: "white",
          fontWeight: 700,
          display: "inline-block",
        }}
      >
        Building this today
      </div>
    </div>
    <div
      style={{
        width: 2,
        background: "#e2e8f0",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          background: "white",
          border: "2px solid #e2e8f0",
          borderRadius: "50%",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        ↔
      </div>
    </div>
    <div
      style={{
        flex: 1,
        padding: 20,
        background: "linear-gradient(180deg, #f1f5f9, #f8fafc)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>⚙️</div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: "#475569",
          marginBottom: 6,
        }}
      >
        Backend
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#64748b",
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        The logic behind it
      </div>
      <div
        style={{
          marginTop: 12,
          padding: "8px 12px",
          background: "white",
          borderRadius: 8,
          fontSize: 11,
          color: "#64748b",
          lineHeight: 1.6,
        }}
      >
        Logins, databases, saved data, API calls
      </div>
      <div
        style={{
          marginTop: 8,
          padding: "6px 14px",
          background: "#e2e8f0",
          borderRadius: 20,
          fontSize: 11,
          color: "#64748b",
          fontWeight: 600,
          display: "inline-block",
        }}
      >
        Not needed yet
      </div>
    </div>
  </div>
);

const DeployVisualDiagram = () => (
  <div
    style={{
      background: "#f8fafc",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #e2e8f0",
      marginBottom: 20,
    }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 16,
        textAlign: "center",
      }}
    >
      What "deploying" actually means
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      {/* Your computer */}
      <div style={{ textAlign: "center", flex: 1 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #6366f1, #7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 8px",
            fontSize: 28,
          }}
        >
          💻
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Your computer
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            marginTop: 2,
          }}
        >
          Files live here now
        </div>
      </div>

      {/* Arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div
          style={{
            fontSize: 11,
            color: "#6366f1",
            fontWeight: 700,
            background: "#ede9fe",
            padding: "4px 12px",
            borderRadius: 20,
          }}
        >
          copy
        </div>
        <div style={{ fontSize: 20, color: "#a5b4fc" }}>→</div>
      </div>

      {/* Server */}
      <div style={{ textAlign: "center", flex: 1 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #059669, #10b981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 8px",
            fontSize: 28,
          }}
        >
          ☁️
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          A server
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            marginTop: 2,
          }}
        >
          Always on, on the internet
        </div>
      </div>

      {/* Arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div
          style={{
            fontSize: 11,
            color: "#059669",
            fontWeight: 700,
            background: "#ecfdf5",
            padding: "4px 12px",
            borderRadius: 20,
          }}
        >
          link
        </div>
        <div style={{ fontSize: 20, color: "#6ee7b7" }}>→</div>
      </div>

      {/* Anyone */}
      <div style={{ textAlign: "center", flex: 1 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 8px",
            fontSize: 28,
          }}
        >
          🌍
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Anyone
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            marginTop: 2,
          }}
        >
          Opens your URL
        </div>
      </div>
    </div>
  </div>
);

const LocalhostVisual = () => (
  <div
    style={{
      background: "#f8fafc",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #e2e8f0",
      marginBottom: 20,
    }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 16,
        textAlign: "center",
      }}
    >
      Where your site is right now
    </div>
    <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
      {/* Localhost box */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #1e1b4b, #312e81)",
          borderRadius: 14,
          padding: 20,
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#6366f1",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 12px",
            borderRadius: 20,
          }}
        >
          RIGHT NOW
        </div>
        <div style={{ fontSize: 28, marginBottom: 6, marginTop: 8 }}>💻</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#e0e7ff" }}>
          localhost:5173
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#a5b4fc",
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          Only YOU can see it
          <br />
          Running on your computer
        </div>
      </div>

      {/* After deploy box */}
      <div
        style={{
          flex: 1,
          background: "white",
          borderRadius: 14,
          padding: 20,
          textAlign: "center",
          border: "2px dashed #d1d5db",
          position: "relative",
          opacity: 0.6,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#d1d5db",
            color: "#64748b",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 12px",
            borderRadius: 20,
          }}
        >
          AFTER DEPLOY
        </div>
        <div style={{ fontSize: 28, marginBottom: 6, marginTop: 8 }}>🌍</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#64748b" }}>
          yoursite.netlify.app
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          ANYONE with the link
          <br />
          Running on a server
        </div>
      </div>
    </div>
    <div
      style={{
        textAlign: "center",
        marginTop: 14,
        fontSize: 12,
        color: "#94a3b8",
      }}
    >
      Same files. Same site. Different location.
    </div>
  </div>
);

const VibeLoopVisual = () => {
  const steps = [
    { icon: "💬", label: "Describe", desc: "Tell Claude what you want" },
    { icon: "⚡", label: "Generate", desc: "Claude writes the code" },
    { icon: "👀", label: "Review", desc: "See the result in your browser" },
    { icon: "🔄", label: "Iterate", desc: "Ask for changes" },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e1b4b, #312e81)",
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#a5b4fc",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        The vibe coding loop
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div
              style={{
                textAlign: "center",
                minWidth: 72,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 6px",
                  fontSize: 22,
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#e0e7ff",
                  marginBottom: 2,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#a5b4fc",
                  lineHeight: 1.4,
                }}
              >
                {s.desc}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#6366f1",
                  fontSize: 16,
                  paddingTop: 8,
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          fontSize: 11,
          color: "#818cf8",
          fontStyle: "italic",
        }}
      >
        ↻ Repeat until it's exactly what you want
      </div>
    </div>
  );
};

const PromptBuildingVisual = () => {
  const layers = [
    {
      label: "WHO",
      q: "is this for?",
      example: "Anyone I share the link with",
      color: "#6366f1",
      bg: "#ede9fe",
    },
    {
      label: "WHY",
      q: "does it need to exist?",
      example: "A professional intro to who I am",
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      label: "WHERE",
      q: "will it live?",
      example: "On the internet, with a real URL",
      color: "#0284c7",
      bg: "#f0f9ff",
    },
    {
      label: "HOW GOOD",
      q: "does it need to be?",
      example: '"Wait, you made that?" impressive',
      color: "#dc2626",
      bg: "#fef2f2",
    },
  ];

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        padding: "20px 16px",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        The prompt-building framework
      </div>
      {layers.map((l, i) => (
        <div
          key={l.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: i < layers.length - 1 ? 8 : 0,
          }}
        >
          <div
            style={{
              background: l.color,
              color: "white",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              fontWeight: 800,
              minWidth: 60,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {l.label}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#475569",
              flex: 1,
            }}
          >
            {l.q}
          </div>
          <div
            style={{
              background: l.bg,
              padding: "5px 10px",
              borderRadius: 6,
              fontSize: 11,
              color: l.color,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {l.example}
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 16,
          padding: "10px 14px",
          background: "#f8fafc",
          borderRadius: 10,
          fontSize: 12,
          color: "#64748b",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Answer these before telling Claude <strong>WHAT</strong> to build.
        <br />
        Same thinking a good consultant does — you already know how.
      </div>
    </div>
  );
};

/* ─── Shared Components ─────────────────────────────────────────── */

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? "#059669" : "#6366f1",
        color: "white",
        border: "none",
        borderRadius: 8,
        padding: "10px 20px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.2s ease",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {copied ? "Copied to clipboard!" : "Copy this prompt"}
    </button>
  );
};

const ExpandableCard = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        marginBottom: 12,
        overflow: "hidden",
        background: "white",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "14px 18px",
          background: "none",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 600,
          color: "#1e293b",
          textAlign: "left",
        }}
      >
        {title}
        <span
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 18px 16px",
            color: "#475569",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const PromptBlock = ({ prompt }: { prompt: string }) => (
  <div style={{ marginTop: 16, marginBottom: 8 }}>
    <div
      style={{
        background: "#1e1b4b",
        color: "#c7d2fe",
        borderRadius: 12,
        padding: 20,
        fontSize: 14,
        lineHeight: 1.7,
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        marginBottom: 12,
      }}
    >
      {prompt}
    </div>
    <CopyButton text={prompt} />
  </div>
);

/* ─── Main Component ────────────────────────────────────────────── */

export default function VibeCodingGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedPermission, setExpandedPermission] =
    useState<PermissionKey | null>(null);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const buildPrompt = () => {
    const name = userName || "[Your Name]";
    const role = userRole || "[Your Title / What You Do]";
    return `I want to build a personal landing page — a single-page website that introduces me and what I do. Here's my info:

Name: ${name}
Role: ${role}

I want it to feel modern, clean, and professional — something I'd be proud to share. Think a tasteful gradient background, clean typography, and maybe a subtle animation or two.

Include:
- A hero section with my name and title
- A short "about me" section (use placeholder text I can edit later)
- 3 cards for things I work on or care about (placeholder content is fine)
- A footer with a way to contact me

Use a modern tech stack — React with Vite is great. Keep it a single page. Make it look really good. I want to be able to show this to people and have them say "wait, you made that?"`;
  };

  const iterationPrompts = [
    "Change the color scheme to dark mode with an accent color of electric blue.",
    "Add a smooth scroll animation when the page loads — I want each section to fade in as the user scrolls down.",
    "Replace the placeholder text in the about section with this: [paste your own text]",
    "Make it look more playful and less corporate. Rounder corners, a friendlier font, maybe a subtle pattern in the background.",
  ];

  const renderStepContent = () => {
    switch (step.id) {
      case "welcome":
        return (
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 20,
              }}
            >
              In the next few minutes, you're going to build a personal website
              and put it on the internet. No prior coding experience needed.
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 24,
              }}
            >
              You'll do it by having a conversation with Claude — describing
              what you want in plain English, and letting the AI write the code.
              This is called <strong>vibe coding</strong>.
            </p>

            {/* Visual: How this works diagram */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 16,
                padding: 20,
                border: "1px solid #e2e8f0",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                How this guide works
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
                <div
                  style={{
                    flex: 1,
                    background: "white",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>💬</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#334155",
                      marginBottom: 4,
                    }}
                  >
                    Chat (left)
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}
                  >
                    Talk to Claude here. Paste prompts, ask questions.
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 16,
                    color: "#cbd5e1",
                  }}
                >
                  ↔
                </div>
                <div
                  style={{
                    flex: 1,
                    background:
                      "linear-gradient(135deg, #ede9fe, #f5f3ff)",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                    border: "2px solid #7c3aed",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>📖</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#6d28d9",
                      marginBottom: 4,
                    }}
                  >
                    This guide (right)
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#7c3aed", lineHeight: 1.5 }}
                  >
                    Follow along here. It explains what's happening.
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>
              By the end, you'll have a live website with a link you can text to
              someone. And you'll understand what actually happened — no magic,
              no mystery.
            </p>
          </div>
        );

      case "demystify":
        return (
          <div>
            <div
              style={{
                background: "#1e1b4b",
                borderRadius: 16,
                padding: 28,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#e0e7ff",
                  margin: "0 0 8px 0",
                }}
              >
                Code is just files and folders.
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#a5b4fc",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                Text files on your computer that act as instructions telling
                your computer what to do.
              </p>
            </div>

            {/* Interactive file tree */}
            <FolderTree />

            {/* Three layers of a website */}
            <WebsiteAnatomyDiagram />

            {/* Frontend vs Backend */}
            <FrontendBackendVisual />

            {/* Deploy visual */}
            <DeployVisualDiagram />

            <p
              style={{
                fontSize: 14,
                color: "#64748b",
                lineHeight: 1.7,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              That's it. No mystery. When Claude "writes code," it's creating
              text files in a folder. When you "deploy," you're copying those
              files to the internet.
            </p>
          </div>
        );

      case "plan":
        return (
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 20,
              }}
            >
              The biggest mistake people make with vibe coding is jumping
              straight to "build me a thing." The best results come from
              thinking like a product manager first.
            </p>

            {/* Visual prompt-building framework */}
            <PromptBuildingVisual />

            <div
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: 12,
                }}
              >
                For today's project, we've already answered:
              </div>
              <div style={{ fontSize: 14, color: "#475569", lineHeight: 2 }}>
                <strong>What:</strong> A personal landing page / website
                <br />
                <strong>Who:</strong> Anyone you share the link with
                <br />
                <strong>Why:</strong> A shareable, professional intro to who you
                are
                <br />
                <strong>Where:</strong> On the internet, with a real URL
                <br />
                <strong>How good:</strong> Impressive enough that people say
                "wait, you made that?"
              </div>
            </div>
          </div>
        );

      case "prompt":
        return (
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 12,
              }}
            >
              First, personalize your page. Then copy the prompt below and paste
              it into your Claude Code chat.
            </p>
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #e2e8f0",
                marginBottom: 20,
              }}
            >
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#64748b",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Your name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Sarah Chen"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    fontSize: 15,
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#64748b",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Your role / what you do
                </label>
                <input
                  type="text"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  placeholder="e.g. Marketing Director at Acme Corp"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    fontSize: 15,
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
            <PromptBlock prompt={buildPrompt()} />
            <div
              style={{
                background: "#fffbeb",
                borderLeft: "4px solid #f59e0b",
                padding: "14px 18px",
                borderRadius: "0 12px 12px 0",
                marginTop: 20,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: "#92400e",
                  fontWeight: 600,
                  margin: "0 0 6px 0",
                }}
              >
                What happens next
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#78716c",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                Claude will start creating files and may ask you a few questions
                about your preferences. It'll also ask for permission to do
                things — that's the next step in this guide.
              </p>
            </div>
          </div>
        );

      case "permissions":
        return (
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 8,
              }}
            >
              Claude will ask permission before doing certain things. This is a
              safety feature, not a warning sign.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                marginBottom: 20,
                lineHeight: 1.7,
              }}
            >
              Tap any to expand and see what it really means.
            </p>
            {(Object.keys(PERMISSIONS) as PermissionKey[]).map((key) => {
              const p = PERMISSIONS[key];
              const isOpen = expandedPermission === key;
              return (
                <div
                  key={key}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    marginBottom: 10,
                    overflow: "hidden",
                    background: isOpen ? "#faf5ff" : "white",
                    transition: "background 0.2s ease",
                  }}
                >
                  <button
                    onClick={() =>
                      setExpandedPermission(isOpen ? null : key)
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <code
                      style={{
                        fontSize: 13,
                        color: "#7c3aed",
                        fontWeight: 600,
                        background: "#ede9fe",
                        padding: "4px 10px",
                        borderRadius: 6,
                        flex: 1,
                      }}
                    >
                      {p.scary}
                    </code>
                    <span
                      style={{
                        transform: isOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        fontSize: 12,
                        color: "#94a3b8",
                        flexShrink: 0,
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 16px 14px" }}>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#475569",
                          lineHeight: 1.7,
                          margin: "0 0 12px 0",
                        }}
                      >
                        {p.simple}
                      </p>
                      <div
                        style={{
                          background: "#ecfdf5",
                          borderRadius: 8,
                          padding: "10px 14px",
                          fontSize: 14,
                          color: "#065f46",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>✅</span>
                        {p.verdict}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div
              style={{
                background: "#f0f9ff",
                borderLeft: "4px solid #0284c7",
                padding: "14px 18px",
                borderRadius: "0 12px 12px 0",
                marginTop: 20,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: "#0c4a6e",
                  fontWeight: 600,
                  margin: "0 0 6px 0",
                }}
              >
                Pro tip
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#475569",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                If you see something not listed here and you're not sure, ask
                Claude: "Can you explain what this does in simple terms before I
                approve it?"
              </p>
            </div>
          </div>
        );

      case "localhost":
        return (
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 20,
              }}
            >
              Once Claude finishes building, it'll start a "dev server" and give
              you a link. Here's what that means:
            </p>

            {/* Visual: localhost vs deployed */}
            <LocalhostVisual />

            <ExpandableCard title="What is a dev server?" defaultOpen={false}>
              <p style={{ margin: 0 }}>
                A tiny program that turns your code files into a working website
                and shows it in your browser. It also watches for changes —
                when Claude edits a file, the page updates automatically. This
                is only for development. When you deploy later, the real version
                won't need this.
              </p>
            </ExpandableCard>

            <ExpandableCard title='What does "port 5173" mean?'>
              <p style={{ margin: 0 }}>
                Your computer has thousands of numbered "doors" (ports). The dev
                server picks one to use — usually 5173 for Vite projects. It's
                like an apartment number: the building is your computer, the
                port is which door to knock on.
              </p>
            </ExpandableCard>

            <div
              style={{
                background: "#f0fdf4",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #bbf7d0",
                marginTop: 16,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#15803d",
                  margin: "0 0 8px 0",
                }}
              >
                Open that link in your browser.
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#475569",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                You should see your landing page. Take a second — you built
                that. With a conversation.
              </p>
            </div>
          </div>
        );

      case "iterate":
        return (
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 20,
              }}
            >
              Now comes the best part. You can change anything by just asking.
            </p>

            {/* Visual: The vibe coding loop */}
            <VibeLoopVisual />

            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                marginBottom: 16,
                lineHeight: 1.7,
              }}
            >
              Try any of these — or make up your own. Just type it in the chat.
            </p>
            {iterationPrompts.map((prompt, i) => (
              <div
                key={i}
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: "14px 18px",
                  marginBottom: 10,
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "#334155",
                    margin: 0,
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  "{prompt}"
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(prompt)}
                  style={{
                    background: "#ede9fe",
                    color: "#6d28d9",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        );

      case "deploy":
        return (
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "#334155",
                marginBottom: 20,
              }}
            >
              Your site is running on your computer. Now let's put it on the
              internet.
            </p>

            {/* Reuse the deploy visual */}
            <DeployVisualDiagram />

            <p
              style={{
                fontSize: 15,
                color: "#475569",
                margin: "0 0 12px",
                lineHeight: 1.7,
              }}
            >
              Ask Claude to deploy it for you:
            </p>
            <PromptBlock
              prompt={`I'm happy with how this looks. Can you help me deploy it so I can share the link? Use Netlify — set it up so I can deploy with a simple command. Walk me through any accounts I need to create.`}
            />
            <ExpandableCard title="What Claude will do">
              <ol
                style={{ margin: 0, paddingLeft: 20, lineHeight: 2 }}
              >
                <li>
                  Build a production version of your site (optimized files)
                </li>
                <li>
                  Guide you through creating a free Netlify account if needed
                </li>
                <li>Deploy your files to Netlify's servers</li>
                <li>
                  Give you a URL like{" "}
                  <code>your-site-name.netlify.app</code>
                </li>
              </ol>
            </ExpandableCard>
            <div
              style={{
                background: "#f0fdf4",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #bbf7d0",
                marginTop: 16,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#15803d",
                  margin: "0 0 8px 0",
                }}
              >
                Once it's deployed, copy that link.
              </p>
              <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>
                Text it to someone. "Hey, I made this." That's the moment.
              </p>
            </div>
          </div>
        );

      case "done":
        return (
          <div>
            <div
              style={{
                background: "linear-gradient(135deg, #1e1b4b, #312e81)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>🎊</div>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#e0e7ff",
                  margin: "0 0 8px 0",
                }}
              >
                You just built software.
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "#a5b4fc",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                You described what you wanted. AI wrote the code. You iterated.
                You deployed. That's the whole process.
              </p>
            </div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: 16,
              }}
            >
              What you actually learned:
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                {
                  icon: "📁",
                  text: "Code is files and folders — text files that are instructions for computers.",
                },
                {
                  icon: "🌐",
                  text: "A website is a collection of these files that a browser knows how to display.",
                },
                {
                  icon: "👁️",
                  text: "Frontend is what people see. Backend is the logic behind it.",
                },
                {
                  icon: "💻",
                  text: "Localhost = your computer. Deploying = putting files on the internet.",
                },
                {
                  icon: "📦",
                  text: "Packages are pre-built tools — like apps for your code project.",
                },
                {
                  icon: "🔄",
                  text: "The vibe coding loop: describe → generate → review → iterate.",
                },
                {
                  icon: "🎯",
                  text: "Good prompts start with WHO and WHY, not just WHAT.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom:
                      i < 6 ? "1px solid #f1f5f9" : "none",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: 12,
              }}
            >
              What to build next:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 20,
              }}
            >
              {[
                {
                  icon: "🛠️",
                  title: "A team tool",
                  desc: "Solve a real workflow problem",
                },
                {
                  icon: "🧮",
                  title: "A calculator",
                  desc: "Specific to your domain",
                },
                {
                  icon: "📊",
                  title: "A dashboard",
                  desc: "Visualize data that matters",
                },
                {
                  icon: "💼",
                  title: "An internal app",
                  desc: "Something your company needs",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#f8fafc",
                    borderRadius: 12,
                    padding: 16,
                    border: "1px solid #e2e8f0",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#334155",
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.4 }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                lineHeight: 1.7,
                textAlign: "center",
              }}
            >
              The gap between "person with ideas" and "person who builds things"
              just got a lot smaller.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: 560,
        margin: "0 auto",
        padding: "20px 16px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          background: "#f1f5f9",
          borderRadius: 100,
          height: 6,
          marginBottom: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #6366f1, #7c3aed)",
            height: "100%",
            width: `${progress}%`,
            borderRadius: 100,
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 28,
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        <span>
          Step {currentStep + 1} of {STEPS.length}
        </span>
        <span>{step.title}</span>
      </div>

      {/* Step header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 6px 0",
            letterSpacing: -0.5,
          }}
        >
          {step.title}
        </h1>
        <p style={{ fontSize: 16, color: "#64748b", margin: 0 }}>
          {step.subtitle}
        </p>
      </div>

      {/* Step content */}
      <div style={{ marginBottom: 32 }}>{renderStepContent()}</div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: 12,
          paddingTop: 20,
          borderTop: "1px solid #f1f5f9",
        }}
      >
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              background: "white",
              color: "#64748b",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back
          </button>
        )}
        {currentStep < STEPS.length - 1 && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            style={{
              flex: 2,
              padding: "14px 20px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {currentStep === 0 ? "Let's go" : "Next step"}
          </button>
        )}
      </div>

      {/* Step dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 20,
        }}
      >
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            style={{
              width: i === currentStep ? 24 : 8,
              height: 8,
              borderRadius: 100,
              border: "none",
              background:
                i === currentStep
                  ? "#6366f1"
                  : i < currentStep
                  ? "#a5b4fc"
                  : "#e2e8f0",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
