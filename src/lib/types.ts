export type InstallPackageSummaryItem = {
  name: string;
  pkgDisplayName: string;
  shortDescription: string;
  status: {
    ready: boolean;
    reason: string;
    userReason: string;
  };
  pkgVersionReference: {
    version: string;
  };
  iconUrl: string;
  latestVersion: {
    appVersion: string;
    pkgVersion: string;
  };
  currentVersion: {
    appVersion: string;
    pkgVersion: string;
  };
  installedPackageRef: {
    identifier: string;
    context: {
      cluster: string;
      namespace: string;
    };
    plugin: {
      name: string;
      version: string;
    };
  };
};

export type InstalledPackageDetail = {
  installedPackageDetail: {
    availablePackageRef: Pick<InstallPackageSummaryItem, "installedPackageRef">;
    installedPackageRef: Pick<InstallPackageSummaryItem, "installedPackageRef">;
    currentVersion: Pick<InstallPackageSummaryItem, "currentVersion">;
    customDetail: {
      "@type": string;
      releaseRevision: number;
    };
    latestVersion: Pick<InstallPackageSummaryItem, "latestVersion">;
    pkgVersionReference: Pick<InstallPackageSummaryItem, "pkgVersionReference">;
    name: string;
    postInstallationNotes: string;
    status: Pick<InstallPackageSummaryItem, "status">;
    valuesApplied: string;
  };
};
