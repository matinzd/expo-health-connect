import {
  AndroidConfig,
  ConfigPlugin,
  createRunOncePlugin,
  withAndroidManifest,
} from "@expo/config-plugins";

const pkg = require("../package.json");

const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

const withHealthConnect: ConfigPlugin = (config) => {
  // 1 - Add the permissions rationale activity to the AndroidManifest.xml
  config = withAndroidManifest(config, async (config) => {
    const application = getMainApplicationOrThrow(config.modResults);

    if (!application) {
      console.warn(
        "[Health Connect] No Application found in AndroidManifest.xml."
      );
      console.warn("[Health Connect] You need to setup the library manually.");
      return config;
    }

    if (!application.activity) {
      console.warn(
        "[Health Connect] No Activity found in AndroidManifest.xml."
      );
      console.warn("[Health Connect] You need to setup the library manually.");
      return config;
    }

    // For supported versions through Android 13, create an activity to show the rationale
    // of Health Connect permissions once users click the privacy policy link.
    const inntentFilters = application.activity[0]["intent-filter"];
    inntentFilters?.push({
      action: [
        {
          $: {
            "android:name": "androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE",
          },
        },
      ],
    });

    const targetActivity = application.activity[0].$["android:name"];

    // For versions starting Android 14, create an activity alias to show the rationale
    // of Health Connect permissions once users click the privacy policy link.
    // @ts-ignore - Expo does not have types for security-alias
    if (!application["activity-alias"]) application["activity-alias"] = [];

    // @ts-ignore
    const activityAliases = application["activity-alias"];
    activityAliases.push({
      $: {
        "android:name": "ViewPermissionUsageActivity",
        "android:exported": "true",
        "android:targetActivity": targetActivity,
        "android:permission": "android.permission.START_VIEW_PERMISSION_USAGE",
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

    return config;
  });

  return config;
};

export default createRunOncePlugin(withHealthConnect, pkg.name, pkg.version);
