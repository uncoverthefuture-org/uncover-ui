import React, { useState } from "react";
import { SelectInputPlaceholder, SelectInputProps } from "./placeholder";
import { ActionSheetDataOption } from "@components/select/interface";
import { ActionSheetOptions, ActionSheetOptionsProps } from "@components/select/action_sheet_options";
import { useThemeMode } from "@providers/hooks";
import { extendStyledProps } from "@themes/main";


export interface PrimarySelectProps extends SelectInputProps, ActionSheetOptionsProps {
  options: ActionSheetDataOption[];
  onSelect?: (selected: ActionSheetDataOption) => void;
}

export const PrimarySelect: React.FC<PrimarySelectProps> = ({
  ...rest
}) => {
  const { styledProps } = useThemeMode();
  const [active, setActive] = useState<boolean>(false);
  const { primarySelect: props } = extendStyledProps(styledProps, {
    primarySelect: {
      ...styledProps?.primarySelect,
      ...rest
    }
  });

  return (
    <ActionSheetOptions
      placeholder={props?.placeholder}
      options={props?.options ?? []}
      editable={props?.editable}
      onSelect={props?.onSelect}
      onToggleSheet={(status) => setActive(status)}
      containerStyle={props?.containerStyle}
      renderPlaceholder={
        <SelectInputPlaceholder
          inputFocused={active}
          {...props}
        />
      }
    />
  );
};
