import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import propTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      stars: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    const { navigation, route } = this.props;
    const { user } = route.params;
    const { page } = this.state;
    navigation.setOptions({ title: user.name });

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({ stars: response.data, loading: false });
  }

  loadMore = async () => {
    const { route } = this.props;
    const { user } = route.params;
    const { stars, page } = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: page + 1 },
    });

    this.setState({ stars: [...stars, ...response.data], page: page + 1 });
  };

  render() {
    const { route } = this.props;
    const { stars, loading } = this.state;

    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: propTypes.shape({
    setOptions: propTypes.func,
  }).isRequired,
  route: propTypes.shape({
    params: propTypes.shape(),
  }).isRequired,
};
