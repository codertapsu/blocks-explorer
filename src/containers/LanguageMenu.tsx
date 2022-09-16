import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages, reverseSupportedLanguages } from "../i18n";

export const LanguageMenu: React.FC = (props) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (lang: string) => {
    setAnchorEl(null);
    // this forces language change for react + i18n react
    i18n.changeLanguage(reverseSupportedLanguages[lang]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={t("Change Language") as string}>
        <Button onClick={handleClick}>{supportedLanguages[i18n.language]}</Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.values(supportedLanguages).map((lang, i) => (
          <MenuItem key={i} onClick={() => handleMenuItemClick(lang)}>{lang}</MenuItem>
        ))}
      </Menu>
    </>
  );
};
