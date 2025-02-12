// src/config/permissions.js
import { UserRole } from "@/types/User";

export interface RolePermissions {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    viewGlobalMetrics?: boolean;
    viewDepartmentMetrics?: boolean;
    viewSectorMetrics?: boolean;
    viewLimitedData?: boolean;
}

const permissions: Record<UserRole, RolePermissions> = {
    admin: {
        canCreate: true,
        canEdit: true,
        canDelete: true,
        viewGlobalMetrics: true,
    },
    managerGeafi: {
        canCreate: true,
        canEdit: true,
        canDelete: true,
        viewGlobalMetrics: true,
    },
    managerGerop: {
        canCreate: true,
        canEdit: true,
        canDelete: false,
        viewDepartmentMetrics: true,
    },
    managerGemkt: {
        canCreate: true,
        canEdit: true,
        canDelete: false,
        viewDepartmentMetrics: true,
    },
    supervisor: {
        canCreate: false,
        canEdit: true,
        canDelete: false,
        viewSectorMetrics: true,
    },
    user: {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        viewLimitedData: true,
    },
};

export default permissions; 