package vn.jbai.kidstar;

import com.getcapacitor.BridgeActivity;

import android.webkit.WebSettings;

public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();
        if (bridge != null && bridge.getWebView() != null) {
            WebSettings settings = bridge.getWebView().getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);
        }
    }
}
