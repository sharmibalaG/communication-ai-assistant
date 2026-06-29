import type { CommunicationVersion } from "../../models/CommunicationVersion";

export interface VersionHistoryProps {
    versions: CommunicationVersion[];
    currentVersionId: number;
    onSelectVersion: (id: number) => void;
}