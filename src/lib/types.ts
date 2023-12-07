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
    availablePackageRef: InstallPackageSummaryItem["installedPackageRef"];
    installedPackageRef: InstallPackageSummaryItem["installedPackageRef"];
    currentVersion: InstallPackageSummaryItem["currentVersion"];
    customDetail: {
      "@type": string;
      releaseRevision: number;
    };
    latestVersion: InstallPackageSummaryItem["latestVersion"];
    pkgVersionReference: InstallPackageSummaryItem["pkgVersionReference"];
    name: string;
    postInstallationNotes: string;
    status: InstallPackageSummaryItem["status"];
    valuesApplied: string;
  };
};
