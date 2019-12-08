import { connect } from 'react-redux';

import CMS from './cms.component';
import { getPageContent } from '../../pageContentManager/pageContent.action';
import { setParentElement, setChildElement, setPage, toggleControls } from './cms.action';

const mapStateToProps = ({ cms: { components, showControls } }) => ({
  components,
  showControls,
});

export default connect(mapStateToProps, { toggleControls, getPageContent, setChildElement, setParentElement, setPage })(
  CMS,
);
