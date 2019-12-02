import { connect } from 'react-redux';

import Lang from './lang.component';
import { switchContent } from './lang.actions';
import { getCurrentLang } from './lang.selectors';

const mapStateToProps = state => ({ currentLang: getCurrentLang(state) });

export default connect(mapStateToProps, { switchContent })(Lang);
