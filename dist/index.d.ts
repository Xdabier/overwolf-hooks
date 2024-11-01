/// <reference types="@overwolf/types" />
interface UseGameEventProviderEventsDelegate {
    onInfoUpdates(info: overwolf.games.events.InfoUpdates2Event | overwolf.games.InstalledGameInfo): void;
    onNewEvents(events: overwolf.games.events.NewGameEvents): void;
}
declare function useGameEventProvider(delegate: UseGameEventProviderEventsDelegate, requiredFeatures: Array<string>, featureRetries?: number, displayLog?: boolean): {
    readonly started: boolean;
    readonly start: () => Promise<void>;
    readonly stop: () => void;
};

interface UseRunningGamePayload {
    gameRunning: boolean;
    id: number;
    title: string;
    gameChanged: boolean;
    isInFocus: boolean;
}
declare const useRunningGame: (shouldDisplayLog?: boolean) => UseRunningGamePayload | null;

type UseWindow = (name: string, shouldDisplayLog?: boolean, listenToWindowStateChanges?: boolean) => [
    (overwolf.windows.WindowInfo & WindowBehavior) | undefined,
    overwolf.windows.WindowStateChangedEvent | undefined,
    () => Promise<void>
];
declare const useWindow: UseWindow;

declare const useDrag: (currentWindowID: string | null, shouldDisplayLog?: boolean) => {
    readonly setCurrentWindowID: (id: string) => void;
    readonly onDragStart: ({ clientX, clientY, }: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    readonly onMouseMove: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export { type UseRunningGamePayload, useDrag, useGameEventProvider, useRunningGame, useWindow };
