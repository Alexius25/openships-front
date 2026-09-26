import { MapGLStyleSwitcher } from "map-gl-style-switcher/react-map-gl";
import { ScaleControl, NavigationControl } from "react-map-gl/maplibre";
import { mapStyles } from "@/lib/map-styles";

type Props = {
    mapStyle: string;
    activeStyleId?: string;
    onStyleChange: (styleUrl: string) => void;
    unit: "metric" | "imperial" | "nautical";
    mounted: boolean;
    resolvedTheme?: string;
};

export default function MainMapControls({
    mapStyle,
    activeStyleId,
    onStyleChange,
    unit,
    mounted,
    resolvedTheme,
}: Props) {
    const switcherTheme =
        mounted && resolvedTheme === "dark" ? "dark" : "light";
    const isDark = mounted && resolvedTheme === "dark";

    return (
        <>
            {mounted && (
                <MapGLStyleSwitcher
                    key={switcherTheme}
                    styles={mapStyles}
                    activeStyleId={activeStyleId}
                    theme={switcherTheme}
                    showLabels={true}
                    showImages={true}
                    position="top-right"
                    onStyleChange={onStyleChange}
                />
            )}
            <ScaleControl
                position="bottom-right"
                unit={unit}
                maxWidth={200}
                style={{
                    backgroundColor: isDark
                        ? "rgba(0, 0, 0, 0.8)"
                        : "rgba(255, 255, 255, 0.8)",
                    padding: "4px",
                    border: isDark ? "1px solid #444" : "1px solid #ccc",
                    borderRadius: "4px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: isDark ? "#fff" : "#000",
                }}
            />
            <NavigationControl
                position="bottom-right"
                showCompass={false}
                style={{
                    marginBottom: "30px",
                    backgroundColor: isDark
                        ? "rgba(0, 0, 0, 0.8)"
                        : "rgba(255, 255, 255, 0.8)",
                    padding: "4px",
                    borderRadius: "4px",
                    border: isDark ? "1px solid #444" : "1px solid #ccc",
                    color: isDark ? "#fff" : "#000",
                }}
            />
        </>
    );
}
