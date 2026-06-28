import type { CommunicationVersion } from "../../models/CommunicationVersion";

export interface VersionHistoryProps {
    versions: CommunicationVersion[];
    onSelectVersion: (id: number) => void;
}