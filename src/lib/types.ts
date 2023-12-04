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
