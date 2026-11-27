package com.stoppingDistanceApp.TML;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SystemAppearancePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
