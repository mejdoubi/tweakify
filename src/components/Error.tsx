import Typography from '@mui/material/Typography';
import { PageWrapper } from './Wrappers';

const Error: React.FC = () => (
  <PageWrapper>
    <Typography variant="h1" component="div" gutterBottom>
      Oops!
    </Typography>
    <Typography variant="h3" component="div" gutterBottom>
      Something went wrong...
    </Typography>
  </PageWrapper>
);

export default Error;
