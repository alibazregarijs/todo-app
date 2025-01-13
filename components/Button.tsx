import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

export const styledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: "#0760FB1A",
  "&:hover": {
    backgroundColor: "#0760FB1A",
  },
}));
