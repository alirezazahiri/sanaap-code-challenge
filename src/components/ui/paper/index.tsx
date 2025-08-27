import MuiPaper from "@mui/material/Paper";

type PaperProps = React.HTMLAttributes<HTMLDivElement> & {
  elevation?: number;
};

export const Paper: React.FC<PaperProps> = (props) => {
  return <MuiPaper {...props} />;
};

export default Paper;
