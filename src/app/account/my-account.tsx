/* eslint-disable react/react-in-jsx-scope */
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { useAuth } from '@/core';
import { colors, FocusAwareStatusBar, ScrollView, View } from '@/ui';
import { Account, Feed, Support } from '@/ui/icons';

export default function MyAccount() {
  const signOut = useAuth.use.signOut();
  const status = useAuth.use.status();
  const token = useAuth.use.token();

  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pb-4 ">
          <ItemsContainer title={'Bonjour ' + token?.user?.displayName}>
            <Item
              text="Mes reservation"
              icon={<Feed color={iconColor} />}
              onPress={() => {
                router.push('/account/my-bookings');
              }}
            />
            <Item
              text="Mon Profile"
              icon={<Account color={iconColor} />}
              onPress={() => {
                router.push('/account/my-profile');
              }}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => { }}
            />
          </ItemsContainer>
          {status === 'signIn' && (
            <View className="my-8 flex-1 justify-end align-bottom">
              <ItemsContainer>
                <Item
                  text="settings.logout"
                  onPress={() => {
                    signOut();
                    router.push('/');
                  }}
                />
              </ItemsContainer>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
