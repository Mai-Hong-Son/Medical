import React from 'react';
import {
  View,
  StyleSheet,
  YellowBox,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as commonActions from '../../../redux/actions';

@connect(
  state => ({
    tokenAccess: state.tokenAccess
  }),
  { ...commonActions }
)
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings(
      ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
      ]);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.login({ usr: 'api_tracuuthuoc', pwd: '123456@tracuu' });
  }

  componentWillReceiveProps(nextProps) {
    const { tokenAccess: { data: { code } }, navigation } = nextProps;

    if (code === 200) {
      navigation.replace('RootStack');
    }

    this.setState({
      isLoading: false
    });
  }

  onRefresh = () => {
    this.setState({
      isLoading: true
    }, () => {
      this.props.login({ usr: 'admin', pwd: '123456a' });
    });
  }

  render() {
    const { tokenAccess: { error } } = this.props;
    const { isLoading } = this.state;

    const content = error && !isLoading ? (<View style={{ alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 17, marginBottom: 10 }}>{'Không thể kết nối đến hệ thống!'}</Text>
      <TouchableOpacity onPress={this.onRefresh}>
        <Icon name={'ios-refresh-circle-outline'} size={30} color={'#fff'} />
      </TouchableOpacity>
      <Text style={{ color: '#fff', fontSize: 15 }}>{'Thử lại'}</Text>
    </View>) : <ActivityIndicator size="large" color="#fff" />;

    return (
      <LinearGradient
        colors={['#f37545', '#f04e4b']}
        end={{ x: 1, y: 1.5 }}
        start={{ x: 0.0, y: 0.25 }}
        style={styles.container}
      >
        {content}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
