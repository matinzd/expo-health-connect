<div align="center">
  <img src="https://developer.android.com/static/guide/health-and-fitness/health-connect/images/health_connect_logo_192pxnew.png" />
  <div align="center">
    <h1>Expo Health Connect</h1>
  </div>
  <div align="center">
    <a href="https://www.npmjs.com/package/react-native-health-connect">
      <img src="https://img.shields.io/npm/v/react-native-health-connect.svg?style=for-the-badge&color=4284F3" />
    </a>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
    </a>
  </div>
</div>

---

> [!IMPORTANT]
> **This package is deprecated and this repository is archived.**
>
> Everything it did now ships inside
> [`react-native-health-connect`](https://github.com/matinzd/react-native-health-connect)
> as of v4 — both the config plugin and the Expo module that registers the permission
> delegate. There is no longer a second package to install.

## Migrating

1. Remove this package:

   ```sh
   npm uninstall expo-health-connect
   ```

2. In your `app.json` `plugins` array, replace `"expo-health-connect"` with
   `"react-native-health-connect"`:

   ```json
   {
     "expo": {
       "plugins": ["react-native-health-connect"]
     }
   }
   ```

3. Re-run prebuild:

   ```sh
   npx expo prebuild --clean
   ```

If you leave this package installed alongside `react-native-health-connect` v4, the Android
build fails with a duplicate `expo.modules.healthconnect.HealthConnectPackage` class — both
packages contribute the same Kotlin class. Removing this one resolves it.

See the [Expo installation guide](https://matinzd.github.io/react-native-health-connect/docs/get-started#expo-installation)
for the current setup instructions.

---

# About

This Expo Config plugin auto configures the [React Native Health Connect SDK](https://github.com/matinzd/react-native-health-connect) when the native code is generated (expo prebuild). See the [documentation](https://matinzd.github.io/react-native-health-connect) for details on setup and configuration options.

# Contributing

This repository is archived and no longer accepts contributions. Please open issues and pull
requests on [react-native-health-connect](https://github.com/matinzd/react-native-health-connect)
instead.
