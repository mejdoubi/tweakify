import CircularProgress from '@mui/material/CircularProgress';
import { PageWrapper } from './Wrappers';

const Loader: React.FC = () => (
  <PageWrapper>
    <CircularProgress size={30} />
  </PageWrapper>
);

export default Loader;
