import { Fade, CircularProgress } from '@mui/material';
import './Loading.style.scss';
const Loading = ({ isLoading = false, size = 30 }: { isLoading: boolean; size?: number }) => {
  return (
    <div className="loading-container">
      <Fade in={isLoading}>
        <CircularProgress size={size} />
      </Fade>
    </div>
  );
};

export default Loading;
