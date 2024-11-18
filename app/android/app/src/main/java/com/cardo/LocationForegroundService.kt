import android.app.Service
import android.app.Notification
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.cardo.R
import android.os.Build
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent


class LocationForegroundService : Service() {

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel() // 서비스 시작 시 채널 생성 확인 및 생성
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForegroundServiceNotification()
        // 위치 업데이트 또는 다른 작업 시작
        return START_STICKY
    }

    private fun startForegroundServiceNotification() {
        val notification: Notification = NotificationCompat.Builder(this, "foreground_service_channel")
            .setContentTitle("Location Service")
            .setContentText("Tracking your location in the background")
            .setSmallIcon(R.drawable.ic_launcher) // 앱 아이콘 설정
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()

        // 포그라운드 서비스 시작
        startForeground(1, notification)
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "foreground_service_channel",
                "Foreground Service Channel",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Channel for foreground location service"
            }

            val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(channel)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
