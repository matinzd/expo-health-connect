package expo.modules.healthconnect

import android.content.Context
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityHandler

class HealthConnectPackage: Package {
    override fun createReactActivityHandlers(activityContext: Context?): MutableList<out ReactActivityHandler> {
        return mutableListOf(HeatlhConnectPermissionReactActivityHandler())
    }
}