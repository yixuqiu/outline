import React from 'react';
import { observer } from 'mobx-react';

import userStore from 'stores/UserStore';
import store from './DashboardStore';

import Flex from 'components/Flex';
import Layout from 'components/Layout';
import AtlasPreview from 'components/AtlasPreview';
import AtlasPreviewLoading from 'components/AtlasPreviewLoading';
import CenteredContent from 'components/CenteredContent';
import DropdownMenu, { MenuItem } from 'components/DropdownMenu';
import FullscreenField from 'components/FullscreenField';

import styles from './Dashboard.scss';

@observer
class Dashboard extends React.Component {
  componentDidMount = () => {
    store.fetchAtlases(userStore.team.id);
  }

  state = {
    newAtlasVisible: false
  }

  onClickNewAtlas = () => {
    this.setState({
      newAtlasVisible: true,
    });
  }

  render() {
    const actions = (
      <Flex direction="row">
        <DropdownMenu label={
          <img
            src={ require("../../assets/icons/more.svg") }
            className={ styles.moreIcon }
          />
        } >
          <MenuItem onClick={ this.onClickNewAtlas }>
            New Atlas
          </MenuItem>
        </DropdownMenu>
      </Flex>
    );

    return (
      <Flex flex={ true }>
        <Layout
          actions={ actions }
        >
          <CenteredContent>
            <Flex direction="column" flex={ true }>
              { store.isFetching ? (
                <AtlasPreviewLoading />
              ) : store.atlases.map((atlas) => {
               return  (<AtlasPreview key={ atlas.id } data={ atlas } />);
              }) }
            </Flex>
          </CenteredContent>
        </Layout>

        { this.state.newAtlasVisible && <FullscreenField /> }
      </Flex>
    );
  }
}

export default Dashboard;
