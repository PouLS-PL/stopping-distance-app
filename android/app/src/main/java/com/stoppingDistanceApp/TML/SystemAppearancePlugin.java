package com.stoppingDistanceApp.TML;

import android.graphics.Color;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowInsetsController;

import androidx.appcompat.app.AppCompatDelegate;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SystemAppearance")
public class SystemAppearancePlugin extends Plugin {
    @PluginMethod
    public void setTheme(PluginCall call) {
        Boolean dark = call.getBoolean("dark");
        String statusBarColor = call.getString("statusBarColor");
        String navigationBarColor = call.getString("navigationBarColor");

        if (dark == null || statusBarColor == null || navigationBarColor == null) {
            call.reject("Theme mode and system bar colors are required.");
            return;
        }

        final int statusColor;
        final int navigationColor;
        try {
            statusColor = Color.parseColor(statusBarColor);
            navigationColor = Color.parseColor(navigationBarColor);
        } catch (IllegalArgumentException error) {
            call.reject("Invalid system bar color.", error);
            return;
        }

        getActivity().runOnUiThread(() -> {
            getActivity()
                .getDelegate()
                .setLocalNightMode(dark ? AppCompatDelegate.MODE_NIGHT_YES : AppCompatDelegate.MODE_NIGHT_NO);

            Window window = getActivity().getWindow();
            window.setStatusBarColor(statusColor);
            window.setNavigationBarColor(navigationColor);
            window.getDecorView().setBackgroundColor(navigationColor);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                window.setStatusBarContrastEnforced(false);
                window.setNavigationBarContrastEnforced(false);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                WindowInsetsController controller = window.getInsetsController();
                if (controller != null) {
                    int lightSystemBars =
                        WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                            | WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
                    controller.setSystemBarsAppearance(
                        dark ? 0 : lightSystemBars,
                        lightSystemBars
                    );
                }
            } else {
                int systemUiVisibility = window.getDecorView().getSystemUiVisibility();
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    if (dark) {
                        systemUiVisibility &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                    } else {
                        systemUiVisibility |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                    }
                }
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    if (dark) {
                        systemUiVisibility &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                    } else {
                        systemUiVisibility |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                    }
                }
                window.getDecorView().setSystemUiVisibility(systemUiVisibility);
            }
            call.resolve();
        });
    }
}
