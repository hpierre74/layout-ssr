import { connect } from 'react-redux';

import UserRoutes from './userRoutes.component';

const mapStateToProps = ({ config: { modules, pages } }) => ({
  modules,
  pages,
});

export default connect(mapStateToProps)(UserRoutes);
