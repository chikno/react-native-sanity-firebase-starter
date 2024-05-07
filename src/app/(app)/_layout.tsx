/* eslint-disable react/no-unstable-nested-components */
import { SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useAuth } from '@/core';
import { colors, Image, TouchableOpacity, View } from '@/ui';
import {
  Account as AccountIcon,
  Email,
  Feed as FeedIcon,
  Phone,
  Settings as SettingsIcon,
  Style as StyleIcon,
  Whatsapp,
} from '@/ui/icons';
const image = require('assets/logo.png');

const renderLogo = () => {
  return <Image className="h-12 w-24 self-center" source={image} />;
};

export default function TabLayout() {
  const token = useAuth.use.token();
  const status = useAuth.use.status();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => <Actions />,
          headerTitle: () => renderLogo(),
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          tabBarTestID: 'feed-tab',
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Catégories',
          headerRight: () => <Actions />,
          headerTitle: () => renderLogo(),
          headerShown: true,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'categories-tab',
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: 'Account',
          headerRight: () => <Actions />,
          headerTitle: () => renderLogo(),
          headerShown: true,
          tabBarIcon: ({ color }) => <AccountIcon color={color} />,
          tabBarTestID: 'categories-tab',
        }}
        listeners={
          {
            // tabPress: () => {
            //   console.log(token);
            //   token && router.replace('/account/my-account');
            // },
          }
        }
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerRight: () => <Actions />,
          headerTitle: () => renderLogo(),
          headerShown: true,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

const Actions = () => {
  return (
    <View className="mr-4 flex-row items-center justify-center gap-5">
      <TouchableOpacity>
        <Phone color={colors.primary[900]} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Email color={colors.primary[900]} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Whatsapp color={colors.primary[900]} />
      </TouchableOpacity>
    </View>
  );
};
