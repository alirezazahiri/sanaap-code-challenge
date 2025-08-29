import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";
import { forwardRef } from "react";

export const Drawer = forwardRef<HTMLDivElement, MuiDrawerProps>(
  (props, ref) => {
    return <MuiDrawer {...props} ref={ref} />;
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
