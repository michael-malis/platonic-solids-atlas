import { Component, lazy, Suspense, type ReactNode } from "react";
import type { SolidKey } from "../lib/solid-data";
import type { AtlasCopy } from "../atlas-copy";

export type SceneProps = {
  kind: "solid" | "dual";
  solidKey: SolidKey;
  active: boolean;
  mode?: "solid" | "glass" | "wire";
  showFaces?: boolean;
  showEdges?: boolean;
  showVertices?: boolean;
  progress?: number;
};

const Scene = lazy(() => import("./platonic-scene"));

class SceneBoundary extends Component<{ children: ReactNode; copy: AtlasCopy["scene"]; retry: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div className="scene-placeholder" role="alert"><p>{this.props.copy.error}</p><button type="button" onClick={this.props.retry}>{this.props.copy.retry}</button></div> : this.props.children;
  }
}

export function DeferredScene({ ready, copy, ...props }: SceneProps & { ready: boolean; copy: AtlasCopy["scene"] }) {
  const loading = <div className="scene-placeholder" role="status">{copy.loading}</div>;
  // Reload clears the browser's cached failed dynamic import as well as the boundary.
  return <div className="scene-host"><SceneBoundary copy={copy} retry={() => window.location.reload()}><Suspense fallback={loading}>{ready ? <Scene {...props} /> : loading}</Suspense></SceneBoundary></div>;
}
