import { connect } from 'react-redux';

import UserRoutes from './userRoutes.component';

const mapStateToProps = ({ config: { modules, pages }, app: { initialized } }) => ({
  modules,
  pages,
  initialized,
});

export default connect(mapStateToProps)(UserRoutes);
