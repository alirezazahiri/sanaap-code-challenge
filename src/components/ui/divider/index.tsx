import MuiDivider from "@mui/material/Divider";

type DividerOrientation = "horizontal" | "vertical";

type DividerProps = React.HTMLAttributes<HTMLHRElement> & {
  orientation?: DividerOrientation;
};

export const Divider: React.FC<DividerProps> = (props) => {
  return <MuiDivider {...props} />;
};

export default Divider;
