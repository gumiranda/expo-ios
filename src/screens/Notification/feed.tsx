import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme,Text } from 'react-native-paper';

import { Twitt } from '../../components/Post/twitt';
import { twitts } from '../../appNavigation/navigators/data';
import { StackNavigatorParamlist } from '../../appNavigation/navigators/types';

type TwittProps = React.ComponentProps<typeof Twitt>;

function renderItem({ item }: { item: TwittProps }) {
  return <Twitt {...item} />;
}

function keyExtractor(item: TwittProps) {
  return item.id.toString();
}

export const Feed = (props) => {
  const theme = useTheme();
  const data = twitts.map(twittProps => ({
    ...twittProps,
    onPress: () =>
      props.navigation &&
      props.navigation.push('Details', {
        ...twittProps,
      }),
  }));

  return (<>
    <FlatList
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      style={{ backgroundColor: theme.colors.background }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => (
        <View style={{ height: StyleSheet.hairlineWidth }} />
      )}
    /></>
  );
};
