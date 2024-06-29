package expo.modules.healthconnect

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import dev.matinzd.healthconnect.permissions.HealthConnectPermissionDelegate
import expo.modules.core.interfaces.ReactActivityHandler

class HeatlhConnectPermissionReactActivityHandler: ReactActivityHandler {
    override fun onDidCreateReactActivityDelegate(activity: ReactActivity?, delegate: ReactActivityDelegate?): ReactActivityDelegate? {
        activity?.let { HealthConnectPermissionDelegate.setPermissionDelegate(it) }
        return super.onDidCreateReactActivityDelegate(activity, delegate)
    }
}