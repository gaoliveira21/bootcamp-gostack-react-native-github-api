import React from 'react';
import { WebView } from 'react-native-webview';
import propTypes from 'prop-types';

export default function Repository(props) {
  const { route } = props;
  const { repository } = route.params;

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
}

Repository.propTypes = {
  route: propTypes.shape({
    params: propTypes.func,
  }).isRequired,
};
