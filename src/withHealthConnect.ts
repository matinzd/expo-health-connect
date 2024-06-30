import {
  AndroidConfig,
  ConfigPlugin,
  createRunOncePlugin,
  withAndroidManifest,
} from "@expo/config-plugins";

const pkg = require("../package.json");

const { getMainActivityOrThrow, getMainApplicationOrThrow } =
  AndroidConfig.Manifest;

const hasIntentFilter = (
  androidName: string,
  intentFilters: AndroidConfig.Manifest.ManifestIntentFilter[]
) => {
  return intentFilters.some((intentFilter) => {
    return intentFilter.action?.some((action) => {
      return action.$["android:name"] === androidName;
    });
  });
};

type ManifestActivityAlias = AndroidConfig.Manifest.ManifestIntentFilter[];

const hasActivityAlias = (
  androidName: string,
  activityAliases: ManifestActivityAlias
) => {
  return activityAliases.some((activityAlias) => {
    // @ts-ignore - Expo does not have types for activity-alias
    return activityAlias.$["android:name"] === androidName;
  });
};

const withHealthConnect: ConfigPlugin = (config) => {
  // 1 - Add the permissions rationale activity to the AndroidManifest.xml
  config = withAndroidManifest(config, async (config) => {
    const mainApplication = getMainApplicationOrThrow(config.modResults);
    const mainActivity = getMainActivityOrThrow(config.modResults);

    // For supported versions through Android 13, create an activity to show the rationale
    // of Health Connect permissions once users click the privacy policy link.
    const intentFilters = mainActivity["intent-filter"];

    if (!mainActivity["intent-filter"]) {
      mainActivity["intent-filter"] = [];
    }

    // Check if the intent filter already exists
    if (
      intentFilters &&
      !hasIntentFilter(
        "androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE",
        intentFilters,
      )
    ) {
      intentFilters?.push({
        action: [
          {
            $: {
              "android:name":
                "androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE",
            },
          },
        ],
      });
    }

    const targetActivity = mainActivity.$["android:name"];

    // For versions starting Android 14, create an activity alias to show the rationale
    // of Health Connect permissions once users click the privacy policy link.
    // @ts-ignore - Expo does not have types for security-alias
    if (!("activity-alias" in mainApplication)) {
      // @ts-ignore - Expo does not have types for security-alias
      mainApplication["activity-alias"] = [];
    }

    // @ts-ignore - Expo does not have types for security-alias
    const activityAliases = mainApplication["activity-alias"];

    if (!hasActivityAlias("ViewPermissionUsageActivity", activityAliases)) {
      activityAliases.push({
        $: {
          "android:name": "ViewPermissionUsageActivity",
          "android:exported": "true",
          "android:targetActivity": targetActivity,
          "android:permission":
            "android.permission.START_VIEW_PERMISSION_USAGE",
        },
        "intent-filter": [
          {
            action: [
              {
                $: {
                  "android:name": "android.intent.action.VIEW_PERMISSION_USAGE",
                },
              },
            ],
            category: [
              {
                $: {
                  "android:name": "android.intent.category.HEALTH_PERMISSIONS",
                },
              },
            ],
          },
        ],
      });
    }

    return config;
  });

  return config;
};

export default createRunOncePlugin(withHealthConnect, pkg.name, pkg.version);
